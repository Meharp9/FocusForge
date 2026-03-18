import React from 'react'

interface StepProps {
  label: string;
  value: string;
}

const Step = ({ label, value }: StepProps) => {
  return (
    <div className='flex flex-col'>
      <p className='text-white text-2xl font-black'>{value}</p>
      <p className='text-center text-white/80 text-sm'>{label}</p>
    </div>
  )
}

export default Step