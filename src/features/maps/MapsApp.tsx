import { useEffect } from 'react'
import { usePlacesStore } from './store'
import { getUserLocation } from '@/utils/getUserLocation'
import { toast } from 'react-hot-toast'

export function MapsApp() {
   const userLocation = usePlacesStore((s) => s.userLocation)
   const setUserLocation = usePlacesStore((s) => s.setUserLocation)

   useEffect(() => {
      getUserLocation()
         .then((value) => {
            setUserLocation(value)
            toast.success('User location updated successfully')
         })
         .catch((err) => {
            if (err instanceof Error) {
               toast.error(err.message)
            }
         })
   }, [setUserLocation])

   return (
      <div>
         <h1>hello world</h1>

         <pre>{JSON.stringify(userLocation, null, 4)}</pre>
      </div>
   )
}
