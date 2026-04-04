'use client';

import SoftCard from '@/components/common/SoftCard';
import InputField from '@/components/common/InputField';
import { useEffect, useState } from 'react';
import { Plus, Check, Flame, Trash2, X, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchHabits, addHabit, toggleHabit, deleteHabit } from '@/store/slices/habitSlice';
import { HabitWeekDay } from '@/types/tasks';

const today = new Date().toISOString().split('T')[0];
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const UNIT_PRESETS = [
  'times/day',
  'pages/day',
  'minutes/day',
  'hours/day',
  'steps/day',
  'reps/day',
  'glasses/day',
  'km/day',
  'times/week',
  'custom',
];

const WeekDays = ({ week, habitId, dispatch }: { week: HabitWeekDay[], habitId: number, dispatch: ReturnType<typeof useAppDispatch> }) => {
  return (
    <div className='flex gap-1.5 mt-2'>
      {week.map((day, i) => {
        const isClickable = day.date <= today && day.status !== 'inactive';
        const label = DAY_LABELS[i];
        const handleClick = () => {
          if (isClickable) dispatch(toggleHabit({ id: habitId, date: day.date }));
        };

        return (
          <div key={day.date} className='flex flex-col items-center gap-1'>
            <span className='text-[10px] text-muted'>{label}</span>
            {day.status === 'inactive' ? (
              <div className='w-6 h-6 rounded-full flex items-center justify-center'>
                <Minus size={10} className='text-muted opacity-30' />
              </div>
            ) : day.status === 'completed' ? (
              <button
                onClick={handleClick}
                className={`w-6 h-6 rounded-full bg-primary flex items-center justify-center ${isClickable ? 'cursor-pointer hover:opacity-70' : 'cursor-default'}`}
              >
                <Check size={12} />
              </button>
            ) : day.status === 'missed' ? (
              <button
                onClick={handleClick}
                className='w-6 h-6 rounded-full border-2 border-red-500/40 flex items-center justify-center cursor-pointer hover:border-primary/60'
              >
                <X size={10} className='text-red-500/60' />
              </button>
            ) : (
              // pending
              <button
                onClick={handleClick}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isClickable
                    ? 'border-primary hover:bg-primary/20 cursor-pointer'
                    : 'border-border cursor-default opacity-40'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const HabitTracker = () => {
  const dispatch = useAppDispatch();
  const { habits } = useAppSelector((state) => state.habits);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [goalValue, setGoalValue] = useState('1');
  const [unitPreset, setUnitPreset] = useState('times/day');
  const [customUnit, setCustomUnit] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');

  useEffect(() => { dispatch(fetchHabits()); }, [dispatch]);

  const resolvedUnit = unitPreset === 'custom' ? customUnit || 'times/day' : unitPreset;

  const handleAdd = () => {
    if (title.trim() === '') return;
    dispatch(addHabit({
      title: title.trim(),
      goal_value: parseInt(goalValue) || 1,
      unit: resolvedUnit,
      start_date: startDate,
      end_date: endDate || null,
    }));
    setTitle('');
    setGoalValue('1');
    setUnitPreset('times/day');
    setCustomUnit('');
    setStartDate(today);
    setEndDate('');
    setShowForm(false);
  };

  const completedCount = habits.filter((h) => h.completed_today).length;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold tracking-wide'>Habit Tracker</h2>
          <p className='text-sm text-muted mt-1'>
            {completedCount}/{habits.length} today
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className='flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-sm font-semibold cursor-pointer'
        >
          {showForm ? <><X size={15} /> Close</> : <><Plus size={15} /> Add</>}
        </button>
      </div>

      {showForm && (
        <div className='flex flex-col gap-3 p-4 rounded-2xl border border-border'>
          <InputField
            type="text"
            value={title}
            placeholder="Habit name..."
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-xs text-muted'>Goal</label>
              <InputField
                type="number"
                value={goalValue}
                placeholder="1"
                onChange={(e) => setGoalValue(e.target.value)}
                className='w-20'
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>Unit</label>
              <select
                value={unitPreset}
                onChange={(e) => setUnitPreset(e.target.value)}
                className='bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary'
              >
                {UNIT_PRESETS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            {unitPreset === 'custom' && (
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-xs text-muted'>Custom unit</label>
                <InputField
                  type="text"
                  value={customUnit}
                  placeholder="e.g. pushups/session"
                  onChange={(e) => setCustomUnit(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>Start date</label>
              <InputField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>End date (optional)</label>
              <InputField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleAdd}
            className='self-end px-4 py-2 rounded-xl bg-primary text-sm font-semibold cursor-pointer'
          >
            Add Habit
          </button>
        </div>
      )}

      <div className='mb-2'>
        {habits.length === 0 ? (
          <p className='text-sm text-muted text-center mt-6'>
            Add habits to build your streaks!
          </p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className='flex justify-between items-start p-4 rounded-2xl mb-2 border border-border hover:border-primary/40'
            >
              <div className='flex flex-col'>
                <span className={`font-medium ${habit.completed_today ? 'line-through text-muted' : ''}`}>
                  {habit.title}
                </span>
                <p className='text-xs text-muted'>{habit.goal_value} {habit.unit}</p>
                {habit.week && (
                  <WeekDays week={habit.week} habitId={habit.id} dispatch={dispatch} />
                )}
              </div>
              <div className='flex items-center gap-3 mt-1'>
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
  );
};

export default HabitTracker;
