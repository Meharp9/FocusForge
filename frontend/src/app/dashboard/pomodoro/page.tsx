import Header from '../Header';
import Sidebar from '../Sidebar';
import Timer from './Timer';

const Pomodoro = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow flex flex-col gap-4'>
        <Header />
        <div className='p-6 flex flex-col gap-6 w-[90%] self-center'>
          <Timer />
        </div>
      </div>
    </div>
  )
}

export default Pomodoro;