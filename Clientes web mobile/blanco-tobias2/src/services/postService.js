import { supabase } from '../supabase'

/**
 * Obtiene el ID del usuario actualmente autenticado.
 * @returns {Promise<string|null>} ID del usuario o null si no hay sesión
 */
async function getCurrentUserId(){
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user?.id ?? null
}

export const postService = {
  /**
   * Obtiene la lista de posts con relaciones (user, likes, comments).
   * @returns {Promise<Array>} Array de posts enriquecidos
   */
  async getPosts() {
    const userId = await getCurrentUserId()

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_id (id, username, avatar_url),
        likes:likes (id, user_id),
        comments:comments (id)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(post => ({
      ...post,
      likes_count: post.likes?.length ?? 0,
      comments_count: post.comments?.length ?? 0,
      liked: userId ? (post.likes?.some((like) => like.user_id === userId) ?? false) : false
    }))
  },

  /**
   * Obtiene los posts de un usuario específico.
   * @param {string} userId - ID del usuario
   * @returns {Promise<Array>} Array de posts del usuario
   */
  async getPostsByUserId(userId) {
    const currentUserId = await getCurrentUserId()

    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_id (id, username, avatar_url),
        likes:likes (id, user_id),
        comments:comments (id)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(post => ({
      ...post,
      likes_count: post.likes?.length ?? 0,
      comments_count: post.comments?.length ?? 0,
      liked: currentUserId ? (post.likes?.some((like) => like.user_id === currentUserId) ?? false) : false
    }))
  },

  /**
   * Crea una publicación nueva.
   * @param {string} content - Texto del post
   * @param {string|null} imageUrl - URL de la imagen opcional
   * @returns {Promise<Object>} Post creado
   */
  async createPost(content, imageUrl = null) {
    const userId = await getCurrentUserId()
    if (!userId) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('posts')
      .insert({
        content,
        image_url: imageUrl,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Actualiza el contenido de una publicación.
   * @param {string} postId - ID del post a actualizar
   * @param {string} content - Nuevo contenido del post
   * @returns {Promise<Object>} Post actualizado
   */
  async updatePost(postId, content) {
    const userId = await getCurrentUserId()
    if (!userId) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('posts')
      .update({ content })
      .eq('id', postId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Alterna (like/unlike) un post para el usuario actual.
   * @param {string} postId - ID del post
   */
  async toggleLike(postId) {
    const userId = await getCurrentUserId()
    if (!userId) throw new Error('Usuario no autenticado')

    const { data: existingLike, error: likeError } = await supabase
      .from('likes')
      .select('id')
      .match({ post_id: postId, user_id: userId })
      .maybeSingle()

    if (likeError) throw likeError

    if (existingLike) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .match({ id: existingLike.id })
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('likes')
        .insert({ post_id: postId, user_id: userId })
      if (error) throw error
    }
  },

  /**
   * Obtiene comentarios de un post.
   * @param {string} postId - ID del post
   * @returns {Promise<Array>} Lista de comentarios
   */
  async getComments(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:user_id (id, username, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  },

  async createComment(postId, content) {
    const userId = await getCurrentUserId()
    if (!userId) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        content,
        user_id: userId
      })
      .select(`
        *,
        user:user_id (id, username, avatar_url)
      `)
      .single()

    if (error) throw error
    return data
  },

  async updateComment(commentId, content) {
    const { data, error } = await supabase
      .from('comments')
      .update({ content })
      .eq('id', commentId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteComment(commentId) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)

    if (error) throw error
  },

  async deletePost(postId) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)

    if (error) throw error
  }
}
