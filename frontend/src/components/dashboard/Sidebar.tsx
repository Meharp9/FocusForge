import Logo from '@/components/common/Logo'
import Menu from '@/components/dashboard/Menu'

const Sidebar = () => {
  return (
    <div className='bg-sidebar py-4 border-r border-border h-screen min-w-[250px]'>
      <div className='border-b border-border px-4 pb-2 mb-4'>
        <Logo />
      </div>
      <Menu />
    </div>
  )
}

export default Sidebar
