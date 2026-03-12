import React from 'react'
import { Swords } from 'lucide-react';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='bg-gradient-primary p-1.5 rounded'>
        <Swords size={22} strokeWidth={2.5}/>
      </div>
      <p className='text-xl font-bold text-heading'>FocusForge</p>
    </div>
  )
}

export default Logo