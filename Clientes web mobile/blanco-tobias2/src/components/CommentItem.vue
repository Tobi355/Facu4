<template>
  <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded">
    <div class="flex items-start space-x-2">
      <img :src="comment.user.avatar_url || 'avatarPlaceHolde.png'" :alt="comment.user.username" class="h-8 w-8 rounded-full object-cover">
      <div class="flex-1">
        <p class="font-medium text-gray-900 dark:text-gray-100">{{ comment.user.username }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatTime(comment.created_at) }}</p>
        <p class="text-gray-800 dark:text-gray-200 mt-1">{{ comment.content }}</p>
        <div v-if="canDelete" class="flex items-center space-x-3 mt-1">
          <button type="button" @click="handleDelete" class="text-xs text-red-400 hover:text-red-600">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { postService } from '../services/postService'
import { formatTime } from '../utils/dateUtils'

const props = defineProps({
  comment: { type: Object, required: true }
})
const emit = defineEmits(['delete'])

const authStore = useAuthStore()
const canDelete = computed(() => authStore.user?.id === props.comment.user_id)

async function handleDelete() {
  if (confirm('¿Eliminar comentario?')) {
    try {
      await postService.deleteComment(props.comment.id)
      emit('delete', props.comment.id)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>