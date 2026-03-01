import React from 'react'
import Logo from './common/Logo'
import Button from './common/Button'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <div className='flex justify-between px-50 py-4 shadow-sm shadow-muted/10'>
      <Logo />
      <div className='flex gap-3'>
        <ThemeToggle />
        <Button 
          btnText='Get Started'
        />
      </div>
    </div>
  )
}

export default Navbar