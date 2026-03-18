'use client';

import React, { useState } from 'react'
import MenuItem from './MenuItem'

const MenuItems = ['Overview', 'Daily Quests', 'Pomodoro', 'Time Blocks', 'Habits', 'Stats', 'Achievements' ]

const Menu = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='px-3 flex flex-col gap-2'>
      {MenuItems.map((item) => {
        const tabName = item.toLowerCase().replace(/\s/g, '-');
        const isActive = activeTab === tabName;

        return <MenuItem 
          key={item} 
          label={item} 
          isActive={isActive} 
          onClick={() => setActiveTab(tabName)} 
        />
      })}
    </div>
  )
}

export default Menu