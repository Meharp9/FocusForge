import React from 'react'
import { Swords } from 'lucide-react';

interface LogoProps {
  light?: boolean;
}

const Logo = ({ light = false }: LogoProps) => {
  return (
    <div className='flex items-center gap-2'>
      <div className={`p-1.5 rounded ${light ? 'bg-white/20 text-white' : 'bg-gradient-primary text-white'}`}>
        <Swords className='w-5 h-5 md:w-5.5 md:h-5.5' strokeWidth={2.5}/>
      </div>
      <p className={`text-base md:text-lg lg:text-xl font-bold ${light ? 'text-white' : 'text-heading'}`}>FocusForge</p>
    </div>
  )
}

export default Logo