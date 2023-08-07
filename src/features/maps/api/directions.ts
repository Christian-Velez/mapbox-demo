import { MAPBOX_TOKEN } from '@/config'
import { DirectionsAPIResponse } from '@/features/maps/api/directions.types'

export interface Route {
   distance: number
   duration: number
   coordinates: Array<[number, number]>
}

export async function getDirections(
   start: string,
   end: string
): Promise<Route> {
   const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?`

   const url =
      baseUrl +
      new URLSearchParams({
         alternatives: 'false',
         geometries: 'geojson',
         overview: 'simplified',
         steps: 'false',
         access_token: MAPBOX_TOKEN,
      }).toString()

   const data = await fetch(url).then(
      (response) => response.json() as Promise<DirectionsAPIResponse>
   )

   return mapDirectionsResponse(data)
}

function mapDirectionsResponse(response: DirectionsAPIResponse): Route {
   const route = response.routes[0]

   return {
      distance: route.distance,
      duration: route.duration,
      coordinates: route.geometry.coordinates,
   }
}
