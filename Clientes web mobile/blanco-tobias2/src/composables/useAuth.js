import { useAuthStore } from '../stores/auth'

/**
 * Composable que expone el store de autenticación.
 * @returns {Object} auth store
 */
export function useAuth() {
  return useAuthStore()
}