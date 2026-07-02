import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { profileService } from '../services/profileService'

function getFallbackUsername(user) {
  return user.user_metadata?.username || user.email?.split('@')[0] || ''
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    initialized: false
  }),
  actions: {
  async login(email, password) {
    this.loading = true
    this.error = null

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('LOGIN ERROR:', error)
        throw error
      }

      if (!data.user) {
        throw new Error('No se encontró el usuario')
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('PROFILE FETCH ERROR:', profileError)
        throw profileError
      }

      this.user = {
        id: data.user.id,
        email: data.user.email,
        username: profile.username,
        avatar_url: profile.avatar_url,
        bio: profile.bio
      }

      return data

    } catch (err) {
      console.error('LOGIN STORE ERROR:', err)
      this.error = err.message
      throw err
    } finally {
      this.loading = false
    }
  },

    async register(email, password, username) {
      this.loading = true
      this.error = null

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username
            }
          }
        })

        if (error) {
          console.error('SIGNUP ERROR:', error)
          throw error
        }

        if (!data.user) {
          throw new Error('No se recibió el usuario')
        }

        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            username,
            bio: '',
            avatar_url: null
          })

        if (profileError) {
          console.error('PROFILE ERROR:', profileError)
          throw profileError
        }

        this.user = {
          id: data.user.id,
          email: data.user.email,
          username,
          avatar_url: null,
          bio: ''
        }

        return data

      } catch (err) {
        console.error('REGISTER ERROR:', err)
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
    async initAuth() {
      this.loading = true
      this.initialized = true
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          let { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('username, avatar_url, bio')
            .eq('id', session.user.id)
            .maybeSingle()

          if (profileError) throw profileError

          if (!profile) {
            const username = getFallbackUsername(session.user)
            profile = await profileService.upsertProfile({
              id: session.user.id,
              username,
              bio: '',
              avatar_url: null
            })
          }

          this.user = {
            id: session.user.id,
            email: session.user.email,
            username: profile?.username || getFallbackUsername(session.user),
            avatar_url: profile?.avatar_url ?? null,
            bio: profile?.bio ?? ''
          }
        } else {
          this.user = null
        }
      } catch (err) {
        this.user = null
        console.error('Error initializing auth:', err)
      } finally {
        this.loading = false
      }
    },
    async updateProfile(updates) {
      if (!this.user) return

      this.loading = true
      this.error = null
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', this.user.id)
          .select()
          .single()

        if (error) throw error
        
        if (data) {
          this.user = {
            ...this.user,
            username: data.username ?? this.user.username,
            avatar_url: data.avatar_url ?? this.user.avatar_url,
            bio: data.bio ?? this.user.bio
          }
        }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})