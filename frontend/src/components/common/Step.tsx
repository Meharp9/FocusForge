import React from 'react'

interface StepProps {
  index: number;
  title: string;
  description: string;
}

const Step = ({ index, title, description }: StepProps) => {
  return (
    <div className='flex flex-col items-center gap-3 md:gap-4 flex-1'>
      <div className='bg-primary font-black rounded-xl md:rounded-2xl p-2.5 md:p-3 text-base md:text-lg'>
        0{index}
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <h3 className='text-xl md:text-2xl font-black text-center'>{title}</h3>
        <p className='text-muted text-sm md:text-base w-full sm:w-[90%] md:w-[85%] text-center'>{description}</p>
      </div>
    </div>
  )
}

export default Step