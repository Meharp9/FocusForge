'use client'
import React from 'react'
import { Clock, TrendingUp, Target, Flame, Zap, Trophy, Swords } from 'lucide-react'

const BannerIllustration = () => {
  const features = [
    { icon: Clock, label: 'Focus', bg: 'bg-blue-400/10', color: 'text-blue-400', position: 'top-[15%] left-[10%] lg:left-[20%]', delay: '0s' },
    { icon: TrendingUp, label: 'Stats', bg: 'bg-purple-400/10', color: 'text-purple-400', position: 'top-[15%] right-[10%] lg:right-[20%]', delay: '0.5s' },
    { icon: Target, label: 'Quests', bg: 'bg-orange-400/10', color: 'text-orange-400', position: 'top-[45%] right-[-8%] lg:right-[10%]', delay: '1s' },
    { icon: Flame, label: 'Streaks', bg: 'bg-red-400/10', color: 'text-red-400', position: 'bottom-[5%] right-[20%] lg:right-[25%]', delay: '1.5s' },
    { icon: Zap, label: 'XP', bg: 'bg-orange-400/10', color: 'text-orange-400', position: 'bottom-[5%] left-[25%]', delay: '2s' },
    { icon: Trophy, label: 'Achieve', bg: 'bg-orange-400/10', color: 'text-orange-400', position: 'top-[45%] left-[-8%] lg:left-[10%]', delay: '2.5s' },
  ]

  return (
    <div className="relative w-full lg:w-[50%] h-[350px] md:h-[400px] lg:h-[450px] hidden lg:flex items-center justify-center">
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 lg:w-90 lg:h-90 xl:w-100 xl:h-100 rounded-full border border-primary/20" />
        <div className="absolute w-60 h-60 lg:w-70 lg:h-70 rounded-full border border-primary/10" />
      </div>

      {/* Floating dots */}
      <div className="absolute top-[28%] right-[38%] w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce-slow" />
      <div className="absolute top-[45%] left-[15%] w-1.5 h-1.5 rounded-full bg-orange-400/60 animate-bounce-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[25%] right-[12%] w-1.5 h-1.5 rounded-full bg-orange-300/60 animate-bounce-slow" style={{ animationDelay: '2s' }} />

      {/* Pulse rings behind central card */}
      <div className="absolute z-0 w-28 h-28 lg:w-30 lg:h-30 rounded-3xl border-2 border-orange-500/30 animate-ping-slow" />
      <div className="absolute z-0 w-24 h-24 lg:w-25 lg:h-25 rounded-3xl border-2 border-orange-500/20 animate-ping-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute z-0 w-20 h-20 rounded-3xl border-2 border-orange-500/10 animate-ping-slow" style={{ animationDelay: '2s' }} />

      {/* Central flame card */}
      <div className="text-white relative z-10 p-3 md:p-4 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-[0_0_3.75rem_rgba(251,146,60,0.5)]">
        <Swords className='w-10 h-10 md:w-12 md:h-12 lg:w-12.5 lg:h-12.5' strokeWidth={2.5} />
      </div>

      {/* Feature cards */}
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <div
            key={index}
            className={`absolute ${feature.position} animate-bounce-slow`}
            style={{ 
              animationDelay: feature.delay,
              animationDuration: '3s',
              animationIterationCount: 'infinite'
            }}
          >
            <div className={`backdrop-blur-sm ${feature.bg} border border-primary/20 rounded-xl p-2 w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all shadow-lg`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${feature.color}`} strokeWidth={2} />
              <span className={`text-[0.65rem] md:text-xs font-medium ${feature.color}`}>
                {feature.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BannerIllustration