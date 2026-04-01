'use client'

import SoftCard from '@/components/common/SoftCard'
import { usePomodoro } from '@/hooks/usePomodoro'
import TimerToggle from '@/components/dashboard/TimerToggle'
import TimerDisplay from '@/components/dashboard/TimerDisplay'
import TimerControls from '@/components/dashboard/TimerControls'
import { DEFAULT_TIMER_CONFIG } from '@/constants/timer'

const Timer = () => {
  const { state, start, pause, reset, switchMode } = usePomodoro(DEFAULT_TIMER_CONFIG);

  const totalSeconds =
    state.mode === 'focus' ? DEFAULT_TIMER_CONFIG.focusDuration : DEFAULT_TIMER_CONFIG.breakDuration;

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-white font-bold text-xl">Pomodoro Timer</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {state.sessionsCompleted} session
            {state.sessionsCompleted !== 1 ? 's' : ''} completed
          </p>
        </div>
        <TimerToggle mode={state.mode} onSwitch={switchMode} />
      </div>
      <div className="flex justify-center py-4">
        <TimerDisplay
          secondsLeft={state.secondsLeft}
          totalSeconds={totalSeconds}
          mode={state.mode}
        />
      </div>
      <div className="flex justify-center">
        <TimerControls
          isRunning={state.isRunning}
          onStartPause={state.isRunning ? pause : start}
          onReset={reset}
        />
      </div>
    </SoftCard>
  )
}

export default Timer
