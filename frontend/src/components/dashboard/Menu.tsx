'use client';

import { Calendar, ChartColumn, Clock, Flame, LayoutDashboard, Target, Trophy } from 'lucide-react';
import MenuItem from './MenuItem'
import { useRouter, usePathname } from 'next/navigation';

const MenuItems = [
  {
    label: 'Overview',
    icon: <LayoutDashboard size={18} />
  },
  {
    label: 'Daily Quests',
    icon: <Target size={18} />
  },
  {
    label: 'Pomodoro',
    icon: <Clock size={18} />
  },
  {
    label: 'Time Blocks',
    icon: <Calendar size={18} />
  },
  {
    label: 'Habits',
    icon: <Flame size={18} />
  },
  {
    label: 'Stats',
    icon: <ChartColumn size={18} />
  },
  {
    label: 'Achievements',
    icon: <Trophy size={18} />
  }
];

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';

  return (
    <div className='px-3 flex flex-col gap-2'>
      {MenuItems.map((item) => {
        const tabName = item.label.toLowerCase().replace(/\s/g, '-');
        const isActive = activeTab === tabName;

        return <MenuItem 
          key={item.label} 
          label={item.label} 
          icon={item.icon}
          isActive={isActive} 
          onClick={() => router.push(`dashboard/${tabName}`)} 
        />
      })}
    </div>
  )
}

export default Menu