export interface Task {
  id: number;
  title: string;
  description?: string;
  type: 'personal' | 'work';
  completed: boolean;
  xp_reward: number;
}

export type TaskFilter = 'all' | 'personal' | 'work';

export type HabitDayStatus = 'completed' | 'missed' | 'pending' | 'inactive';

export interface HabitWeekDay {
  date: string;
  status: HabitDayStatus;
}

export interface Habit {
  id: number;
  title: string;
  goal_value: number;
  unit: string;
  start_date: string;
  end_date: string | null;
  completed_today: boolean;
  streak: number;
  week: HabitWeekDay[];
}
