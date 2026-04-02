import SoftCard from '@/components/common/SoftCard'
import TaskToggle from '@/components/dashboard/TaskToggle'
import InputField from '@/components/common/InputField'
import { Briefcase, Plus, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import TaskCard from '@/components/common/TaskCard'
import { Task, TaskFilter } from '@/types/tasks'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const DailyQuests = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [listType, setListType] = useState<TaskFilter>('all');
  const [taskInput, setTaskInput] = useState('');
  const [taskType, setTaskType] = useState<'personal' | 'work'>('personal');

  const fetchQuests = async () => {
    try {
      const res = await fetch(`${API_URL}/quests/list`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setTaskList(data.quests);
      }
    } catch (err) {
      console.error('Failed to fetch quests:', err);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchQuests(); }, []);

  const filteredTasks = useMemo(() => {
    if (listType === 'all') return taskList;
    return taskList.filter((task) => task.type === listType);
  }, [taskList, listType]);

  const addQuest = async () => {
    if (taskInput.trim() === '') return;

    try {
      const res = await fetch(`${API_URL}/quests/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: taskInput, type: taskType }),
      });
      const data = await res.json();
      if (data.success) {
        setTaskInput('');
        fetchQuests();
      }
    } catch (err) {
      console.error('Failed to add quest:', err);
    }
  };

  const completeQuest = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/quests/complete/${id}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        fetchQuests();
      }
    } catch (err) {
      console.error('Failed to complete quest:', err);
    }
  };

  const deleteQuest = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/quests/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        fetchQuests();
      }
    } catch (err) {
      console.error('Failed to delete quest:', err);
    }
  };

  const completedCount = taskList.filter((t) => t.completed).length;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='font-bold tracking-wide'>
            Daily Quests
          </h2>
          <p className='text-sm text-muted mt-1'>
            {completedCount}/{taskList.length} completed
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
          onKeyDown={(e) => e.key === 'Enter' && addQuest()}
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
        <div className='p-3 rounded bg-primary cursor-pointer' onClick={addQuest}>
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
              onComplete={() => completeQuest(task.id)}
              onDelete={() => deleteQuest(task.id)}
            />
          ))
        )}
      </div>
    </SoftCard>
  )
}

export default DailyQuests
