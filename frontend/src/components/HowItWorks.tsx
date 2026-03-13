import React from 'react'
import Step from './common/Step'

const Steps = [
  {
    title: "Add Your Quests",
    description: "Create tasks and habits you want to forge into consistency."
  },
  {
    title: "Complete & Earn",
    description: "Finish quests to earn XP and maintain your daily streak."
  },
  {
    title: "Level Up",
    description: "Watch your level grow and unlock achievements along the way."
  }
]

const HowItWorks = () => {
  return (
    <div className='flex flex-col gap-8 md:gap-12 lg:gap-16 my-12 md:my-16 lg:my-20 items-center px-6 md:px-12'>
      <div className='flex flex-col justify-center items-center gap-2 md:gap-3'>
        <p className='text-primary font-bold tracking-widest text-xs sm:text-sm'>
          HOW IT WORKS
        </p>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black flex flex-col sm:flex-row gap-2 items-center text-center'>
          <span>Three Steps to</span>
          <span className='bg-gradient-primary bg-clip-text text-transparent'>
            Level Up
          </span>
        </h2>
      </div>
      <div className='flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-8 max-w-5xl'>
        {Steps.map((step, index) => <Step 
          key={index} 
          index={index + 1}
          title={step.title} 
          description={step.description} 
        />)}
      </div>
    </div>
  )
}

export default HowItWorks