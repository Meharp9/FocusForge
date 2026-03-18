import Logo from '../common/Logo'
import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className='py-4 border-r border-gray-400 h-screen min-w-[250px] bg-background/20'>
      <div className='border-b border-gray-400 px-4 pb-2 mb-4'>
        <Logo />
      </div>
      <Menu />
    </div>
  )
}

export default Sidebar