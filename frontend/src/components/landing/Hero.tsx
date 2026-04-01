import React from 'react'
import Button from '@/components/common/Button'
import { Sparkles } from 'lucide-react'
import BannerIllustration from '@/components/landing/BannerIllustration'

const Hero = () => {
  return (
    <div className='flex flex-col lg:flex-row px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 mt-8 md:mt-12 lg:mt-20 mb-6 md:mb-8 lg:mb-10 justify-between items-center gap-8 lg:gap-0'>
      <div className='w-full lg:w-[45%] flex flex-col gap-4 md:gap-5 lg:gap-6'>
        <div className='bg-primary/10 text-primary rounded-full px-3 py-1 text-xs sm:text-sm font-medium w-max flex items-center gap-2'>
          <Sparkles className='w-3.5 h-3.5 sm:w-4 sm:h-4'/>
          Level Up Your Productivity
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-heading leading-tight'>
          Forge Your Focus.
          <br />
          <span className='bg-gradient-primary bg-clip-text text-transparent'>
            Level Up Your Life.
          </span>
        </h1>
        <p className='text-base sm:text-lg text-muted leading-relaxed'>
          Transform your daily tasks into epic quests. Build unstoppable habits. Earn XP for every achievement. FocusForge turns productivity into an adventure worth taking.
        </p>
        <div className='flex gap-3 md:gap-4 mt-2 md:mt-4'>
          <Button
            btnText='Start Forging'
            className='py-2 md:py-2.5'
            showArrow={true}
          />
        </div>
      </div>
      <BannerIllustration />
    </div>
  )
}

export default Hero
