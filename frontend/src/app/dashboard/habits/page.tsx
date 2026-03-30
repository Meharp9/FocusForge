'use client';

import SoftCard from '@/components/common/SoftCard';
import Header from '../Header';
import Sidebar from '../Sidebar';
import InputField from '@/components/common/InputField';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from '@/components/common/TaskCard';

interface Habit {
  id: number;
  title: string;
}

const Habits = () => {
  const [habitInput, setHabitInput] = useState('');
  const [habitList, setHabitList] = useState<Habit[]>([]);
  
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
        <div className='p-6 flex flex-col gap-6 w-[90%] self-center'>
          <SoftCard className='flex flex-col p-4 gap-6'>
            <div>
              <h2 className='font-bold tracking-wide'>
                Habit Tracker
              </h2>
              <p className='text-sm text-muted mt-1'>
                0/{habitList.length} today
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <InputField 
                type="text"
                value={habitInput}
                placeholder="New habit...."
                onChange={(e) => setHabitInput(e.target.value)}
                className='flex-grow'
              />
              <div className='p-3 rounded bg-primary cursor-pointer' onClick={() => {
                if (habitInput.trim() !== '') {
                  setHabitList([...habitList, {
                    id: Date.now(),
                    title: habitInput,
                  }]);
                  setHabitInput('');
                }
              }}>
                <Plus size={20}/>
              </div>
            </div>
            <div className='mb-6'>
              {habitList.length === 0 ? (
                <p className='text-sm text-muted text-center mt-6'>
                  Add habits to build your streaks!
                </p>
              ) : (
                habitList.map((habit, index) => (
                  <TaskCard key={index} title={habit.title} />
                ))
              )}
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  )
}

export default Habits;