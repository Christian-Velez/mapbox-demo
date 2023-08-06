import { search } from '@/features/maps/api'
import { SearchResults } from './SearchResults'
import { useMapStore, usePlacesStore } from '@/features/maps/store'
import { useDebounce } from '@/hooks/useDebounce'
import { Place } from '@/features/maps/types'
import { Marker, Popup } from 'mapbox-gl'

export function SearchBar() {
   const userLocation = usePlacesStore((s) => s.userLocation)
   const map = useMapStore((s) => s.map)
   const markers = useMapStore((s) => s.markers)
   const setMarkers = useMapStore((s) => s.setMarkers)
   const places = usePlacesStore((s) => s.places)
   const setLoadingPlaces = usePlacesStore((s) => s.setLoadingPlaces)
   const setPlaces = usePlacesStore((s) => s.setPlaces)

   const debouncedSearch = useDebounce(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         if (!userLocation) return

         const text = e.target.value
         if (!text.length) return

         setLoadingPlaces(true)

         search(text, userLocation.join(',')).then((places) => {
            setPlaces(places)
            updateMarkers(places)
         })
      }
   )

   function updateMarkers(places: Place[]) {
      if (!map) return

      /**
       * Remove current markers
       */
      markers.forEach((marker) => marker.remove())

      /**
       * Add new markers
       */
      const newMarkers: Marker[] = []

      for (const place of places) {
         const popup = new Popup().setHTML(
            `<h2 className='font-bold'>${place.placeName}</h2> <p>${place.address}</p>`
         )

         const marker = new Marker({ color: '#FC8181' })
            .setPopup(popup)
            .setLngLat(place.center)

         marker.addTo(map)
         newMarkers.push(marker)
      }

      /**
       * Store reference
       */
      setMarkers(newMarkers)
   }

   const showingResults = Boolean(places.length)

   return (
      <div className='absolute top-3 left-5 z-50 '>
         <div className='pt-2 mx-auto text-gray-600'>
            <input
               className={`w-96 bg-white h-10 px-5 pr-16 text-sm focus:outline-none
                  ${showingResults ? 'rounded-t-lg' : 'rounded-lg'}
               `}
               type='search'
               name='search'
               placeholder='Search'
               onChange={debouncedSearch}
            />

            <button type='submit' className='absolute right-0 top-0 mt-5 mr-4'>
               <svg
                  className='text-gray-600 h-4 w-4 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  version='1.1'
                  id='Capa_1'
                  x='0px'
                  y='0px'
                  viewBox='0 0 56.966 56.966'
                  width='512px'
                  height='512px'
               >
                  <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
               </svg>
            </button>
         </div>

         {showingResults && <SearchResults />}
      </div>
   )
}
