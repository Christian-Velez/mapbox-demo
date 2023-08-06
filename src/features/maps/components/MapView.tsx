import { MAPBOX_TOKEN } from '@/config'
import { SearchBar, CenterButton } from '@/features/maps/components'
import { useLayoutEffect, useRef } from 'react'
import { useMapStore, usePlacesStore } from '@/features/maps/store'
import mapboxgl, { Marker, Popup } from 'mapbox-gl'
import { MAP_STYLE } from '@/features/maps/consts'
import { ReactLogo } from '@/components/ReactLogo'
import { ToggleThemeButton } from '@/features/maps/components/ToggleThemeButton'

mapboxgl.accessToken = MAPBOX_TOKEN

export function MapView() {
   const isMapReady = useMapStore((s) => s.isMapReady)
   const setMap = useMapStore((s) => s.setMap)
   const userLocation = usePlacesStore((s) => s.userLocation)
   const mapDiv = useRef<HTMLDivElement>(null)

   useLayoutEffect(() => {
      const map = new mapboxgl.Map({
         container: mapDiv.current!,
         style: MAP_STYLE.dark,
         center: userLocation,
         zoom: 12,
      })

      const locationPopup = new Popup().setHTML(`<h4>Current location</h4>`)

      setMap(map)

      new Marker().setLngLat(map.getCenter()).setPopup(locationPopup).addTo(map)
   }, [userLocation, setMap])

   return (
      <div ref={mapDiv} className='w-full h-full'>
         {!isMapReady && <p>Loading map...</p>}

         <SearchBar />
         <CenterButton />
         <ToggleThemeButton />

         <ReactLogo className='z-50 absolute bottom-5 right-5' />
      </div>
   )
}
