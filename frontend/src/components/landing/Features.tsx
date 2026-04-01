import React from 'react'
import Card from '@/components/common/Card'
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
    <div className='my-8 md:my-12 lg:my-16 xl:my-20 flex flex-col items-center gap-6 md:gap-8 lg:gap-10'>
      <div className='flex flex-col items-center gap-3 md:gap-4 text-center px-6 md:px-12 lg:px-20 xl:px-32'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black'>
          Supercharge Your Productivity
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-muted w-full md:w-[85%]'>
          Gamify your goals with powerful features designed to keep you motivated and engaged.
        </p>
      </div>

      {/* Mobile Carousel */}
      <div className='md:hidden w-full overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 px-6 snap-x snap-mandatory'>
          {FEATURE_LIST.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className='snap-center shrink-0 w-[85vw] max-w-[340px]'>
                <Card
                  className="flex flex-col gap-3 h-full"
                >
                  <div className={`bg-primary/10 rounded-lg p-2.5 w-fit`}>
                    <Icon className="w-5 h-5 text-orange-500" strokeWidth={2}/>
                  </div>
                  <h3 className='text-lg sm:text-xl font-bold'>{feature.title}</h3>
                  <p className='text-sm text-muted'>{feature.description}</p>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full max-w-7xl px-12 lg:px-20 xl:px-32'>
        {FEATURE_LIST.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card
              key={index}
              hoverEffects="transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_1.25rem_2.5rem_rgba(0,0,0,0.5)]"
              className="flex flex-col gap-4"
            >
              <div className={`bg-primary/10 rounded-lg p-3 w-fit`}>
                <Icon className="w-6 h-6 text-orange-500" strokeWidth={2}/>
              </div>
              <h3 className='text-xl md:text-2xl font-bold'>{feature.title}</h3>
              <p className='text-base text-muted'>{feature.description}</p>
            </Card>
          )
        })}
      </div>

      {/* Carousel Indicators */}
      <div className='flex md:hidden gap-2 mt-2'>
        {FEATURE_LIST.map((_, index) => (
          <div
            key={index}
            className='w-2 h-2 rounded-full bg-primary/30'
          />
        ))}
      </div>
    </div>
  )
}

export default Features
