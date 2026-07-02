import { supabase } from '../supabase'

export const profileService = {
  /**
   * Obtiene el perfil por nombre de usuario.
   * @param {string} username
   * @returns {Promise<Object>} Perfil del usuario
   */
  async getProfileByUsername(username) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Obtiene el perfil por ID de usuario.
   * @param {string} userId
   * @returns {Promise<Object>} Perfil del usuario
   */
  async getProfileById(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async createProfile(profile) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async upsertProfile(profile) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile, { onConflict: 'id', returning: 'representation' })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Actualiza el perfil de un usuario.
   * @param {string} userId
   * @param {Object} updates
   * @returns {Promise<Object>} Perfil actualizado
   */
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}