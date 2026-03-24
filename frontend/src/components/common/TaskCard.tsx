import React from 'react'

interface TaskCardProps {
  title: string;
  type: 'personal' | 'work';
}

const TaskCard = ({ title, type }: TaskCardProps) => {
  return (
    <div className='flex justify-between items-center p-3 rounded-2xl mb-2 border border-muted/20 hover:border-primary/40'>
      <div className='flex gap-4 items-center'>
        <input type='radio' name='task' id={title} className='bg-transparent' />
        {title}
      </div>
      <div className={`capitalize text-sm mt-1 px-2 rounded ${type === 'personal' ? 'bg-purple-500/20' : 'bg-blue-500/20'}`}>
        {type}
      </div>
    </div>
  )
}

export default TaskCard