<template>
  <div class="text-center py-12">
    <div class="mb-6">
      <svg class="mx-auto h-12 w-12 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>

    <h2 class="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">Algo salió mal</h2>
    <p class="mb-6 text-gray-600 dark:text-gray-300 max-w-xl">{{ errorMessage }}</p>

    <button
      @click="retry"
      class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Intentar nuevamente
    </button>
  </div>
</template>

<script setup>
  defineProps({
    errorMessage: {
      type: String,
      default: 'Ocurrió un error'
    },
    retry: {
      type: Function,
      default: null
    }
  })
</script>