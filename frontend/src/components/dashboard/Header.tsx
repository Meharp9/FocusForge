'use client';

import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LevelTag from '@/components/common/LevelTag';
import { toTitleCase } from '@/utils/formatting';

const Header = () => {
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';
  const tabName = toTitleCase(activeTab);

  return (
    <div className='px-8 py-3 border-b border-border bg-sidebar flex items-center justify-between'>
      <h1 className='text-lg font-black tracking-wide'>{tabName}</h1>
      <div className='flex items-center gap-4'>
        <LevelTag />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Header
