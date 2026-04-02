'use client';

import React from 'react'
import Logo from '@/components/common/Logo'
import Button from '@/components/common/Button'
import ThemeToggle from '@/components/ThemeToggle'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

const Navbar = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  const handleGetStarted = () => {
    router.push(token ? "/dashboard" : "/auth");
  }

  return (
    <div className='sticky top-0 z-50 flex justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-3 md:py-4 shadow-sm shadow-muted/10 backdrop-blur-sm bg-background/80'>
      <Logo />
      <div className='flex gap-2 md:gap-3'>
        <ThemeToggle />
        <Button
          btnText='Get Started'
          onClick={handleGetStarted}
        />
      </div>
    </div>
  )
}

export default Navbar
