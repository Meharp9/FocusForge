'use client';

import SoftCard from '@/components/common/SoftCard';
import InputField from '@/components/common/InputField';
import { useEffect, useState } from 'react';
import { Plus, Check, Flame, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchHabits, addHabit, toggleHabit, deleteHabit } from '@/store/slices/habitSlice';

const HabitTracker = () => {
  const dispatch = useAppDispatch();
  const { habits } = useAppSelector((state) => state.habits);
  const [habitInput, setHabitInput] = useState('');

  useEffect(() => { dispatch(fetchHabits()); }, [dispatch]);

  const handleAdd = () => {
    if (habitInput.trim() === '') return;
    dispatch(addHabit(habitInput));
    setHabitInput('');
  };

  const completedCount = habits.filter((h) => h.completed_today).length;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div>
        <h2 className='font-bold tracking-wide'>Habit Tracker</h2>
        <p className='text-sm text-muted mt-1'>
          {completedCount}/{habits.length} today
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <InputField
          type="text"
          value={habitInput}
          placeholder="New habit..."
          onChange={(e) => setHabitInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className='flex-grow'
        />
        <div className='p-3 rounded bg-primary cursor-pointer' onClick={handleAdd}>
          <Plus size={20} />
        </div>
      </div>
      <div className='mb-2'>
        {habits.length === 0 ? (
          <p className='text-sm text-muted text-center mt-6'>
            Add habits to build your streaks!
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex justify-between items-center p-4 rounded-2xl mb-2 border border-border hover:border-primary/40 ${habit.completed_today ? 'opacity-50' : ''}`}
            >
              <div className='flex gap-4 items-center'>
                <button
                  onClick={() => dispatch(toggleHabit(habit.id))}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${habit.completed_today ? 'border-primary bg-primary' : 'border-muted hover:border-primary'}`}
                >
                  {habit.completed_today && <Check size={14} />}
                </button>
                <span className={`font-medium ${habit.completed_today ? 'line-through text-muted' : ''}`}>
                  {habit.title}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1 text-primary'>
                  <Flame size={16} />
                  <span className='text-sm font-semibold'>{habit.streak}</span>
                </div>
                <span className='text-sm text-primary font-semibold'>+5xp</span>
                <button
                  onClick={() => dispatch(deleteHabit(habit.id))}
                  className='text-muted hover:text-red-500 cursor-pointer'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </SoftCard>
  )
}

export default HabitTracker
