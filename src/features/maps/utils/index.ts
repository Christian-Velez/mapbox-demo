import { AnySourceData } from 'mapbox-gl'

export function buildPolyline(
   coordinates: Array<[number, number]>
): AnySourceData {
   return {
      type: 'geojson',
      data: {
         type: 'FeatureCollection',
         features: [
            {
               type: 'Feature',
               properties: {},
               geometry: {
                  type: 'LineString',
                  coordinates,
               },
            },
         ],
      },
   }
}
