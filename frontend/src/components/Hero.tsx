import React from 'react'
import Button from './common/Button'

const Hero = () => {
  return (
    <div className='flex px-50 mt-20'>
      <div className='w-[38%] flex flex-col gap-6'>
        <h1 className='text-6xl/18 font-bold'>
          Level Up Your
          <br />
          <span className='bg-gradient-to-r from-[#1371F3] to-[#5EA4FA] bg-clip-text text-transparent'>
            Productivity
          </span>
        </h1>
        <p className='text-lg/6 text-muted'>
          Gamify your tasks, earn XP for focus sessions, and unlock your true potential with our AI-driven quest system.
        </p>
        <div className='flex gap-4 mt-4'>
          <Button 
            btnText='Start Your Journey' 
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