import { Check, Trash2 } from 'lucide-react'

interface TaskCardProps {
  title: string;
  type?: 'personal' | 'work';
  completed?: boolean;
  xpReward?: number;
  onComplete?: () => void;
  onDelete?: () => void;
}

const TaskCard = ({ title, type, completed, xpReward, onComplete, onDelete }: TaskCardProps) => {
  return (
    <div className={`flex justify-between items-center p-4 rounded-2xl mb-2 border border-border hover:border-primary/40 ${completed ? 'opacity-50' : ''}`}>
      <div className='flex gap-4 items-center'>
        <button
          onClick={onComplete}
          disabled={completed}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${completed ? 'border-primary bg-primary' : 'border-muted hover:border-primary'}`}
        >
          {completed && <Check size={14} />}
        </button>
        <span className={`font-medium ${completed ? 'line-through text-muted' : ''}`}>{title}</span>
      </div>
      <div className='flex items-center gap-3'>
        <div className={`uppercase text-xs font-semibold tracking-wide px-3 py-0.5 rounded-full ${type === 'personal' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
          {type}
        </div>
        {xpReward && <span className='text-sm text-primary font-semibold'>+{xpReward}xp</span>}
        <button onClick={onDelete} className='text-muted hover:text-red-500 cursor-pointer'>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}

export default TaskCard