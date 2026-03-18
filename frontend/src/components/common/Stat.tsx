import React from 'react'

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({value, label}: StatProps) => {
  return (
    <div className='flex flex-col justify-center items-center text-sm'>
      <h3 className='font-bold text-xl'>{value}</h3>
      <p className='text-muted'>{label}</p>
    </div>
  )
}

export default Stat