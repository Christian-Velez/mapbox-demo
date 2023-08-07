export default function Tooltip({
   title,
   children,
}: {
   title: string
   children: React.ReactNode
}) {
   return (
      <div className='group relative flex'>
         {children}
         <span className='absolute left-16 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100'>
            {title}
         </span>
      </div>
   )
}
