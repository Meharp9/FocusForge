'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='fixed top-0 left-0 h-screen z-20'>
        <Sidebar />
      </div>
      <div className='flex flex-col flex-grow min-w-0 ml-[250px]'>
        <div className='fixed top-0 left-[250px] right-0 z-10'>
          <Header />
        </div>
        <div className='mt-[57px] overflow-y-auto h-[calc(100vh-57px)]'>
          <div className='p-6 flex flex-col gap-6 w-[90%] self-center mx-auto'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
