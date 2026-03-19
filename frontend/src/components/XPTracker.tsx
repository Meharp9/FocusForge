import SoftCard from './common/SoftCard'

const XPTracker = () => {
  const percentage = 0;

  return (
    <SoftCard className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary px-4 py-1.5 w-max rounded-xl shadow-[0px_0px_5px_2px] shadow-primary/30 font-bold lg:text-lg'>
            1
          </div>
          <div>
            <p className='text-sm font-semibold text-muted'>
              Level 1
            </p>
            <p className='text-lg font-black'>
              0 XP
            </p>
          </div>
        </div>
        <p className='text-sm text-muted tracking-wide font-semibold'>
          0/100 to next
        </p>
      </div>
      <div className="flex-grow h-3 bg-muted/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#e67e22] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </SoftCard>
  )
}

export default XPTracker