import { create } from 'zustand'
import { getCookie, setCookie } from '@/lib/cookies'

export interface CloudEnvironment {
  id: string
  name: string
  provider: 'gcp' | 'azure' | 'aws'
  type: 'project' | 'subscription' | 'account'
  organizationId: string
  organizationName: string
  resourceCount?: number
}

export type ViewMode = 'single' | 'all'

interface EnvironmentState {
  environment: {
    selected: CloudEnvironment | null
    setSelected: (env: CloudEnvironment | null) => void
    viewMode: ViewMode
    setViewMode: (mode: ViewMode) => void
    reset: () => void
  }
}

const ENVIRONMENT_COOKIE = 'selected_environment'
const VIEW_MODE_COOKIE = 'environment_view_mode'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export const useEnvironmentStore = create<EnvironmentState>()((set) => {
  const cookieEnv = getCookie(ENVIRONMENT_COOKIE)
  const cookieViewMode = getCookie(VIEW_MODE_COOKIE)

  const initEnv = cookieEnv ? JSON.parse(cookieEnv) : null
  const initViewMode = (cookieViewMode as ViewMode) || 'all'

  return {
    environment: {
      selected: initEnv,
      setSelected: (env) => {
        set((state) => {
          if (env) {
            setCookie(ENVIRONMENT_COOKIE, JSON.stringify(env), COOKIE_MAX_AGE)
          } else {
            setCookie(ENVIRONMENT_COOKIE, '', 0) // Clear cookie
          }
          return {
            ...state,
            environment: {
              ...state.environment,
              selected: env,
              viewMode: env ? 'single' : 'all' // Auto-switch to single when env selected
            }
          }
        })
      },
      viewMode: initViewMode,
      setViewMode: (mode) => {
        set((state) => {
          setCookie(VIEW_MODE_COOKIE, mode, COOKIE_MAX_AGE)
          return {
            ...state,
            environment: {
              ...state.environment,
              viewMode: mode,
              // Clear selection when switching to 'all' mode
              selected: mode === 'all' ? null : state.environment.selected
            }
          }
        })
      },
      reset: () => {
        set((state) => {
          setCookie(ENVIRONMENT_COOKIE, '', 0)
          setCookie(VIEW_MODE_COOKIE, 'all', COOKIE_MAX_AGE)
          return {
            ...state,
            environment: {
              ...state.environment,
              selected: null,
              viewMode: 'all'
            },
          }
        })
      },
    },
  }
})
