import { ref, onBeforeUnmount } from 'vue'
import { supabase } from '../supabase'

export function useRealtime(tableName, callback) {
  const channel = ref(null)
  const initialized = ref(false)

  const init = () => {
    if (initialized.value) return

    channel.value = supabase.channel(`${tableName}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, payload => {
        callback(payload)
      })
      .subscribe()

    initialized.value = true
  }

  const destroy = () => {
    if (channel.value) {
      supabase.removeChannel(channel.value)
      channel.value = null
      initialized.value = false
    }
  }

  onBeforeUnmount(() => {
    destroy()
  })

  return { init, destroy }
}