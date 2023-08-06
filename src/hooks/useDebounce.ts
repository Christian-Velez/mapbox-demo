import { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...params: any[]) => void>(
   fn: T,
   delay = 1000
) {
   const debounceRef = useRef<ReturnType<typeof setTimeout>>()

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   return function (this: any, ...args: any[]) {
      if (debounceRef.current) {
         clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
         fn.apply(this, args)
      }, delay)
   } as T
}
