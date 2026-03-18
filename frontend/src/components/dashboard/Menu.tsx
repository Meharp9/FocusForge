'use client';

import MenuItem from './MenuItem'
import { useRouter, usePathname } from 'next/navigation';

const MenuItems = ['Overview', 'Daily Quests', 'Pomodoro', 'Time Blocks', 'Habits', 'Stats', 'Achievements' ]

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';

  return (
    <div className='px-3 flex flex-col gap-2'>
      {MenuItems.map((item) => {
        const tabName = item.toLowerCase().replace(/\s/g, '-');
        const isActive = activeTab === tabName;

        return <MenuItem 
          key={item} 
          label={item} 
          isActive={isActive} 
          onClick={() => router.push(`dashboard/${tabName}`)} 
        />
      })}
    </div>
  )
}

export default Menu