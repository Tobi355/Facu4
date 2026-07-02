<template>
  <div class="p-6 space-y-6  min-h-[calc(100vh-4rem)]">
    <div class="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-slate-100">Feed</h1>
        <p class="text-sm text-slate-400 mt-1">Descubrí lo último de la comunidad de diseño.</p>
      </div>
      <button
        @click="showCreatePost = true"
        class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8] transition"
      >
        Crear publicación
      </button>
    </div>

    <div v-if="loadingPosts" class="text-center py-12">
      <LoadingSpinner />
    </div>

    <ErrorBoundary v-else-if="errorPosts" :errorMessage="errorPosts" :retry="fetchPosts" />

    <EmptyState
      v-else-if="posts.length === 0"
      title="¡Aún no hay publicaciones!"
      description="Sé el primero en compartir algo interesante en Nanu."
      icon="feed"
      variant="primary"
      :action="{ label: 'Crear publicación', handler: () => showCreatePost = true }"
    />

    <div v-else class="space-y-6">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @update:post="updatePost"
        @open-comments="openComments"
        @delete:post="deletePost"
      />
    </div>

    <div v-if="showCreatePost" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
        <h2 class="text-xl font-semibold mb-4 text-slate-100">Crear publicación</h2>
        <form @submit.prevent="handleCreatePost" class="space-y-4">
          <div>
            <label for="content" class="block text-sm font-medium text-slate-300 mb-2">
              ¿Qué estás pensando?
            </label>
            <textarea
              id="content"
              rows="4"
              class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="postContent"
              maxlength="500"
              placeholder="Comparte algo con la comunidad..."
              autofocus
            ></textarea>
            <div v-if="postContent.length > 0" class="mt-1 text-sm text-gray-500 dark:text-gray-400 text-right">
              {{ postContent.length }}/500
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Imagen (opcional)
            </label>
            <label for="image" class="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
              📎 Adjuntar imagen
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="hidden"
            />
            <p v-if="selectedFile" class="mt-2 text-sm text-green-600 dark:text-green-400">
              ✓ {{ selectedFile.name }}
            </p>
            <p v-if="fileError" class="mt-1 text-sm text-red-500 dark:text-red-400">
              {{ fileError }}
            </p>
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeCreatePost"
              class="rounded-full px-4 py-2 text-sm text-slate-400 hover:text-slate-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loadingPost || (!postContent.trim() && !selectedFile)"
              class="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#6B21A8] disabled:opacity-50 transition"
            >
              {{ loadingPost ? 'Publicando...' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

<div v-if="showComments" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="w-full max-w-xl max-h-[80vh] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-white/10">
          <div>
            <h2 class="text-xl font-semibold text-slate-100">Comentarios</h2>
            <p v-if="activePost" class="text-sm text-slate-400">
              Publicación de {{ activePost.user.username }}
            </p>
        </div>
        <button @click="closeComments" class="text-slate-400 hover:text-slate-100 text-xl">
            ✕
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="loadingComments" class="text-center py-4">
            <LoadingSpinner />
          </div>
          <ErrorBoundary v-else-if="errorComments" :errorMessage="errorComments" :retry="fetchPostComments" />
          <EmptyState
            v-else-if="postComments.length === 0"
            title="Aún no hay comentarios"
            description="Sé el primero en comentar esta publicación."
            :icon="null"
            variant="secondary"
          />
          <div v-else class="space-y-4">
            <CommentItem
              v-for="comment in postComments"
              :key="comment.id"
              :comment="comment"
              :postId="activePost.id"
              @update:comment="updateComment"
              @delete:comment="deleteComment"
            />
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 dark:border-gray-700">
          <form @submit.prevent="handleCreateComment" class="space-y-2">
            <label for="commentContent" class="sr-only">Añadí un comentario</label>
            <textarea
              id="commentContent"
              rows="2"
              class="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              v-model="commentContent"
              maxlength="300"
              placeholder="Añadí un comentario..."
            ></textarea>
            <div class="flex justify-between items-center">
              <span v-if="commentContent.length > 0" class="text-sm text-gray-500 dark:text-gray-400">
                {{ commentContent.length }}/300
              </span>
              <span v-else></span>
              <button
                type="submit"
                :disabled="loadingComment || !commentContent.trim()"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm"
              >
                {{ loadingComment ? 'Comentando...' : 'Comentar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'

import { storageService } from '../services/storageService'
import { useRealtime } from '../composables/useRealtime'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import EmptyState from '../components/EmptyState.vue'
import PostCard from '../components/PostCard.vue'
import CommentItem from '../components/CommentItem.vue'
import { postService } from '../services/postService'


const toast = useToast()
const posts = ref([])
const showCreatePost = ref(false)
const postContent = ref('')
const selectedFile = ref(null)
const fileError = ref(null)
const showComments = ref(false)
const activePost = ref(null)
const postComments = ref([])
const commentContent = ref('')

const loadingPosts = ref(false)
const errorPosts = ref(null)
const loadingComments = ref(false)
const errorComments = ref(null)
const loadingPost = ref(false)
const loadingComment = ref(false)

const fetchPosts = async () => {
  loadingPosts.value = true
  errorPosts.value = null
  try {
    posts.value = await postService.getPosts()
  } catch (err) {
    errorPosts.value = err.message || 'Error al cargar las publicaciones'
    toast.error(errorPosts.value)
  } finally {
    loadingPosts.value = false
  }
}

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  fileError.value = null
  if (!file.type.startsWith('image/')) {
    fileError.value = 'Solo se permiten archivos de imagen'
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    fileError.value = 'El archivo es demasiado grande (máximo 10MB)'
    return
  }
  selectedFile.value = file
}

const closeCreatePost = () => {
  showCreatePost.value = false
  postContent.value = ''
  selectedFile.value = null
  fileError.value = null
}

const handleCreatePost = async () => {
  if (!postContent.value.trim() && !selectedFile.value) {
    toast.error('Por favor ingresá algún contenido o seleccioná una imagen')
    return
  }

  loadingPost.value = true
  try {
    let imageUrl = null
    if (selectedFile.value) {
      imageUrl = await storageService.uploadPostImage(selectedFile.value)
    }

    const newPost = await postService.createPost(postContent.value.trim(), imageUrl)
    await fetchPosts()
    closeCreatePost()
    toast.success('Publicación creada')
  } catch (err) {
    toast.error(err.message || 'Error al crear la publicación')
  } finally {
    loadingPost.value = false
  }
}

const updatePost = (updatedPost) => {
  const index = posts.value.findIndex(p => p.id === updatedPost.id)
  if (index !== -1) {
    posts.value[index] = updatedPost
  }
}

const openComments = (post) => {
  activePost.value = post
  showComments.value = true
  fetchPostComments()
}

const closeComments = () => {
  showComments.value = false
  activePost.value = null
  postComments.value = []
  commentContent.value = ''
}

const fetchPostComments = async () => {
  if (!activePost.value) return

  loadingComments.value = true
  errorComments.value = null
  try {
    postComments.value = await postService.getComments(activePost.value.id)
  } catch (err) {
    errorComments.value = err.message || 'Error al cargar los comentarios'
    toast.error(errorComments.value)
  } finally {
    loadingComments.value = false
  }
}

const handleCreateComment = async () => {
  if (!commentContent.value.trim() || !activePost.value) return

  loadingComment.value = true
  try {
    const newComment = await postService.createComment(activePost.value.id, commentContent.value.trim())
    postComments.value.push(newComment)
    const postIndex = posts.value.findIndex(p => p.id === activePost.value.id)
    if (postIndex !== -1) {
      posts.value[postIndex].comments_count++
    }
    commentContent.value = ''
    toast.success('Comentario agregado')
  } catch (err) {
    toast.error(err.message || 'Error al agregar el comentario')
  } finally {
    loadingComment.value = false
  }
}

const updateComment = (updatedComment) => {
  const index = postComments.value.findIndex(c => c.id === updatedComment.id)
  if (index !== -1) postComments.value[index] = updatedComment
}

const deleteComment = (commentId) => {
  postComments.value = postComments.value.filter(c => c.id !== commentId)
  const postIndex = posts.value.findIndex(p => p.id === activePost.value?.id)
  if (postIndex !== -1 && posts.value[postIndex].comments_count > 0) {
    posts.value[postIndex].comments_count--
  }
}

const deletePost = (postId) => {
  posts.value = posts.value.filter(post => post.id !== postId)
  if (activePost.value?.id === postId) {
    closeComments()
  }
}

const { init: initPostsRealtime, destroy: destroyPostsRealtime } = useRealtime('posts', () => fetchPosts())
const { init: initLikesRealtime, destroy: destroyLikesRealtime } = useRealtime('likes', () => fetchPosts())
const { init: initCommentsRealtime, destroy: destroyCommentsRealtime } = useRealtime('comments', () => {
  if (activePost.value) fetchPostComments()
  else fetchPosts()
})

onMounted(() => {
  fetchPosts()
  initPostsRealtime()
  initLikesRealtime()
  initCommentsRealtime()
})

onBeforeUnmount(() => {
  destroyPostsRealtime()
  destroyLikesRealtime()
  destroyCommentsRealtime()
})
</script>
