import React from 'react';

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStartPause,
  onReset,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onStartPause}
        className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary/80 active:scale-95
          text-white font-bold text-base rounded-full transition-all duration-150 shadow-lg shadow-primary/20"
      >
        {isRunning ? (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            Start
          </>
        )}
      </button>

      <button
        onClick={onReset}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-input
          hover:bg-surface active:scale-95 text-muted transition-all duration-150"
        aria-label="Reset timer"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  );
};

export default TimerControls;
