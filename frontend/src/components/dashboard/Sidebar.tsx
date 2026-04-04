'use client';

import Logo from '@/components/common/Logo';
import Menu from '@/components/dashboard/Menu';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    router.push('/auth');
  };

  return (
    <div className='bg-sidebar py-4 border-r border-border h-screen min-w-[250px] flex flex-col'>
      <div className='border-b border-border px-4 pb-2 mb-4'>
        <Logo />
      </div>
      <div className='flex-1'>
        <Menu />
      </div>
      <div className='border-t border-border px-3 pt-3'>
        <button
          onClick={handleSignOut}
          className='flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted hover:text-foreground hover:bg-primary/10 transition-colors cursor-pointer text-sm font-medium'
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
