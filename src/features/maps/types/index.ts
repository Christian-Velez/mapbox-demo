import { Properties } from '@/features/maps/api/search.types'

export interface Place {
   id: string
   type: string
   relevance: number
   placeName: string
   address: string
   properties: Properties
   center: [number, number]
}
