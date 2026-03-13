import React from 'react'
import { Swords } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='bg-gradient-primary p-1.5 rounded text-white'>
        <Swords className='w-5 h-5 md:w-5.5 md:h-5.5' strokeWidth={2.5}/>
      </div>
      <p className='text-base md:text-lg lg:text-xl font-bold text-heading'>FocusForge</p>
    </div>
  )
}

export default Logo