import React from 'react'

interface CardProps {
  children: React.ReactNode;
}

const Card = ({children}: CardProps) => {
  return (
    <div className='bg-white/5 border border-white/20 rounded-3xl py-6 px-10 backdrop-blur-sm transform transition-transform hover:scale-[1.02]' style={{
      boxShadow: '0 20px 60px rgba(52, 211, 153, 0.3), 0 10px 30px rgba(52, 211, 153, 0.2), 0 0 1px rgba(255, 255, 255, 0.2) inset',
    }}>
      {children}
    </div>
  )
}

export default Card