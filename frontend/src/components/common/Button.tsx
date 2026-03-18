import { ArrowRight } from 'lucide-react';
import React from 'react'

interface ButtonProps {
  btnText: string;
  type?: string;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

const Button = ({btnText, type="primary", className="", showArrow=false, onClick}: ButtonProps) => {
  return (
    <div 
      className={`${type === "primary" ? "bg-primary text-background hover:text-primary hover:bg-transparent border border-primary" : "text-primary bg-transparent border-gradient-primary"} flex items-center justify-center px-4 md:px-5 rounded cursor-pointer transition font-bold gap-2 text-sm md:text-base ${className}`}
      onClick={onClick}
    >
      {btnText}
      {showArrow && <ArrowRight className='w-4 h-4 md:w-4.5 md:h-4.5' />}
    </div>
  )
}

export default Button