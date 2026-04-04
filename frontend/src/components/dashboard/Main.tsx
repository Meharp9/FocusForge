'use client';

import XPTracker from '@/components/XPTracker';
import SoftCard from '@/components/common/SoftCard';
import DailyQuests from '@/components/dashboard/DailyQuests';
import HabitTracker from '@/components/dashboard/HabitTracker';
import { useAppSelector } from '@/store/hooks';
import { Flame, Target, Zap, Trophy } from 'lucide-react';

const Main = () => {
  const { quests } = useAppSelector((state) => state.quests);
  const { habits } = useAppSelector((state) => state.habits);
  const { level, xpEarned } = useAppSelector((state) => state.auth);

  const tasksDone = quests.filter((q) => q.completed).length;
  const habitsCompleted = habits.filter((h) => h.completed_today).length;
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const totalXp = Math.round(level * (level - 1) / 2 * 100) + xpEarned;

  const statCards = [
    { label: 'Tasks Done', value: tasksDone, icon: <Target size={16} /> },
    { label: 'Habits', value: `${habitsCompleted}/${habits.length}`, icon: <Zap size={16} /> },
    { label: 'Streak', value: bestStreak, icon: <Flame size={16} /> },
    { label: 'Total XP', value: totalXp, icon: <Trophy size={16} /> },
  ];

  return (
    <div className='flex flex-col gap-4 p-6'>
      <XPTracker />

      <div className='grid grid-cols-2 gap-4'>
        {statCards.map((card) => (
          <SoftCard key={card.label} className='p-4 flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-primary text-sm'>
              {card.icon}
              <span>{card.label}</span>
            </div>
            <p className='text-3xl font-bold'>{card.value}</p>
          </SoftCard>
        ))}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <DailyQuests />
        <HabitTracker />
      </div>
    </div>
  );
};

export default Main;
