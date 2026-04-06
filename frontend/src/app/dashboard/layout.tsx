'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-10 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden off-screen on mobile, always visible on lg+ */}
      <div className={`fixed top-0 left-0 h-screen z-20 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className='flex flex-col flex-grow min-w-0 lg:ml-[250px]'>
        <div className='fixed top-0 left-0 right-0 lg:left-[250px] z-10'>
          <Header onMenuClick={() => setSidebarOpen(true)} />
        </div>
        <div className='mt-[57px] overflow-y-auto h-[calc(100vh-57px)]'>
          <div className='p-4 md:p-6 flex flex-col gap-4 md:gap-6 max-w-6xl mx-auto w-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
