export interface TimerConfig {
  focusDuration: number;
  breakDuration: number;
}

export type Mode = 'focus' | 'break';

export interface TimerState {
  mode: Mode;
  secondsLeft: number;
  isRunning: boolean;
  sessionsCompleted: number;
}
