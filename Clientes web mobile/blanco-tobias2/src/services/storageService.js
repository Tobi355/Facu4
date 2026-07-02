import { supabase } from '../supabase'

export const storageService = {
  /**
   * Upload a user avatar file to Supabase storage and return its public URL.
   * @param {File} file - Image file to upload
   * @returns {string} public URL
   */
  async uploadAvatar(file) {
    if (!file.type.startsWith('image/')) {
      throw new Error('Solo se permiten archivos de imagen')
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('El archivo es demasiado grande (máximo 5MB)')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}_avatar.${fileExt}`

    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    if (error) throw error

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    return data.publicUrl
  },

  /**
   * Upload an image for a post and return its public URL.
   * @param {File} file - Image file to upload
   * @returns {string} public URL
   */
  async uploadPostImage(file){
    if (!file.type.startsWith('image/')) {
      throw new Error('Solo se permiten archivos de imagen')
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('El archivo es demasiado grande (máximo 10MB)')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}_post.${fileExt}`

    const { error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, { upsert: true })

    if (error) throw error

    const { data } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName)

    return data.publicUrl
  },

  /**
   * Delete a file from a Supabase storage bucket given its public URL.
   * @param {string} fileUrl - Public URL of the file
   * @param {string} bucket - Bucket name
   */
  async deleteFile(fileUrl, bucket) {
    try {
      const url = new URL(fileUrl)
      const parts = url.pathname.split('/')
      const fileName = parts[parts.length - 1]

      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName])

      if (error) throw error
    } catch (error) {
      console.error('Error eliminando archivo:', error)
    }
  }
}
