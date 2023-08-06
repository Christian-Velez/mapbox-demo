export async function getUserLocation(): Promise<[number, number]> {
   return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
         ({ coords }) => {
            resolve([coords.longitude, coords.latitude])
         },

         (e) => {
            reject(new Error(e.message))
         }
      )
   })
}
