import React from 'react'
import Logo from './common/Logo'
import { Copyright, Swords } from 'lucide-react'

const Footer = () => {
  return (
    <div className='px-50 py-5 border-t border-muted/20 flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        <Swords size={18}/>
        <span>
          FocusForge
        </span>
      </div>
      <div className='flex items-center gap-1 text-muted text-xs'>
        <Copyright size={16} className='inline-block mr-1'/>
        <p>
          2026 FocusForge
        </p>
      </div>
    </div>
  )
}

export default Footer