import React from 'react'
import Button from './common/Button'

const Hero = () => {
  return (
    <div className='flex px-50 mt-20'>
      <div className='w-[45%] flex flex-col gap-6'>
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
          />
          <Button
            btnText='✨ Generate AI Plan'
            type='secondary'
          />
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Hero