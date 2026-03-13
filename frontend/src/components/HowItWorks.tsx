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
    <div className='flex flex-col gap-15 my-20 items-center'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-primary font-bold tracking-widest'>
          HOW IT WORKS
        </p>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-black flex gap-2 items-center'>
          Three Steps to 
          <p className='bg-gradient-primary bg-clip-text text-transparent'>
            Level Up
          </p>
        </h2>
      </div>
      <div className='flex gap-4'>
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