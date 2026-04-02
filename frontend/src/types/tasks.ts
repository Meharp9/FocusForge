export interface Task {
  id: number;
  title: string;
  description?: string;
  type: 'personal' | 'work';
  completed: boolean;
  xp_reward: number;
}

export type TaskFilter = 'all' | 'personal' | 'work';

export interface Habit {
  id: number;
  title: string;
}
