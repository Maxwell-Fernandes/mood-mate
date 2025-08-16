import { create } from 'zustand'

const useMoodStore = create(set => ({
  mood: null,
  setMood: mood => set({ mood }),
}))

export default useMoodStore
