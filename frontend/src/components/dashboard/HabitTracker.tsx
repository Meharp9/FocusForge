'use client';

import SoftCard from '@/components/common/SoftCard';
import InputField from '@/components/common/InputField';
import { useEffect, useRef, useState } from 'react';
import { Plus, Flame, Trash2, X, Check, Minus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchHabits, addHabit, logHabit, deleteHabit } from '@/store/slices/habitSlice';
import { HabitWeekDay } from '@/types/tasks';

const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local timezone
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const UNIT_PRESETS = [
  'times/day', 'pages/day', 'minutes/day', 'hours/day',
  'steps/day', 'reps/day', 'glasses/day', 'km/day', 'times/week', 'custom',
];

// SVG circular progress ring
const RingProgress = ({ value, goalValue }: { value: number; goalValue: number }) => {
  const r = 10;
  const circ = 2 * Math.PI * r;
  const pct = goalValue > 0 ? Math.min(value / goalValue, 1) : 0;
  const offset = circ * (1 - pct);
  const isComplete = value >= goalValue;

  return (
    <svg width={24} height={24} style={{ transform: 'rotate(-90deg)' }} className='absolute inset-0'>
      <circle cx={12} cy={12} r={r} fill={isComplete ? 'var(--color-primary)' : 'none'}
        stroke='var(--color-border)' strokeWidth='2' />
      {value > 0 && !isComplete && (
        <circle cx={12} cy={12} r={r} fill='none'
          stroke='var(--color-primary)' strokeWidth='2.5'
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap='round' />
      )}
    </svg>
  );
};

interface EditingState {
  habitId: number;
  date: string;
  currentValue: number;
  goalValue: number;
}

const WeekDays = ({
  week, habitId, goalValue, dispatch, onEdit,
}: {
  week: HabitWeekDay[];
  habitId: number;
  goalValue: number;
  dispatch: ReturnType<typeof useAppDispatch>;
  onEdit: (state: EditingState) => void;
}) => {
  return (
    <div className='flex gap-1.5 mt-2'>
      {week.map((day, i) => {
        const isClickable = day.date <= today && day.status !== 'inactive';
        const label = DAY_LABELS[i];

        return (
          <div key={day.date} className='flex flex-col items-center gap-1'>
            <span className='text-[10px] text-muted'>{label}</span>
            {day.status === 'inactive' ? (
              <div className='w-6 h-6 flex items-center justify-center'>
                <Minus size={10} className='text-muted opacity-30' />
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!isClickable) return;
                  if (goalValue === 1) {
                    // binary habit — toggle directly
                    const newVal = day.value >= 1 ? 0 : 1;
                    dispatch(logHabit({ id: habitId, date: day.date, value: newVal, goalValue }));
                  } else {
                    onEdit({ habitId, date: day.date, currentValue: day.value, goalValue });
                  }
                }}
                className={`w-6 h-6 relative flex items-center justify-center ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-40'}`}
              >
                <RingProgress value={day.value} goalValue={goalValue} />
                {day.status === 'completed' && (
                  <Check size={11} className='relative z-10 text-white' />
                )}
                {day.status === 'missed' && day.value === 0 && (
                  <span className='relative z-10 w-1.5 h-0.5 bg-red-400/50 rounded' />
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Floating popup for entering partial progress
const EditPopup = ({
  editing, onClose, dispatch,
}: {
  editing: EditingState;
  onClose: () => void;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  const [inputVal, setInputVal] = useState(String(editing.currentValue || ''));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleSave = () => {
    const val = Math.max(0, parseInt(inputVal) || 0);
    dispatch(logHabit({ id: editing.habitId, date: editing.date, value: val, goalValue: editing.goalValue }));
    onClose();
  };

  return (
    <div ref={ref} className='fixed z-50 bg-background border border-border rounded-xl p-3 shadow-xl flex flex-col gap-2 w-44'
      style={{ transform: 'translateY(-110%)' }}>
      <div className='flex items-center justify-between'>
        <p className='text-xs font-semibold'>Log progress</p>
        <button onClick={onClose}><X size={12} className='text-muted' /></button>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='number'
          min={0}
          max={editing.goalValue}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          className='w-full bg-input border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
        />
        <span className='text-xs text-muted whitespace-nowrap'>/ {editing.goalValue}</span>
      </div>
      <button onClick={handleSave}
        className='w-full py-1.5 bg-primary rounded-lg text-xs font-semibold cursor-pointer'>
        Save
      </button>
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
  const [editing, setEditing] = useState<EditingState | null>(null);

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
    setTitle(''); setGoalValue('1'); setUnitPreset('times/day');
    setCustomUnit(''); setStartDate(today); setEndDate('');
    setShowForm(false);
  };

  const completedCount = habits.filter((h) => h.completed_today).length;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold tracking-wide'>Habit Tracker</h2>
          <p className='text-sm text-muted mt-1'>{completedCount}/{habits.length} today</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)}
          className='flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-sm font-semibold cursor-pointer'>
          {showForm ? <><X size={15} /> Close</> : <><Plus size={15} /> Add</>}
        </button>
      </div>

      {showForm && (
        <div className='flex flex-col gap-3 p-4 rounded-2xl border border-border'>
          <InputField type='text' value={title} placeholder='Habit name...'
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-xs text-muted'>Goal</label>
              <InputField type='number' value={goalValue} placeholder='1'
                onChange={(e) => setGoalValue(e.target.value)} className='w-20' />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>Unit</label>
              <select value={unitPreset} onChange={(e) => setUnitPreset(e.target.value)}
                className='bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary'>
                {UNIT_PRESETS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            {unitPreset === 'custom' && (
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-xs text-muted'>Custom unit</label>
                <InputField type='text' value={customUnit} placeholder='e.g. pushups/session'
                  onChange={(e) => setCustomUnit(e.target.value)} />
              </div>
            )}
          </div>
          <div className='flex gap-3'>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>Start date</label>
              <InputField type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1 flex-1'>
              <label className='text-xs text-muted'>End date (optional)</label>
              <InputField type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <button onClick={handleAdd}
            className='self-end px-4 py-2 rounded-xl bg-primary text-sm font-semibold cursor-pointer'>
            Add Habit
          </button>
        </div>
      )}

      <div className='mb-2'>
        {habits.length === 0 ? (
          <p className='text-sm text-muted text-center mt-6'>Add habits to build your streaks!</p>
        ) : (
          habits.map((habit) => (
            <div key={habit.id} className='relative flex justify-between items-start p-4 rounded-2xl mb-2 border border-border hover:border-primary/40'>
              <div className='flex flex-col'>
                <span className={`font-medium ${habit.completed_today ? 'line-through text-muted' : ''}`}>
                  {habit.title}
                </span>
                <p className='text-xs text-muted'>{habit.goal_value} {habit.unit}</p>
                {habit.week && (
                  <WeekDays
                    week={habit.week}
                    habitId={habit.id}
                    goalValue={habit.goal_value}
                    dispatch={dispatch}
                    onEdit={setEditing}
                  />
                )}
              </div>
              <div className='flex items-center gap-3 mt-1'>
                <div className='flex items-center gap-1 text-primary'>
                  <Flame size={16} />
                  <span className='text-sm font-semibold'>{habit.streak}</span>
                </div>
                <span className='text-sm text-primary font-semibold'>+5xp</span>
                <button onClick={() => dispatch(deleteHabit(habit.id))}
                  className='text-muted hover:text-red-500 cursor-pointer'>
                  <Trash2 size={16} />
                </button>
              </div>

              {editing && editing.habitId === habit.id && (
                <EditPopup editing={editing} onClose={() => setEditing(null)} dispatch={dispatch} />
              )}
            </div>
          ))
        )}
      </div>
    </SoftCard>
  );
};

export default HabitTracker;
