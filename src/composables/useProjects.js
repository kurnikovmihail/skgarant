import { onMounted, ref } from 'vue'
import { projects as fallbackProjects } from '../data/siteContent'

let projectsCache = null

const fetchProjectsFromApi = async () => {
  const response = await fetch('/api/projects', { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`API projects request failed: ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload) && payload.length > 0) {
    return payload
  }

  throw new Error('API projects response is empty')
}

const fetchProjectsFromStatic = async () => {
  const response = await fetch('/content/projects.json', { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Static projects request failed: ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload) && payload.length > 0) {
    return payload
  }

  throw new Error('Static projects response is empty')
}

const resolveProjects = async () => {
  try {
    return await fetchProjectsFromApi()
  } catch {
    try {
      return await fetchProjectsFromStatic()
    } catch {
      return fallbackProjects
    }
  }
}

export const invalidateProjectsCache = () => {
  projectsCache = null
}

export const useProjects = () => {
  const projects = ref(projectsCache ?? fallbackProjects)
  const isLoading = ref(!projectsCache)

  const reloadProjects = async () => {
    isLoading.value = true

    const resolvedProjects = await resolveProjects()
    projectsCache = resolvedProjects
    projects.value = resolvedProjects
    isLoading.value = false
  }

  onMounted(async () => {
    if (projectsCache) {
      isLoading.value = false
      return
    }

    await reloadProjects()
  })

  return {
    projects,
    isLoading,
    reloadProjects,
  }
}
