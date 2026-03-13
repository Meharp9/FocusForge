import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffects?: string;
}

const Card = ({children, className = '', hoverEffects = ''}: CardProps) => {
  return (
    <div className={`bg-white/5 border border-slate-700/30 rounded-2xl md:rounded-3xl py-4 md:py-5 lg:py-6 px-6 md:px-8 lg:px-10 backdrop-blur-sm ${hoverEffects} ${className}`}>
      {children}
    </div>
  )
}

export default Card