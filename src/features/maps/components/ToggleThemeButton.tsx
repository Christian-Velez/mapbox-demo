import { MoonIcon } from '@/components/MoonIcon'
import { SunIcon } from '@/components/SunIcon'
import { MAP_STYLE } from '@/features/maps/consts'
import { useMapStore } from '@/features/maps/store'
import { useState } from 'react'

export type Theme = 'light' | 'dark'

export function ToggleThemeButton() {
   const map = useMapStore((s) => s.map)
   const [theme, setTheme] = useState<Theme>('dark')

   function toggleTheme() {
      if (!map) return

      const newValue: Theme = theme === 'light' ? 'dark' : 'light'
      map.setStyle(MAP_STYLE[newValue])
      setTheme(newValue)
   }

   return (
      <button
         onClick={() => toggleTheme()}
         className='absolute top-5 right-40 z-50 flex justify-center items-center gap-5

         bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-10
         '
      >
         {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
   )
}
