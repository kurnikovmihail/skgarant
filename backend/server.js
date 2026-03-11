import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = Number(process.env.API_PORT ?? 3001)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'change-this-password'
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'change-this-secret'
const COOKIE_NAME = 'skg_admin'

const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, 'uploads')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')
const SEED_FILE = path.join(__dirname, '..', 'public', 'content', 'projects.json')

await fs.mkdir(DATA_DIR, { recursive: true })
await fs.mkdir(UPLOADS_DIR, { recursive: true })

try {
  await fs.access(PROJECTS_FILE)
} catch {
  try {
    const seedContent = await fs.readFile(SEED_FILE, 'utf-8')
    await fs.writeFile(PROJECTS_FILE, seedContent, 'utf-8')
  } catch {
    await fs.writeFile(PROJECTS_FILE, '[]', 'utf-8')
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname || '') || '.jpg'
    const slug = (req.body.slug || req.body.title || 'project').toString().trim().toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-')
    const safeSlug = slug.replace(/^-+|-+$/g, '').slice(0, 64) || 'project'
    const uniquePart = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
    cb(null, `${safeSlug}-${uniquePart}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 12 * 1024 * 1024,
    files: 40,
  },
})

app.use(express.json({ limit: '1mb' }))
app.use('/uploads', express.static(UPLOADS_DIR))

const parseCookies = (cookieHeader = '') => {
  const entries = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const separatorIndex = part.indexOf('=')
      if (separatorIndex === -1) {
        return [part, '']
      }

      const key = part.slice(0, separatorIndex)
      const value = decodeURIComponent(part.slice(separatorIndex + 1))
      return [key, value]
    })

  return Object.fromEntries(entries)
}

const createSessionToken = () => {
  const payload = `${Date.now()}:${crypto.randomUUID()}`
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
  return `${payload}.${signature}`
}

const verifySessionToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false
  }

  const lastDotIndex = token.lastIndexOf('.')
  if (lastDotIndex <= 0) {
    return false
  }

  const payload = token.slice(0, lastDotIndex)
  const signature = token.slice(lastDotIndex + 1)
  const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')

  if (signature !== expectedSignature) {
    return false
  }

  const createdAtPart = payload.split(':')[0]
  const createdAt = Number(createdAtPart)
  if (!Number.isFinite(createdAt)) {
    return false
  }

  const maxSessionAgeMs = 7 * 24 * 60 * 60 * 1000
  return Date.now() - createdAt <= maxSessionAgeMs
}

const buildCookie = (value, maxAgeSeconds = 0) => {
  const baseParts = [
    `${COOKIE_NAME}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ]

  if (maxAgeSeconds > 0) {
    baseParts.push(`Max-Age=${maxAgeSeconds}`)
  } else {
    baseParts.push('Max-Age=0')
  }

  return baseParts.join('; ')
}

const readProjects = async () => {
  try {
    const content = await fs.readFile(PROJECTS_FILE, 'utf-8')
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeProjects = async (projects) => {
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8')
}

const slugify = (input) =>
  input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')

const ensureUniqueSlug = (projects, baseSlug) => {
  let slug = baseSlug || `project-${Date.now()}`
  let counter = 2

  while (projects.some((project) => project.slug === slug)) {
    slug = `${baseSlug}-${counter}`
    counter += 1
  }

  return slug
}

const parseListInput = (value) => {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.map((item) => item.toString().trim()).filter(Boolean)
    }
  } catch {
    // ignore json parse error and fallback to line parsing
  }

  return value
    .toString()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

const collectUploadPaths = (project) => {
  if (!project || typeof project !== 'object') {
    return []
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : []
  const candidates = [project.image, project.heroImage, ...gallery]

  return [
    ...new Set(
      candidates.filter(
        (item) => typeof item === 'string' && item.startsWith('/uploads/'),
      ),
    ),
  ]
}

const getAuthState = (req) => {
  const cookies = parseCookies(req.headers.cookie)
  return verifySessionToken(cookies[COOKIE_NAME])
}

const requireAdmin = (req, res, next) => {
  if (!getAuthState(req)) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/projects', async (_req, res) => {
  const projects = await readProjects()
  res.json(projects)
})

app.get('/api/projects/:slug', async (req, res) => {
  const projects = await readProjects()
  const project = projects.find((item) => item.slug === req.params.slug)

  if (!project) {
    res.status(404).json({ message: 'Project not found' })
    return
  }

  res.json(project)
})

app.get('/api/admin/session', (req, res) => {
  res.json({ authenticated: getAuthState(req) })
})

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body ?? {}

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).json({ message: 'Неверный логин или пароль' })
    return
  }

  const token = createSessionToken()
  const oneWeek = 7 * 24 * 60 * 60
  res.setHeader('Set-Cookie', buildCookie(token, oneWeek))
  res.json({ ok: true })
})

app.post('/api/admin/logout', (_req, res) => {
  res.setHeader('Set-Cookie', buildCookie('', 0))
  res.json({ ok: true })
})

app.post(
  '/api/admin/projects',
  requireAdmin,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 },
    { name: 'gallery', maxCount: 20 },
  ]),
  async (req, res) => {
    const projects = await readProjects()

    const title = (req.body.title || '').toString().trim()
    const summary = (req.body.summary || '').toString().trim()
    const area = (req.body.area || '').toString().trim()
    const city = (req.body.city || '').toString().trim()
    const timeline = (req.body.timeline || '').toString().trim()

    if (!title || !summary || !area || !city || !timeline) {
      res.status(400).json({ message: 'Заполните обязательные поля: название, описание, тип работ, город, сроки.' })
      return
    }

    const rawSlug = slugify(req.body.slug || title)
    const slug = ensureUniqueSlug(projects, rawSlug)

    const fileMap = req.files ?? {}
    const coverImage = fileMap.image?.[0] ? `/uploads/${fileMap.image[0].filename}` : null
    const heroImage = fileMap.heroImage?.[0] ? `/uploads/${fileMap.heroImage[0].filename}` : coverImage
    const galleryImages = Array.isArray(fileMap.gallery) ? fileMap.gallery.map((file) => `/uploads/${file.filename}`) : []

    if (!coverImage) {
      res.status(400).json({ message: 'Загрузите главное изображение проекта.' })
      return
    }

    const features = parseListInput(req.body.features)
    const buildStages = parseListInput(req.body.buildStages)

    const project = {
      slug,
      title,
      area,
      city,
      timeline,
      image: coverImage,
      heroImage: heroImage || coverImage,
      summary,
      location: (req.body.location || '').toString().trim() || city,
      family: (req.body.family || '').toString().trim() || 'Заказчик уточняется',
      technology: (req.body.technology || '').toString().trim() || 'Технология уточняется',
      features: features.length > 0 ? features : ['Детализация проекта будет добавлена позже'],
      buildStages: buildStages.length > 0 ? buildStages : ['Этапы проекта будут добавлены позже'],
      gallery: galleryImages.length > 0 ? galleryImages : [coverImage],
      createdAt: new Date().toISOString(),
    }

    projects.unshift(project)
    await writeProjects(projects)

    res.status(201).json({ ok: true, project })
  },
)

app.delete('/api/admin/projects/:slug', requireAdmin, async (req, res) => {
  const projects = await readProjects()
  const projectIndex = projects.findIndex((project) => project.slug === req.params.slug)

  if (projectIndex === -1) {
    res.status(404).json({ message: 'Проект не найден' })
    return
  }

  const [removedProject] = projects.splice(projectIndex, 1)
  await writeProjects(projects)

  const usedByOtherProjects = new Set(projects.flatMap((project) => collectUploadPaths(project)))
  const filesToRemove = collectUploadPaths(removedProject).filter((uploadPath) => !usedByOtherProjects.has(uploadPath))

  for (const uploadPath of filesToRemove) {
    const fileName = path.basename(uploadPath)
    const absolutePath = path.join(UPLOADS_DIR, fileName)

    try {
      await fs.unlink(absolutePath)
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        console.error(`Failed to delete upload file: ${absolutePath}`, error)
      }
    }
  }

  res.json({ ok: true, slug: removedProject.slug })
})

app.listen(PORT, () => {
  console.log(`SK-Garant API is running on http://localhost:${PORT}`)
})
