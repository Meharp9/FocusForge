import React from 'react'

interface StepProps {
  label?: string;
  value?: string;
  index?: number;
  title?: string;
  description?: string;
}

const Step = ({ label, value, index, title, description }: StepProps) => {
  if (index !== undefined && title && description) {
    return (
      <div className='flex flex-col items-center gap-3 text-center flex-1'>
        <div className='bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-bold'>
          {index}
        </div>
        <h3 className='text-lg font-bold'>{title}</h3>
        <p className='text-sm text-muted'>{description}</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <p className='text-white text-2xl font-black'>{value}</p>
      <p className='text-center text-white/80 text-sm'>{label}</p>
    </div>
  )
}

export default Step