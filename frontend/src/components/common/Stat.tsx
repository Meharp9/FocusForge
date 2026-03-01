import React from 'react'

interface StatProps {
  count: string;
  title: string;
  color?: 'primary' | 'secondary' | 'tertiary';
}

const Stat = ({count, title, color = 'primary'}: StatProps) => {
  const colorClass = color === 'primary' ? 'text-primary' : color === 'secondary' ? 'text-secondary' : 'text-tertiary';
  
  return (
    <div className='flex flex-col justify-center items-center text-sm'>
      <h3 className={`font-bold text-xl ${colorClass}`}>{count}</h3>
      <p className='text-muted'>{title}</p>
    </div>
  )
}

export default Stat