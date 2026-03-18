import React from 'react'
import Logo from '../common/Logo'
import { Copyright } from 'lucide-react'
import Step from '../common/Step'

const authStats = [
  {
    label: "Achievements",
    value: "100+"
  },
  {
    label: "Levels",
    value: "∞"
  },
  {
    label: "Focus Tools",
    value: "24/7"
  }
]

const AuthBanner = () => {
  return (
    <div className='bg-primary w-[50%] h-screen p-12 flex flex-col justify-between'>
      <Logo light={true}/>
      <div className='flex flex-col gap-4 w-[70%]'>
        <h2 className='text-4xl lg:text-5xl font-black text-white'>
          Your productivity journey starts here.
        </h2>
        <p className='text-white/80 text-xl'>
          Earn XP. Build streaks. Unlock achievements. Every task completed is a step forward.
        </p>
        <div className='flex gap-6'>
          {authStats.map((stat, index) => (
            <Step
              key={index}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      </div>
      <div className='flex items-center gap-1 text-white/60 text-sm'>
        <Copyright className='w-3.5 h-3.5 md:w-4 md:h-4 inline-block mr-1'/>
        <p>
          2026 FocusForge
        </p>
      </div>
    </div>
  )
}

export default AuthBanner