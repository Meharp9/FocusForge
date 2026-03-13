import React from 'react'

interface StepProps {
  index: number;
  title: string;
  description: string;
}

const Step = ({ index, title, description }: StepProps) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='bg-primary font-black rounded-2xl p-3 text-lg'>
        0{index}
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <h3 className='text-2xl font-black'>{title}</h3>
        <p className='text-muted font-sm w-[85%] text-center'>{description}</p>
      </div>
    </div>
  )
}

export default Step