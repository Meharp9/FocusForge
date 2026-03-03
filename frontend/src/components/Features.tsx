import React from 'react'
import Card from './common/Card'
import { Flame, SquareCheckBig, TrendingUp } from 'lucide-react'

const FEATURE_LIST = [
  {
    icon: <div className='bg-primary rounded p-3 w-fit'>
      <SquareCheckBig size={25}/>
    </div>,
    title: "Daily Quests",
    description: "Transform your to-do list into exciting daily quests. Check off tasks and earn XP for every victory"
  },
  {
    icon: <div className='bg-secondary rounded p-3 w-fit'>
      <Flame size={25}/>
    </div>,
    title: "Habit Forge",
    description: "Build unbreakable habits with streak tracking. Watch your consistency flame grow stronger every day."
  },
  {
    icon: <div className='bg-tertiary rounded p-3 w-fit'>
      <TrendingUp size={25}/>
    </div>,
    title: "XP & Level System",
    description: "Level up your life with real progress. Gain experience points, unlock achievements, and track your growth."
  }
]

const Features = () => {
  return (
    <div className='my-20 px-50 flex flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h2 className='text-5xl font-black'>
          Supercharge Your Productivity
        </h2>
        <p className='text-lg text-muted w-[85%]'>
          Gamify your goals with powerful features designed to keep you motivated and engaged.
        </p>
      </div>
      <div className='flex items-center gap-6'>
        {FEATURE_LIST.map((feature, index) => {
          return (
            <Card 
              key={index}
              hoverEffects="transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              className='flex flex-col gap-4'
            >
              {feature.icon}
              <h3 className='text-2xl font-bold'>{feature.title}</h3>
              <p className='text-muted'>{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Features