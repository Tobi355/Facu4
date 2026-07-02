<template>
  <div class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-white/10">
    <div class="space-y-4">
      <div class="flex items-start gap-3">
        <img
          :src="post.user.avatar_url || avatarPlaceholder"
          :alt="post.user.username"
          class="h-11 w-11 rounded-2xl border border-white/10 object-cover"
        >
        <div class="flex-1">
          <router-link
            :to="{ name: 'profile', params: { username: post.user.username } }"
            class="font-semibold text-slate-100 hover:text-primary transition"
          >
            {{ post.user.username }}
          </router-link>
          <p class="text-sm text-slate-500 mt-1">
            {{ formatDate(post.created_at) }}
          </p>
        </div>
      </div>
      <div>
        <div v-if="isEditing" class="space-y-3">
          <label for="editContent" class="sr-only">Editar contenido</label>
          <textarea
            id="editContent"
            v-model="editedContent"
            maxlength="500"
            rows="4"
            class="block w-full rounded-3xl border border-white/10 bg-[#111113] px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Editá el contenido..."
          ></textarea>
          <div v-if="editedContent.length > 0" class="text-sm text-gray-500 dark:text-gray-400 text-right">
            {{ editedContent.length }}/500
          </div>
          <div class="flex justify-end gap-2">
            <button
              @click="handleCancel"
              :disabled="loadingEdit"
              class="rounded-full px-4 py-2 text-sm text-slate-400 hover:text-slate-100 transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              @click="handleSave"
              :disabled="loadingEdit || !editedContent.trim()"
              class="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-[#6B21A8] disabled:opacity-50 transition"
            >
              {{ loadingEdit ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </div>
        <p v-else class="text-slate-200 leading-relaxed whitespace-pre-line">
          {{ post.content }}
        </p>
      </div>
      <div v-if="post.image_url" class="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[#111113]">
        <img :src="post.image_url" alt="Post image" class="w-full object-cover" />
      </div>
      <div class="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <button
          v-if="!isEditing"
          @click="toggleLike"
          :class="post.liked ? 'text-primary' : 'text-slate-400 hover:text-slate-100'"
          class="inline-flex items-center gap-2 transition"
        >
          <span>❤️</span>
          {{ post.likes_count }} Me gusta
        </button>
        <button
          v-if="!isEditing"
          @click="openComments"
          class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition"
        >
          <span>💬</span>
          {{ post.comments_count }} Comentarios
        </button>
        <button
          v-if="isOwner && !isEditing"
          @click="handleEdit"
          class="inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition"
        >
          <span>✏️</span>
          Editar
        </button>
        <button
          v-if="isOwner && !isEditing"
          @click="handleDeletePost"
          class="inline-flex items-center gap-2 text-red-400 hover:text-red-200 transition"
        >
          <span>🗑️</span>
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatarPlaceholder from '../assets/avatarPlaceHolder.png'
import { postService } from '../services/postService'
import { formatDate } from '../utils/dateUtils'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'
import { computed, ref } from 'vue'

const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['update:post', 'open-comments', 'delete:post'])
const toast = useToast()
const authStore = useAuthStore()

const isEditing = ref(false)
const editedContent = ref('')
const loadingEdit = ref(false)

const isOwner = computed(() => authStore.user?.id === props.post.user?.id)

async function toggleLike() {
  try {
    await postService.toggleLike(props.post.id)
    props.post.likes_count = props.post.liked
      ? props.post.likes_count - 1
      : props.post.likes_count + 1
    props.post.liked = !props.post.liked
    emit('update:post', props.post)
  } catch (error) {
    toast.error('Error al dar like')
  }
}

function openComments() {
  emit('open-comments', props.post)
}

async function handleDeletePost() {
  try {
    await postService.deletePost(props.post.id)
    emit('delete:post', props.post.id)
    toast.success('Publicación eliminada')
  } catch (error) {
    toast.error(error.message || 'Error al eliminar la publicación')
  }
}

function handleEdit() {
  editedContent.value = props.post.content
  isEditing.value = true
}

function handleCancel() {
  isEditing.value = false
  editedContent.value = ''
}

async function handleSave() {
  if (!editedContent.value.trim()) {
    toast.error('El contenido no puede estar vacío')
    return
  }

  loadingEdit.value = true
  try {
    await postService.updatePost(props.post.id, editedContent.value.trim())
    props.post.content = editedContent.value.trim()
    emit('update:post', props.post)
    isEditing.value = false
    editedContent.value = ''
    toast.success('Publicación actualizada')
  } catch (error) {
    toast.error(error.message || 'Error al actualizar la publicación')
  } finally {
    loadingEdit.value = false
  }
}
</script>