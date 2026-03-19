import SoftCard from './common/SoftCard'
import TaskToggle from '@/app/dashboard/daily-quests/TaskToggle'
import InputField from './common/InputField'
import { Plus } from 'lucide-react'

const DailyQuests = () => {
  const handleSwitchList = (option: string) => {
    console.log(option);
  }

  return (
    <SoftCard className='flex flex-col p-4 gap-6'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='font-bold tracking-wide'>
            Daily Quests
          </h2>
          <p className='text-sm text-muted mt-1'>
            0/0 completed
          </p>
        </div>
        <TaskToggle onSwitchList={handleSwitchList} />
      </div>
      <div className='flex items-center gap-3'>
        <InputField 
          type="text"
          value=""
          placeholder="Add a new quest...."
          onChange={() => {}}
          className='flex-grow'
        />
        <div className='p-3 rounded bg-primary cursor-pointer'>
          <Plus size={20}/>
        </div>
      </div>
    </SoftCard>
  )
}

export default DailyQuests