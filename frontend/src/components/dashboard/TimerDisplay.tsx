import React from 'react';
import { formatTime } from '@/utils';

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  mode: 'focus' | 'break';
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  secondsLeft,
  totalSeconds,
  mode,
}) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const elapsed = 1 - secondsLeft / totalSeconds;
  const dashOffset = circumference * (1 - elapsed);

  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      <div className="absolute inset-5 rounded-full bg-sidebar" />

      <svg
        className="absolute inset-0 z-[1] w-full h-full -rotate-90"
        viewBox="0 0 280 280"
      >
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="6"
        />
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={mode === 'focus' ? '#f97316' : '#3b82f6'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="text-6xl font-bold text-white tracking-tight font-mono">
          {formatTime(secondsLeft)}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-gray-400">
          {mode === 'focus' ? (
            <span className="text-orange-500">🔥</span>
          ) : (
            <span className="text-blue-400">☕</span>
          )}
          <span className="capitalize">{mode}</span>
        </span>
      </div>
    </div>
  );
};

export default TimerDisplay;
