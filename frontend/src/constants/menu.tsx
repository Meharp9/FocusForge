import { Calendar, ChartColumn, Clock, Flame, LayoutDashboard, Target } from 'lucide-react';

export const MENU_ITEMS = [
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
];
