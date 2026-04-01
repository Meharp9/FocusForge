import React from 'react'

interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ label, icon, isActive = false, onClick }: MenuItemProps) => {
  return (
    <div
      className={`flex justify-between items-center font-semibold px-4 py-2 rounded-full cursor-pointer transition ${
        isActive ? 'bg-primary/30 text-rust' : 'text-muted hover:bg-primary/10 hover:text-heading'
      }`}
      onClick={onClick}
    >
      <div className='flex items-center gap-2'>
        {icon}
        {label}
      </div>
      {isActive && <div className='w-2 h-2 bg-primary rounded-full' />}
    </div>
  )
}

export default MenuItem
