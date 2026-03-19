import { Zap } from 'lucide-react'
import React from 'react'

const LevelTag = ({ level = 1 }: { level?: number }) => {
  return (
    <div className='flex gap-2 items-center rounded-lg bg-primary/30 text-sm font-medium px-2 py-1 text-rust'>
      <Zap size={16} />
      Lv. {level}
    </div>
  )
}

export default LevelTag