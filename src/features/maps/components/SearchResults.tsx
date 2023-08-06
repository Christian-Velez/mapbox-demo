import { useMapStore, usePlacesStore } from '@/features/maps/store'
import { Place } from '@/features/maps/types'

export function SearchResults() {
   const map = useMapStore((s) => s.map)
   const places = usePlacesStore((s) => s.places)

   function onClick(place: Place) {
      if (!map) return

      map.flyTo({ zoom: 12, center: place.center })
   }

   return (
      <div className='flex flex-col gap-0 bg-white rounded-b-lg border-t-[1px] w-96'>
         {places.map((place, i) => {
            const isLastChild = i === places.length - 1

            return (
               <div
                  key={place.id}
                  className={`px-5 py-2 text-sm hover:bg-gray-100 cursor-pointer
                     ${isLastChild ? 'rounded-b-lg' : ''} `}
                  onClick={() => onClick(place)}
               >
                  <p>{place.placeName}</p>
                  <p className='text-gray-400 font-thin'>{place.address}</p>
               </div>
            )
         })}
      </div>
   )
}
