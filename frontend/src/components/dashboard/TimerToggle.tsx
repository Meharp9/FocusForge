import React from 'react';

interface TimerToggleProps {
  mode: 'focus' | 'break';
  onSwitch: (mode: 'focus' | 'break') => void;
}

const TimerToggle: React.FC<TimerToggleProps> = ({ mode, onSwitch }) => {
  return (
    <div className="flex items-center gap-1 bg-[#2a2d38] rounded-full p-1">
      {(['focus', 'break'] as ('focus' | 'break')[]).map((m) => (
        <button
          key={m}
          onClick={() => onSwitch(m)}
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 capitalize
            ${
              mode === m
                ? 'bg-[#3a3d4a] text-white shadow'
                : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default TimerToggle;
