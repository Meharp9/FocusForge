'use client';

import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LevelTag from '@/components/common/LevelTag';
import { toTitleCase } from '@/utils';
import { useAppSelector } from '@/store/hooks';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const level = useAppSelector((state) => state.auth.level);
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';
  const tabName = toTitleCase(activeTab);

  return (
    <div className='px-4 md:px-8 py-3 border-b border-border bg-sidebar flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <button
          onClick={onMenuClick}
          className='lg:hidden p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-primary/10 transition-colors'
        >
          <Menu size={20} />
        </button>
        <h1 className='text-lg font-black tracking-wide'>{tabName}</h1>
      </div>
      <div className='flex items-center gap-3 md:gap-4'>
        <LevelTag level={level} />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
