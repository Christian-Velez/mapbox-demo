import { Route } from '@/features/maps/api/directions'
import mapboxgl, { Marker } from 'mapbox-gl'
import { create } from 'zustand'

type Store = {
   isMapReady: boolean
   map: mapboxgl.Map | null
   setMap: (map: mapboxgl.Map) => void

   markers: Marker[]
   setMarkers: (markers: Marker[]) => void

   selectedRoute?: Route
   setSelectedRoute: (route: Route) => void
}

export const useMapStore = create<Store>()((set) => ({
   isMapReady: false,
   map: null,
   markers: [],

   setMap: (map: mapboxgl.Map) => {
      set({ map, isMapReady: true })
   },

   setMarkers: (markers: Marker[]) => {
      set({ markers })
   },

   setSelectedRoute: (route: Route) => {
      set({ selectedRoute: route })
   },
}))
