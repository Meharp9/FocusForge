'use client';

import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import LevelTag from '../common/LevelTag';

const Header = () => {
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';
  
  const toTitleCase = (str: string) =>
    str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  const tabName = toTitleCase(activeTab);

  return (
    <div className='px-8 py-3 border-b border-gray-400 bg-sidebar flex items-center justify-between'>
      <h1 className='text-lg font-black tracking-wide'>{tabName}</h1>
      <div className='flex items-center gap-4'>
        <LevelTag />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Header