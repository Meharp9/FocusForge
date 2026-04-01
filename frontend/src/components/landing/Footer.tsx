import React from 'react'
import { Copyright, Swords } from 'lucide-react'

const Footer = () => {
  return (
    <div className='px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-4 md:py-5 border-t border-muted/20 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0'>
      <div className='flex items-center gap-2'>
        <Swords className='w-4 h-4 md:w-4.5 md:h-4.5'/>
        <span className='text-sm md:text-base'>
          FocusForge
        </span>
      </div>
      <div className='flex items-center gap-1 text-muted text-xs'>
        <Copyright className='w-3.5 h-3.5 md:w-4 md:h-4 inline-block mr-1'/>
        <p>
          2026 FocusForge
        </p>
      </div>
    </div>
  )
}

export default Footer
