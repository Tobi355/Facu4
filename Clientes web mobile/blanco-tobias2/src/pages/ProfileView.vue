<template>
  <div class="min-h-screen  py-8">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="space-y-6">
        <div v-if="loadingProfile" class="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl text-center">
          <LoadingSpinner />
        </div>

        <ErrorBoundary v-else-if="errorProfile" :errorMessage="errorProfile" :retry="fetchProfile" />

        <div v-else-if="profile" class="space-y-8">
          <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="flex items-center gap-4">
                <img
                  :src="profile.avatar_url || avatarPlaceholder"
                  :alt="profile.username"
                  class="h-24 w-24 rounded-[1.5rem] border border-white/10 object-cover"
                />
                <div>
                  <h1 class="text-3xl font-semibold text-slate-100">{{ profile.username }}</h1>
                  <p class="mt-2 text-slate-400 max-w-xl">{{ profile.bio || 'Sin biografía' }}</p>
                </div>
              </div>
              <router-link
                v-if="authStore.user && authStore.user.username === profile.username"
                to="/edit-profile"
                class="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8] transition"
              >
                Editar perfil
              </router-link>
            </div>
          </div>

          <div class="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="text-xl font-semibold text-slate-100">Publicaciones</h2>
              <p class="text-sm text-slate-400">Explorá el contenido de este perfil.</p>
            </div>

            <div v-if="loadingPosts" class="text-center py-12">
              <LoadingSpinner />
            </div>

            <ErrorBoundary v-else-if="errorPosts" :errorMessage="errorPosts" :retry="fetchUserPosts" />

            <EmptyState
              v-else-if="userPosts.length === 0"
              title="Aún no hay publicaciones"
              description="Este usuario no ha publicado nada todavía."
              :icon="null"
              variant="secondary"
            />

            <div v-else class="space-y-4">
              <PostCard
                v-for="post in userPosts"
                :key="post.id"
                :post="post"
                @update:post="updatePost"
                @open-comments="openComments"
                @delete:post="deletePost"
              />
            </div>
          </div>
        </div>

        <div v-else class="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-soft backdrop-blur-xl text-center">
          <p class="text-slate-400 text-lg">Usuario no encontrado</p>
          <router-link to="/feed" class="mt-4 inline-block rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition">
            Volver al feed
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="showComments" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="w-full max-w-xl max-h-[80vh] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl flex flex-col">
        <div class="flex items-start justify-between gap-4 p-6 border-b border-white/10">
          <div>
            <h2 class="text-xl font-semibold text-slate-100">Comentarios</h2>
            <p v-if="activePost" class="mt-1 text-sm text-slate-400">
              Publicación de {{ activePost.user.username }}
            </p>
          </div>
          <button @click="closeComments" class="text-slate-400 hover:text-slate-100 text-xl transition">
            ✕
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="loadingComments" class="text-center py-4">
            <LoadingSpinner />
          </div>
          <ErrorBoundary v-else-if="errorComments" :errorMessage="errorComments" :retry="fetchPostComments" />
          <EmptyState
            v-else-if="postComments.length === 0"
            title="Aún no hay comentarios"
            description="Sé el primero en comentar."
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

        <div class="p-6 border-t border-white/10 bg-[#0b0b0d]">
          <form @submit.prevent="handleCreateComment" class="space-y-3">
            <label for="profileCommentContent" class="sr-only">Añadí un comentario</label>
            <textarea
              id="profileCommentContent"
              rows="2"
              class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="commentContent"
              maxlength="300"
              placeholder="Añadí un comentario..."
            ></textarea>
            <div class="flex items-center justify-between gap-4">
              <span v-if="commentContent.length > 0" class="text-sm text-slate-400">
                {{ commentContent.length }}/300
              </span>
              <button
                type="submit"
                :disabled="loadingComment || !commentContent.trim()"
                class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#6B21A8] disabled:opacity-50 transition"
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
import avatarPlaceholder from '../assets/avatarPlaceHolder.png'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { profileService } from '../services/profileService'
import { postService } from '../services/postService'
import { useRealtime } from '../composables/useRealtime'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import EmptyState from '../components/EmptyState.vue'
import PostCard from '../components/PostCard.vue'
import CommentItem from '../components/CommentItem.vue'

const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()

const profile = ref(null)
const userPosts = ref([])
const showComments = ref(false)
const activePost = ref(null)
const postComments = ref([])
const commentContent = ref('')

const loadingProfile = ref(false)
const errorProfile = ref(null)
const loadingPosts = ref(false)
const errorPosts = ref(null)
const loadingComments = ref(false)
const errorComments = ref(null)
const loadingComment = ref(false)

const fetchProfile = async () => {
  const username = route.params.username
  if (!username) return

  loadingProfile.value = true
  errorProfile.value = null
  profile.value = null

  try {
    const data = await profileService.getProfileByUsername(username)
    profile.value = data
    await fetchUserPosts()
  } catch (err) {
    errorProfile.value = err.message || 'Error al cargar el perfil'
    toast.error(errorProfile.value)
  } finally {
    loadingProfile.value = false
  }
}

const fetchUserPosts = async () => {
  if (!profile.value) return

  loadingPosts.value = true
  errorPosts.value = null
  try {
    const data = await postService.getPostsByUserId(profile.value.id)
    userPosts.value = data
  } catch (err) {
    errorPosts.value = err.message || 'Error al cargar las publicaciones'
    toast.error(errorPosts.value)
  } finally {
    loadingPosts.value = false
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
    const data = await postService.getComments(activePost.value.id)
    postComments.value = data
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
    const postIndex = userPosts.value.findIndex(p => p.id === activePost.value.id)
    if (postIndex !== -1) {
      userPosts.value[postIndex].comments_count++
    }
    commentContent.value = ''
    toast.success('Comentario agregado')
  } catch (err) {
    toast.error(err.message || 'Error al agregar el comentario')
  } finally {
    loadingComment.value = false
  }
}

const updatePost = (updatedPost) => {
  const index = userPosts.value.findIndex(p => p.id === updatedPost.id)
  if (index !== -1) {
    userPosts.value[index] = updatedPost
  }
}

const updateComment = (updatedComment) => {
  const index = postComments.value.findIndex(c => c.id === updatedComment.id)
  if (index !== -1) {
    postComments.value[index] = updatedComment
  }
}

const deleteComment = (commentId) => {
  postComments.value = postComments.value.filter(c => c.id !== commentId)
  const postIndex = userPosts.value.findIndex(p => p.id === activePost.value?.id)
  if (postIndex !== -1 && userPosts.value[postIndex].comments_count > 0) {
    userPosts.value[postIndex].comments_count--
  }
}

const deletePost = (postId) => {
  userPosts.value = userPosts.value.filter(p => p.id !== postId)
  if (activePost.value?.id === postId) {
    closeComments()
  }
}

watch(() => route.params.username, () => {
  fetchProfile()
})

const { init: initPostsRealtime, destroy: destroyPostsRealtime } = useRealtime('posts', () => {
  if (profile.value) fetchUserPosts()
})
const { init: initLikesRealtime, destroy: destroyLikesRealtime } = useRealtime('likes', () => {
  if (profile.value) fetchUserPosts()
})
const { init: initCommentsRealtime, destroy: destroyCommentsRealtime } = useRealtime('comments', () => {
  if (activePost.value) fetchPostComments()
})

onMounted(() => {
  fetchProfile()
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
