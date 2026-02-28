import React from 'react'
import { Swords } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='bg-primary/20 p-1.5 rounded'>
        <Swords size={25} color='#0f6cf2'/>
      </div>
      <p className='text-xl font-bold'>FocusForge</p>
    </div>
  )
}

export default Logo