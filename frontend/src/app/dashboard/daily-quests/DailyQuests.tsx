import SoftCard from '../../../components/common/SoftCard'
import TaskToggle from '@/app/dashboard/daily-quests/TaskToggle'
import InputField from '../../../components/common/InputField'
import { Briefcase, Plus, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import TaskCard from '@/components/common/TaskCard'

interface Task {
  id: number;
  title: string;
  type: 'personal' | 'work';
}

const DailyQuests = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [listType, setListType] = useState('all');
  const [taskInput, setTaskInput] = useState('');
  const [taskType, setTaskType] = useState<'personal' | 'work'>('personal');
  
  useEffect(() => {
    if (listType === 'all') {
      setFilteredTasks(taskList);
    } else {
      setFilteredTasks(taskList.filter((task) => task.type === listType));
    }
  }, [taskList, listType]);

  console.log(filteredTasks);

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='font-bold tracking-wide'>
            Daily Quests
          </h2>
          <p className='text-sm text-muted mt-1'>
            0/0 completed
          </p>
        </div>
        <TaskToggle onSwitchList={(option) => setListType(option)} />
      </div>
      <div className='flex items-center gap-3'>
        <InputField 
          type="text"
          value={taskInput}
          placeholder="Add a new quest...."
          onChange={(e) => setTaskInput(e.target.value)}
          className='flex-grow'
        />
        <div className='flex items-center gap-2'>
          <div className={`p-3 rounded cursor-pointer ${taskType === 'personal' ? 'bg-primary' : 'border border-black dark:border-white'}`} onClick={() => setTaskType('personal')}>
            <User size={20} />
          </div>
          <div className={`p-3 rounded cursor-pointer ${taskType === 'work' ? 'bg-primary' : 'border border-black dark:border-white'}`} onClick={() => setTaskType('work')}>
            <Briefcase size={20} />
          </div>
        </div>
        <div className='p-3 rounded bg-primary cursor-pointer' onClick={() => {
          if (taskInput.trim() !== '') {
            setTaskList([...taskList, {
              id: Date.now(),
              title: taskInput,
              type: taskType
            }]);
            setTaskInput('');
          }
        }}>
          <Plus size={20}/>
        </div>
      </div>
      <div className='mb-6'>
        {filteredTasks.length === 0 ? (
          <p className='text-sm text-muted text-center mt-6'>
            No quests yet. Add one above!
          </p>
        ) : (
          filteredTasks.map((task, index) => (
            <TaskCard key={index} title={task.title} type={task.type} />
          ))
        )}
      </div>
    </SoftCard>
  )
}

export default DailyQuests