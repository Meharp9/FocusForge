import { useState } from 'react';
import { TASK_FILTER_OPTIONS } from '@/constants/tasks';

const TaskToggle = ({ onSwitchList }: { onSwitchList: (option: string) => void }) => {
  const [activeOption, setActiveOption] = useState("All");

  const handleOptionClick = (option: string) => {
    setActiveOption(option);
    onSwitchList(option.toLowerCase());
  }

  return (
    <div className='flex items-center bg-muted/10 rounded p-0.5 text-xs'>
      {TASK_FILTER_OPTIONS.map((option, index) => (
        <div
          key={index}
          className={`px-3 py-1 rounded-[0.5rem] cursor-pointer font-semibold ${activeOption === option ? 'bg-background' : ''}`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  )
}

export default TaskToggle
