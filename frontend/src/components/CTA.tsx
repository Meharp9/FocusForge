import React from 'react'
import Card from './common/Card'
import Button from './common/Button'

const CTA = () => {
  return (
    <div className='flex items-center justify-center'>
      <Card className='px-20 py-10 flex flex-col items-center gap-3'>
        <div className='flex flex-col items-center gap-4'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-black flex gap-2 items-center'>
            Ready to 
            <p className='bg-gradient-primary bg-clip-text text-transparent'>
              Forge
            </p> 
            Your Productivity?
          </h2>
          <p className='text-muted w-[70%] text-center text-lg'>
            Join focused individuals who&apos;ve turned their daily grind into a rewarding adventure.
          </p>
        </div>
        <Button 
          btnText='Get Started Free'
          className='text-white py-2 mt-15'
          showArrow={true}
        />
      </Card>
    </div>
  )
}

export default CTA