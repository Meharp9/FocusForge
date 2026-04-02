'use client';

import SoftCard from './common/SoftCard'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchProfile } from '@/store/slices/authSlice'
import { useEffect } from 'react'

const XPTracker = () => {
  const dispatch = useAppDispatch();
  const { level, xpEarned, xpToNextLevel } = useAppSelector((state) => state.auth);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { dispatch(fetchProfile()); }, [dispatch]);

  const percentage = xpToNextLevel > 0 ? Math.round((xpEarned / xpToNextLevel) * 100) : 0;

  return (
    <SoftCard className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary text-white px-4 py-1.5 w-max rounded-xl shadow-[0px_0px_5px_2px] shadow-primary/30 font-bold lg:text-lg'>
            {level}
          </div>
          <div>
            <p className='text-sm font-semibold text-muted'>
              Level {level}
            </p>
            <p className='text-lg font-black'>
              {xpEarned} XP
            </p>
          </div>
        </div>
        <p className='text-sm text-muted tracking-wide font-semibold'>
          {xpEarned}/{xpToNextLevel} to next
        </p>
      </div>
      <div className="flex-grow h-3 bg-muted/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </SoftCard>
  )
}

export default XPTracker
