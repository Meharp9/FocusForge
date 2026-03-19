import Header from '@/app/dashboard/Header';
import Sidebar from '@/app/dashboard/Sidebar';
import Main from './Main';

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default Dashboard;