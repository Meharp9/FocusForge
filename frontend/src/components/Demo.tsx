"use client";

import React, { useEffect, useState } from 'react'
import Card from './common/Card'
import Stat from './common/Stat';

const Demo = () => {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (direction === 'up') {
          if (prev >= 100) {
            setDirection('down');
            return 100;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setDirection('up');
            return 0;
          }
          return prev - 1;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <Card 
      hoverEffects="transform transition-transform hover:scale-[1.02]"
      className="shadow-[0_20px_60px_rgba(52,211,153,0.3),0_10px_30px_rgba(52,211,153,0.2),0_0_1px_rgba(255,255,255,0.2)_inset]"
    >
      <div className='flex items-center gap-4'>
        <div className='bg-gradient-primary rounded-lg p-2 font-black text-xl'>
          42
        </div>
        <div>
          <p className='text-muted'>
            Your Level
          </p>
          <h3 className='font-bold text-2xl'>
            Productivity Master
          </h3>
        </div>
      </div>
      <div className='mt-6 border-b border-b-white/10 pb-4'>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-muted'>XP Progress</p>
          <p className='text-heading font-bold'>{progress}%</p>
        </div>
        <div className='w-full h-4 bg-muted/20 rounded-full overflow-hidden'>
          <div 
            className='h-full bg-primary rounded-full transition-all duration-300 ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className='flex gap-30 mt-3'>
        <Stat title='Quests Done' count='128' color='primary' />
        <Stat title='Day Streak' count='15' color='secondary' />
        <Stat title='Total XP' count='8.5k' color='tertiary' />
      </div>
    </Card>
  )
}

export default Demo