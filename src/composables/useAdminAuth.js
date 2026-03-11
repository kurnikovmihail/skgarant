import { ref } from 'vue'

const isAuthenticated = ref(false)
const isCheckingSession = ref(false)

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await response.json() : null

  if (!response.ok) {
    const message = payload?.message || 'Ошибка запроса к серверу'
    throw new Error(message)
  }

  return payload
}

export const useAdminAuth = () => {
  const checkSession = async () => {
    isCheckingSession.value = true

    try {
      const payload = await requestJson('/api/admin/session')
      isAuthenticated.value = Boolean(payload?.authenticated)
      return isAuthenticated.value
    } catch {
      isAuthenticated.value = false
      return false
    } finally {
      isCheckingSession.value = false
    }
  }

  const login = async (username, password) => {
    await requestJson('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    isAuthenticated.value = true
  }

  const logout = async () => {
    try {
      await requestJson('/api/admin/logout', {
        method: 'POST',
      })
    } finally {
      isAuthenticated.value = false
    }
  }

  return {
    isAuthenticated,
    isCheckingSession,
    checkSession,
    login,
    logout,
  }
}
