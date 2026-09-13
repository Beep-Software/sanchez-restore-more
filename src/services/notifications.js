const listeners = new Set()

export const notificationService = {
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  notify(notification) {
    const value = {
      id: `${Date.now()}-${Math.random()}`,
      tone: 'info',
      duration: 4500,
      ...notification,
    }
    listeners.forEach((listener) => listener(value))
    return value.id
  },

  success(message) {
    return this.notify({ tone: 'success', message })
  },

  error(message) {
    return this.notify({ tone: 'error', message, duration: 6500 })
  },

  info(message) {
    return this.notify({ tone: 'info', message })
  },
}