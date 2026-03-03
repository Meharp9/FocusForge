import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffects?: string;
}

const Card = ({children, className = '', hoverEffects = ''}: CardProps) => {
  return (
    <div className={`bg-white/5 border border-white/20 rounded-3xl py-6 px-10 backdrop-blur-sm ${hoverEffects} ${className}`}>
      {children}
    </div>
  )
}

export default Card