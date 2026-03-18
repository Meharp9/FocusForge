import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
      </div>
    </div>
  )
}

export default Dashboard;