'use client'
import React, { useState } from 'react'
import SoftCard from '@/components/common/SoftCard'
import { usePomodoro } from './UsePomodor'
import TimerToggle from './TimerToggle'
import TimerDisplay from './TimerDisplay'
import { TimerControls } from './TimerControls'

const Timer = () => {
  const config = {
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
  }
  const { state, start, pause, reset, switchMode } = usePomodoro(config);

  const totalSeconds =
    state.mode === 'focus' ? config.focusDuration : config.breakDuration;
  
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