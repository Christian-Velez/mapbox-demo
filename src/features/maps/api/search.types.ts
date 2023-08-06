export interface SearchApiResponse {
   type: string
   query: string[]
   features: Feature[]
   attribution: string
}

interface Feature {
   id: string
   type: string
   place_type: string[]
   relevance: number
   properties: Properties
   text_en: string
   place_name_en: string
   text: string
   place_name: string
   center: [number, number]
   geometry: Geometry
}

interface Geometry {
   coordinates: number[]
   type: string
}

export interface Properties {
   foursquare: string
   landmark: boolean
   address: string
   category: string
}
