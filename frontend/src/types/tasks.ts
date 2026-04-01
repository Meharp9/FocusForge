export interface Task {
  id: number;
  title: string;
  type: 'personal' | 'work';
}

export type TaskFilter = 'all' | 'personal' | 'work';

export interface Habit {
  id: number;
  title: string;
}
