'use client';

import MenuItem from '@/components/dashboard/MenuItem'
import { useRouter, usePathname } from 'next/navigation';
import { MENU_ITEMS } from '@/constants/menu';

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/(.+)$/);
  const activeTab = match ? match[1] : 'overview';

  return (
    <div className='px-3 flex flex-col gap-2'>
      {MENU_ITEMS.map((item) => {
        const tabName = item.label.toLowerCase().replace(/\s/g, '-');
        const isActive = activeTab === tabName;

        return <MenuItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={isActive}
          onClick={() => router.push(tabName === 'overview' ? '/dashboard' : `/dashboard/${tabName}`)}
        />
      })}
    </div>
  )
}

export default Menu
