import React from 'react';

interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  mode: 'focus' | 'break';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  secondsLeft,
  totalSeconds,
  mode,
}) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsLeft / totalSeconds;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-72 h-72">
      {/* Background track circle */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
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

      {/* Inner circle background */}
      <div className="absolute inset-4 rounded-full bg-[#1e2028]" />

      {/* Time + label */}
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