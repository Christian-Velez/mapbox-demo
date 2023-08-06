import { create } from 'zustand'

type Store = {
   loading: boolean
   userLocation?: [number, number]
   setUserLocation: (v: [number, number]) => void
}

export const usePlacesStore = create<Store>()((set) => ({
   loading: false,

   setUserLocation: (value: [number, number]) => {
      set({ userLocation: value })
   },
}))
