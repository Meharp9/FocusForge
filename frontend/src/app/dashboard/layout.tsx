'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
        <div className='p-6 flex flex-col gap-6 w-[90%] self-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
