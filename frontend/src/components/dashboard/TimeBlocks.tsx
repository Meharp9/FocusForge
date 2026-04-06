'use client'

import { useEffect, useMemo, useState } from 'react'
import SoftCard from '@/components/common/SoftCard'
import InputField from '@/components/common/InputField'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTimeBlocks, addTimeBlock, deleteTimeBlock } from '@/store/slices/timeBlockSlice'
import { formatTimeForApi, addDuration, calcBlockDuration } from '@/utils'

const COLORS = [
  { name: 'amber', bg: 'bg-amber-700/30', border: 'border-amber-600', text: 'text-amber-400' },
  { name: 'slate', bg: 'bg-slate-600/30', border: 'border-slate-500', text: 'text-slate-400' },
  { name: 'blue', bg: 'bg-blue-700/30', border: 'border-blue-500', text: 'text-blue-400' },
  { name: 'orange', bg: 'bg-orange-600/30', border: 'border-orange-500', text: 'text-orange-400' },
  { name: 'teal', bg: 'bg-teal-700/30', border: 'border-teal-500', text: 'text-teal-400' },
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const ampm = i < 12 ? 'AM' : 'PM';
  return `${hour} ${ampm}`;
});

const DURATIONS = ['0.5h', '1h', '1.5h', '2h', '2.5h', '3h'];

const TimeBlocks = () => {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector((state) => state.timeBlocks);

  const [blockName, setBlockName] = useState('');
  const [startTime, setStartTime] = useState('11 AM');
  const [duration, setDuration] = useState('1.5h');
  const [selectedColor, setSelectedColor] = useState(COLORS[3]);

  useEffect(() => { dispatch(fetchTimeBlocks()); }, [dispatch]);

  const totalHours = useMemo(() => {
    let total = 0;
    blocks.forEach((b) => {
      const [sh, sm] = b.start_time.replace(/[ap]m/i, '').split(':').map(Number);
      const [eh, em] = b.end_time.replace(/[ap]m/i, '').split(':').map(Number);
      const startAmPm = b.start_time.toLowerCase().includes('pm');
      const endAmPm = b.end_time.toLowerCase().includes('pm');
      let s24 = sh + (startAmPm && sh !== 12 ? 12 : 0);
      if (!startAmPm && sh === 12) s24 = 0;
      let e24 = eh + (endAmPm && eh !== 12 ? 12 : 0);
      if (!endAmPm && eh === 12) e24 = 0;
      total += (e24 * 60 + (em || 0)) - (s24 * 60 + (sm || 0));
    });
    const hours = total / 60;
    return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`;
  }, [blocks]);

  const handleAdd = () => {
    if (blockName.trim() === '') return;
    const start = formatTimeForApi(startTime);
    const end = addDuration(startTime, duration);
    dispatch(addTimeBlock({
      title: blockName,
      start_time: start,
      end_time: end,
      category: selectedColor.name,
    }));
    setBlockName('');
  };

  const getColorForCategory = (category: string) => {
    return COLORS.find((c) => c.name === category) || COLORS[0];
  };

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold tracking-wide'>Time Blocks</h2>
          <p className='text-sm text-muted mt-1'>{totalHours} scheduled today</p>
        </div>
        <div className='bg-primary/30 py-1 px-3 flex items-center rounded-xl text-sm gap-1.5 text-primary font-medium'>
          <Clock size={14} />
          {blocks.length} block{blocks.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          <InputField
            type="text"
            value={blockName}
            placeholder="Block name..."
            onChange={(e) => setBlockName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className='flex-grow'
          />
          <div className='p-3 rounded bg-primary cursor-pointer' onClick={handleAdd}>
            <Plus size={20} />
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className='bg-input border border-border rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer flex-1 min-w-[100px]'
          >
            {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className='bg-input border border-border rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer flex-1 min-w-[80px]'
          >
            {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className='flex items-center gap-2'>
            {COLORS.map((color) => (
              <div
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full cursor-pointer border-2 ${color.bg} ${
                  selectedColor.name === color.name ? `${color.border} scale-110` : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {blocks.length === 0 ? (
          <p className='text-sm text-muted text-center mt-4 mb-4'>
            No time blocks scheduled. Add one above!
          </p>
        ) : (
          blocks.map((block) => {
            const color = getColorForCategory(block.category);
            const blockDuration = calcBlockDuration(block.start_time, block.end_time);
            return (
              <div
                key={block.id}
                className={`flex items-center justify-between p-4 rounded-2xl mb-2 border-l-4 ${color.border} ${color.bg}`}
              >
                <div className='flex items-center gap-4'>
                  <div className={`text-xs font-mono ${color.text}`}>
                    <div>{block.start_time.toUpperCase()}</div>
                    <div>{block.end_time.toUpperCase()}</div>
                  </div>
                  <span className='font-medium'>{block.title}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-sm text-muted'>{blockDuration}</span>
                  <button
                    onClick={() => dispatch(deleteTimeBlock(block.id))}
                    className='text-muted hover:text-red-500 cursor-pointer'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </SoftCard>
  )
}

export default TimeBlocks
