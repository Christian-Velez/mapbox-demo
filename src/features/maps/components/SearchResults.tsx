import { DirectionsIcon } from '@/components/DirectionsIcon'
import { getDirections } from '@/features/maps/api'
import { Place } from '@/features/maps/types'
import { useMapStore, usePlacesStore } from '@/features/maps/store'
import { useState } from 'react'
import Tooltip from '@/components/Tooltip'
import { AnySourceData, LngLatBounds } from 'mapbox-gl'
import { buildPolyline } from '@/features/maps/utils'

export function SearchResults() {
   const map = useMapStore((s) => s.map)
   const setSelectedRoute = useMapStore((s) => s.setSelectedRoute)
   const places = usePlacesStore((s) => s.places)
   const userLocation = usePlacesStore((s) => s.userLocation)
   const [activeId, setActiveId] = useState('')

   function focusPlace(place: Place) {
      if (!map) return

      map.flyTo({ zoom: 12, center: place.center })
      setActiveId(place.id)
   }

   async function onGetDirections(place: Place) {
      if (!userLocation || !map) return

      const start = userLocation.join(',')
      const end = place.center.join(',')
      const route = await getDirections(start, end)
      setSelectedRoute(route)

      /**
       * Adjust map position based on distance from A to B
       */
      const bounds = new LngLatBounds(userLocation, userLocation)

      for (const coord of route.coordinates) {
         bounds.extend(coord)
      }

      map.fitBounds(bounds, { padding: 100 })

      /**
       * Polyline
       */

      const id = 'RouteString'
      const polyline: AnySourceData = buildPolyline(route.coordinates)

      if (map.getLayer(id)) {
         map.removeLayer(id)
         map.removeSource(id)
      }

      map.addSource(id, polyline)
      map.addLayer({
         id,
         type: 'line',
         source: id,
         layout: {
            'line-cap': 'round',
            'line-join': 'round',
         },
         paint: {
            'line-color': 'rgb(85, 165, 197)',
            'line-width': 4,
         },
      })
   }

   return (
      <div className='flex flex-col gap-0 bg-white rounded-b-lg border-t-[1px] w-96'>
         {places.map((place, i) => {
            const isLastChild = i === places.length - 1
            const active = activeId === place.id

            return (
               <div
                  key={place.id}
                  className={`flex w-full justify-between px-5 py-2 text-sm hover:bg-gray-100 cursor-pointer
                     ${isLastChild ? 'rounded-b-lg' : ''} ${
                        active ? 'bg-gray-100' : ''
                     }`}
                  onClick={() => focusPlace(place)}
               >
                  <div>
                     <p>{place.placeName}</p>
                     <p className='text-gray-400 font-thin'>{place.address}</p>
                  </div>

                  <Tooltip title='Get directions'>
                     <div
                        className='cursor-pointer ml-5 hover:bg-gray-200 h-[1.6em]'
                        onClick={() => onGetDirections(place)}
                     >
                        <DirectionsIcon />
                     </div>
                  </Tooltip>
               </div>
            )
         })}
      </div>
   )
}
