declare module 'vuex' {
  export type Store<S> = {
    state: S
    commit: (type: string, payload?: unknown) => void
    install: (app: unknown) => void
  }

  export function createStore<S>(options: {
    state: S
    mutations: Record<string, (state: S, payload: any) => void>
  }): Store<S>

  export function useStore<S = any>(): Store<S>
}
