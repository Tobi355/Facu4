/**
 * Formatea una fecha a un formato relativo.
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Texto relativo (ej. 'hace 2 horas')
 */
export function timeAgo(date) {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (seconds < 5) return 'ahora'
  if (seconds < 60) return `hace ${seconds} segundos`
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`

  if (seconds < 2592000) {
    return `hace ${Math.floor(seconds / 86400)} días`
  }

  if (seconds < 31536000) {
    return `hace ${Math.floor(seconds / 2592000)} meses`
  }

  return `hace ${Math.floor(seconds / 31536000)} años`
}

/**
 * Formatea una fecha a un string legible corto.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Formatea la hora de una fecha.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatTime(date) {
  return new Date(date).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  })
}