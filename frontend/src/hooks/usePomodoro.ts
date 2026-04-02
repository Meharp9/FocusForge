import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerConfig, TimerState, Mode } from '@/types/timer';
import { DEFAULT_TIMER_CONFIG } from '@/constants/timer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSessions, completeSession } from '@/store/slices/pomodoroSlice';

export function usePomodoro(config: TimerConfig = DEFAULT_TIMER_CONFIG) {
  const dispatch = useAppDispatch();
  const sessionsToday = useAppSelector((state) => state.pomodoro.sessionsToday);

  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    secondsLeft: config.focusDuration,
    isRunning: false,
    sessionsCompleted: 0,
  });

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { dispatch(fetchSessions()); }, [dispatch]);

  // Sync Redux sessions count into local state
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setState((prev) => ({ ...prev, sessionsCompleted: sessionsToday }));
  }, [sessionsToday]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!state.isRunning) return;

    intervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.secondsLeft <= 1) {
          clearTimer();
          const nextMode: Mode = prev.mode === 'focus' ? 'break' : 'focus';
          const nextSeconds =
            nextMode === 'focus' ? config.focusDuration : config.breakDuration;

          if (prev.mode === 'focus') {
            dispatch(completeSession(config.focusDuration / 60));
          }

          return {
            ...prev,
            isRunning: false,
            mode: nextMode,
            secondsLeft: nextSeconds,
            sessionsCompleted:
              prev.mode === 'focus'
                ? prev.sessionsCompleted + 1
                : prev.sessionsCompleted,
          };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);

    return clearTimer;
  }, [state.isRunning, config, clearTimer, dispatch]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, isRunning: false }));
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      isRunning: false,
      secondsLeft:
        prev.mode === 'focus' ? config.focusDuration : config.breakDuration,
    }));
  }, [clearTimer, config]);

  const switchMode = useCallback(
    (mode: Mode) => {
      clearTimer();
      setState((prev) => ({
        ...prev,
        mode,
        isRunning: false,
        secondsLeft:
          mode === 'focus' ? config.focusDuration : config.breakDuration,
      }));
    },
    [clearTimer, config]
  );

  return { state, start, pause, reset, switchMode };
}
