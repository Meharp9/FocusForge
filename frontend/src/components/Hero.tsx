import React from 'react'
import Button from './common/Button'
import { Sparkles } from 'lucide-react'
import BannerIllustration from './BannerIllustration'

const Hero = () => {
  return (
    <div className='flex px-50 mt-20 mb-10 justify-between items-center'>
      <div className='w-[45%] flex flex-col gap-6'>
        <div className='bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium w-max flex items-center gap-2'>
          <Sparkles size={16}/>
          Level Up Your Productivity
        </div>
        <h1 className='text-6xl/18 font-black text-heading'>
          Forge Your Focus.
          <br />
          <span className='bg-gradient-primary bg-clip-text text-transparent'>
            Level Up Your Life.
          </span>
        </h1>
        <p className='text-lg/6 text-muted'>
          Transform your daily tasks into epic quests. Build unstoppable habits. Earn XP for every achievement. FocusForge turns productivity into an adventure worth taking.
        </p>
        <div className='flex gap-4 mt-4'>
          <Button 
            btnText='Start Forging' 
            className='py-2'
            showArrow={true}
          />
        </div>
      </div>
      <BannerIllustration />
    </div>
  )
}

export default Hero