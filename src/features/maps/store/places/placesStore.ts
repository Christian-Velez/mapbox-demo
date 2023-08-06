import { Place } from '@/features/maps/types'
import { create } from 'zustand'

type Store = {
   loading: boolean
   userLocation?: [number, number]
   setUserLocation: (v: [number, number]) => void

   loadingPlaces: boolean
   places: Place[]
   setLoadingPlaces: (v: boolean) => void
   setPlaces: (v: Place[]) => void
}

export const usePlacesStore = create<Store>()((set) => ({
   loading: true,
   loadingPlaces: false,
   places: [],

   setUserLocation: (value: [number, number]) => {
      set({ userLocation: value, loading: false })
   },

   setLoadingPlaces: (value: boolean) => {
      set({ loadingPlaces: value })
   },

   setPlaces: (value: Place[]) => {
      set({ places: value, loadingPlaces: false })
   },
}))
