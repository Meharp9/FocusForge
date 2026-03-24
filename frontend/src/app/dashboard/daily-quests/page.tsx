'use client';
import XPTracker from '@/components/XPTracker';
import Header from '../Header';
import Sidebar from '../Sidebar';
import DailyQuests from '@/app/dashboard/daily-quests/DailyQuests';

const DailyQuestsPage = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
        <div className='p-6 flex flex-col gap-6 w-[90%] self-center'>
          <XPTracker />
          <DailyQuests />
        </div>
      </div>
    </div>
  )
}

export default DailyQuestsPage;