'use client';

import { useEffect, useState } from 'react';
import SoftCard from '@/components/common/SoftCard';
import { fetchStatsOverviewApi, fetchStatsHabitsApi, fetchHabitHeatmapApi } from '@/lib/api';
import { Flame, Star, Target } from 'lucide-react';
import XPTracker from '@/components/XPTracker';

const PERIODS = [
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 90 days', value: 90 },
  { label: 'Last 365 days', value: 365 },
];

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type GridDay = { date: string; status: 'completed' | 'partial' | 'missed' | 'inactive' | 'future' };
type HabitStreak = { id: number; title: string; streak: number };
type HabitOption = { id: number; title: string };

const cellColor = (status: GridDay['status']) => {
  switch (status) {
    case 'completed': return 'bg-green-500 dark:bg-green-500';
    case 'partial':   return 'bg-green-300 dark:bg-green-800';
    case 'missed':    return 'bg-green-100 dark:bg-green-900';
    default:          return 'bg-gray-200 dark:bg-[#161b22]';
  }
};

const buildWeekGrid = (grid: GridDay[]): (GridDay | null)[][] => {
  if (!grid.length) return [];
  const firstDate = new Date(grid[0].date + 'T00:00:00');
  const leadingEmpties = (firstDate.getDay() + 6) % 7; // Mon=0
  const padded: (GridDay | null)[] = [...Array(leadingEmpties).fill(null), ...grid];
  const weeks: (GridDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const week = padded.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
};

const getMonthLabels = (weeks: (GridDay | null)[][]) => {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const firstReal = week.find((d) => d !== null);
    if (!firstReal) return;
    const month = new Date(firstReal.date + 'T00:00:00').getMonth();
    if (month !== lastMonth) {
      labels.push({ label: new Date(firstReal.date + 'T00:00:00').toLocaleString('default', { month: 'short' }), col });
      lastMonth = month;
    }
  });
  return labels;
};

export default function StatsPage() {
  const [period, setPeriod] = useState(30);
  const [overview, setOverview] = useState<{ quests_completed: number; total_xp: number; habit_streaks: HabitStreak[] } | null>(null);
  const [habits, setHabits] = useState<HabitOption[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null);
  const [heatmapPeriod, setHeatmapPeriod] = useState(30);
  const [grid, setGrid] = useState<GridDay[]>([]);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [loadingHeatmap, setLoadingHeatmap] = useState(false);

  useEffect(() => {
    setLoadingOverview(true);
    fetchStatsOverviewApi(period)
      .then(setOverview)
      .finally(() => setLoadingOverview(false));
  }, [period]);

  useEffect(() => {
    fetchStatsHabitsApi().then((list) => {
      setHabits(list);
      if (list.length > 0) setSelectedHabit(list[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedHabit) return;
    setLoadingHeatmap(true);
    fetchHabitHeatmapApi(selectedHabit, heatmapPeriod)
      .then(setGrid)
      .finally(() => setLoadingHeatmap(false));
  }, [selectedHabit, heatmapPeriod]);

  const bestStreak = overview?.habit_streaks[0] ?? null;
  const weeks = buildWeekGrid(grid);
  const monthLabels = getMonthLabels(weeks);

  return (
    <div className='flex flex-col gap-6'>
      {/* XP Tracker */}
      <XPTracker />

      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-wide'>Stats</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className='bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary'
        >
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <SoftCard className='p-5 flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-muted'>
            <Target size={16} />
            <span className='text-sm'>Quests Completed</span>
          </div>
          <p className='text-3xl font-bold'>
            {loadingOverview ? '—' : (overview?.quests_completed ?? 0)}
          </p>
          <p className='text-xs text-muted'>in the selected period</p>
        </SoftCard>

        <SoftCard className='p-5 flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-muted'>
            <Flame size={16} />
            <span className='text-sm'>Best Habit Streak</span>
          </div>
          <p className='text-3xl font-bold'>
            {loadingOverview ? '—' : (bestStreak ? `${bestStreak.streak}d` : '0d')}
          </p>
          <p className='text-xs text-muted truncate'>
            {bestStreak ? bestStreak.title : 'No active streaks'}
          </p>
        </SoftCard>

        <SoftCard className='p-5 flex flex-col gap-2'>
          <div className='flex items-center gap-2 text-muted'>
            <Star size={16} />
            <span className='text-sm'>XP Earned</span>
          </div>
          <p className='text-3xl font-bold'>
            {loadingOverview ? '—' : (overview?.total_xp ?? 0)}
          </p>
          <p className='text-xs text-muted'>in the selected period</p>
        </SoftCard>
      </div>

      {/* All streaks (if more than one) */}
      {overview && overview.habit_streaks.length > 1 && (
        <SoftCard className='p-5 flex flex-col gap-3'>
          <h2 className='font-semibold text-sm'>All Habit Streaks</h2>
          <div className='flex flex-wrap gap-3'>
            {overview.habit_streaks.map((h) => (
              <div key={h.id} className='flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border text-sm'>
                <Flame size={14} className='text-primary' />
                <span>{h.title}</span>
                <span className='font-bold text-primary'>{h.streak}d</span>
              </div>
            ))}
          </div>
        </SoftCard>
      )}

      {/* Habit Heatmap */}
      <SoftCard className='p-5 flex flex-col gap-4'>
        <div className='flex items-center justify-between flex-wrap gap-3'>
          <h2 className='font-semibold'>Habit Tracker</h2>
          <div className='flex items-center gap-3'>
            <select
              value={selectedHabit ?? ''}
              onChange={(e) => setSelectedHabit(Number(e.target.value))}
              className='bg-background border border-border rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
            >
              {habits.length === 0 && <option value=''>No habits</option>}
              {habits.map((h) => (
                <option key={h.id} value={h.id}>{h.title}</option>
              ))}
            </select>
            <select
              value={heatmapPeriod}
              onChange={(e) => setHeatmapPeriod(Number(e.target.value))}
              className='bg-background border border-border rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-primary'
            >
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loadingHeatmap ? (
          <p className='text-sm text-muted'>Loading...</p>
        ) : weeks.length === 0 ? (
          <p className='text-sm text-muted'>No data for this period.</p>
        ) : (
          <div className='overflow-x-auto'>
            <div className='flex flex-col gap-1 min-w-max'>
              {/* Month labels */}
              <div className='flex gap-1 pl-10'>
                {weeks.map((_, col) => {
                  const label = monthLabels.find((m) => m.col === col);
                  return (
                    <div key={col} className='w-3 text-[10px] text-muted'>
                      {label ? label.label : ''}
                    </div>
                  );
                })}
              </div>

              {/* Grid rows (days of week) */}
              {DAY_LABELS.map((dayLabel, dayIndex) => (
                <div key={dayLabel} className='flex items-center gap-1'>
                  <span className='w-8 text-[10px] text-muted text-right pr-2'>
                    {dayIndex % 2 === 0 ? dayLabel : ''}
                  </span>
                  {weeks.map((week, col) => {
                    const cell = week[dayIndex];
                    return (
                      <div
                        key={col}
                        title={cell ? `${cell.date} — ${cell.status}` : ''}
                        className={`w-3 h-3 rounded-sm ${cell ? cellColor(cell.status) : 'bg-gray-200 dark:bg-[#161b22]'}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className='flex items-center justify-end gap-2 mt-3 text-xs text-muted'>
              <span>Less</span>
              <div className='w-3 h-3 rounded-sm bg-gray-200 dark:bg-[#161b22]' title='None' />
              <div className='w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900' title='Missed' />
              <div className='w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800' title='Partial' />
              <div className='w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500' title='Completed' />
              <span>More</span>
            </div>
          </div>
        )}
      </SoftCard>
    </div>
  );
}
