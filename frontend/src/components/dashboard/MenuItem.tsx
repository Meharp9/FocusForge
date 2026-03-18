import React from 'react'

interface MenuItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ label, isActive = false, onClick }: MenuItemProps) => {
  return (
    <div
      className={`flex justify-between items-center font-semibold px-4 py-2 rounded-full cursor-pointer transition ${
        isActive ? 'bg-primary/30' : 'hover:bg-primary/10'
      }`}
      onClick={onClick}
    >
      {label}
      {isActive && <div className='w-2 h-2 bg-primary rounded-full' />}
    </div>
  )
}

export default MenuItem