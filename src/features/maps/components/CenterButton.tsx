import { useMapStore, usePlacesStore } from '@/features/maps/store'

export function CenterButton() {
   const map = useMapStore((s) => s.map)
   const userLocation = usePlacesStore((s) => s.userLocation)

   function centerMap() {
      map?.flyTo({
         zoom: 12,
         center: userLocation,
      })
   }

   return (
      <div className='absolute top-5 right-5 z-50 flex justify-center items-center gap-5'>
         <button
            className=' bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-10'
            onClick={centerMap}
         >
            My current location
         </button>
      </div>
   )
}
