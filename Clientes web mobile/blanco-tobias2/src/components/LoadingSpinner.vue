<template>
  <div class="flex items-center justify-center">
    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md'
  }
})
</script>