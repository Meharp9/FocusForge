import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerConfig, TimerState, Mode } from '@/types/timer';
import { DEFAULT_TIMER_CONFIG } from '@/constants/timer';

export function usePomodoro(config: TimerConfig = DEFAULT_TIMER_CONFIG) {
  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    secondsLeft: config.focusDuration,
    isRunning: false,
    sessionsCompleted: 0,
  });

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
  }, [state.isRunning, config, clearTimer]);

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
