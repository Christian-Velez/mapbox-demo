import { getUserLocation } from '@/utils/getUserLocation'
import { MapView } from '@/features/maps/components'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { usePlacesStore } from './store'
import { LoadingScreen } from '@/components/LoadingScreen'

export function MapsApp() {
   const loading = usePlacesStore((s) => s.loading)
   const setUserLocation = usePlacesStore((s) => s.setUserLocation)

   useEffect(() => {
      getUserLocation()
         .then((value) => {
            setUserLocation(value)
            toast.success('User location updated successfully')
         })
         .catch((err: Error) => {
            toast.error(err.message)
         })
   }, [setUserLocation])

   if (loading) {
      return <LoadingScreen />
   }

   return <MapView />
}
