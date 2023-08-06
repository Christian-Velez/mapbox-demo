import { MAPBOX_TOKEN } from '@/config'
import { Place } from '@/features/maps/types'
import type { SearchApiResponse } from './search.types'

export async function search(
   query: string,
   proximity: string
): Promise<Place[]> {
   const baseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?`

   const url =
      baseUrl +
      new URLSearchParams({
         limit: '5',
         language: 'en',
         access_token: MAPBOX_TOKEN,
         proximity,
      }).toString()

   const data = await fetch(url).then(
      (response) => response.json() as Promise<SearchApiResponse>
   )
   return mapSearchResponse(data)
}

function mapSearchResponse(data: SearchApiResponse): Place[] {
   return data.features.map((feature) => ({
      id: feature.id,
      type: feature.type,
      relevance: feature.relevance,
      placeName: feature.text,
      address: feature.place_name,
      properties: feature.properties,
      center: feature.center,
   }))
}
