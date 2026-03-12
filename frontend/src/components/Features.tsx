import React from 'react'
import Card from './common/Card'
import { Flame, Target, Clock, Trophy, Zap, Shield } from 'lucide-react'

const FEATURE_LIST = [
  {
    icon: Target,
    title: "Daily Quests",
    description: "Transform tasks into XP-earning quests with personal and work categories.",
  },
  {
    icon: Clock,
    title: "Focus Timer",
    description: "Built-in Pomodoro with work/break cycles to track deep work sessions.",
  },
  {
    icon: Flame,
    title: "Habit Streaks",
    description: "Build daily habits and watch your streaks grow with visual tracking.",
  },
  {
    icon: Trophy,
    title: "Achievements",
    description: "Unlock milestones as you progress — from first task to legendary streaks.",
  },
  {
    icon: Zap,
    title: "XP & Leveling",
    description: "Every completed task earns XP. Level up and track your growth over time.",
  },
  {
    icon: Shield,
    title: "Time Blocking",
    description: "Color-coded visual scheduling to plan your day for maximum focus.",
  }
]

const Features = () => {
  return (
    <div className='my-12 md:my-16 lg:my-20 px-6 md:px-12 lg:px-50 flex flex-col items-center gap-8 md:gap-10'>
      <div className='flex flex-col items-center gap-3 md:gap-4 text-center'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-black'>
          Supercharge Your Productivity
        </h2>
        <p className='text-base md:text-lg text-muted w-full md:w-[85%]'>
          Gamify your goals with powerful features designed to keep you motivated and engaged.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl'>
        {FEATURE_LIST.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card 
              key={index}
              hoverEffects="transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              className="flex flex-col gap-4"
            >
              <div className={`bg-primary/10 rounded-lg p-3 w-fit`}>
                <Icon size={25} className="text-orange-500" strokeWidth={2}/>
              </div>
              <h3 className='text-xl md:text-2xl font-bold'>{feature.title}</h3>
              <p className='text-sm md:text-base text-muted'>{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Features