'use client';

import React from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'

const CTA = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    const token = localStorage.getItem("access_token");
    router.push(token ? "/dashboard" : "/auth");
  }

  return (
    <div className='flex items-center justify-center mb-12 md:mb-16 lg:mb-20 px-6'>
      <Card className='px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8 lg:py-10 flex flex-col items-center gap-3'>
        <div className='flex flex-col items-center gap-3 md:gap-4'>
          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black flex flex-col sm:flex-row gap-2 items-center text-center'>
            <span>Ready to</span>
            <span className='bg-gradient-primary bg-clip-text text-transparent'>
              Forge
            </span>
            <span>Your Productivity?</span>
          </h2>
          <p className='text-muted w-full sm:w-[85%] md:w-[75%] lg:w-[70%] text-center text-sm sm:text-base md:text-lg'>
            Join focused individuals who&apos;ve turned their daily grind into a rewarding adventure.
          </p>
        </div>
        <Button
          btnText='Get Started Free'
          className='text-white py-2 md:py-2.5 mt-3 md:mt-4 lg:mt-6'
          showArrow={true}
          onClick={handleGetStarted}
        />
      </Card>
    </div>
  )
}

export default CTA
