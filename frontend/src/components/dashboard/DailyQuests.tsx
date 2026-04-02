import SoftCard from '@/components/common/SoftCard'
import TaskToggle from '@/components/dashboard/TaskToggle'
import InputField from '@/components/common/InputField'
import { Briefcase, Plus, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import TaskCard from '@/components/common/TaskCard'
import { TaskFilter } from '@/types/tasks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchQuests, addQuest, completeQuest, deleteQuest } from '@/store/slices/questSlice'

const DailyQuests = () => {
  const dispatch = useAppDispatch();
  const { quests } = useAppSelector((state) => state.quests);
  const [listType, setListType] = useState<TaskFilter>('all');
  const [taskInput, setTaskInput] = useState('');
  const [taskType, setTaskType] = useState<'personal' | 'work'>('personal');

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { dispatch(fetchQuests()); }, [dispatch]);

  const filteredTasks = useMemo(() => {
    if (listType === 'all') return quests;
    return quests.filter((task) => task.type === listType);
  }, [quests, listType]);

  const handleAddQuest = async () => {
    if (taskInput.trim() === '') return;
    await dispatch(addQuest({ title: taskInput, type: taskType }));
    setTaskInput('');
  };

  const completedCount = quests.filter((t) => t.completed).length;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='font-bold tracking-wide'>
            Daily Quests
          </h2>
          <p className='text-sm text-muted mt-1'>
            {completedCount}/{quests.length} completed
          </p>
        </div>
        <TaskToggle onSwitchList={(option) => setListType(option as TaskFilter)} />
      </div>
      <div className='flex items-center gap-3'>
        <InputField
          type="text"
          value={taskInput}
          placeholder="Add a new quest...."
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddQuest()}
          className='flex-grow'
        />
        <div className='flex items-center gap-2'>
          <div className={`p-3 rounded cursor-pointer ${taskType === 'personal' ? 'bg-primary' : 'border border-border'}`} onClick={() => setTaskType('personal')}>
            <User size={20} />
          </div>
          <div className={`p-3 rounded cursor-pointer ${taskType === 'work' ? 'bg-primary' : 'border border-border'}`} onClick={() => setTaskType('work')}>
            <Briefcase size={20} />
          </div>
        </div>
        <div className='p-3 rounded bg-primary cursor-pointer' onClick={handleAddQuest}>
          <Plus size={20}/>
        </div>
      </div>
      <div className='mb-6'>
        {filteredTasks.length === 0 ? (
          <p className='text-sm text-muted text-center mt-6'>
            No quests yet. Add one above!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              type={task.type}
              completed={task.completed}
              xpReward={task.xp_reward}
              onComplete={() => dispatch(completeQuest(task.id))}
              onDelete={() => dispatch(deleteQuest(task.id))}
            />
          ))
        )}
      </div>
    </SoftCard>
  )
}

export default DailyQuests
