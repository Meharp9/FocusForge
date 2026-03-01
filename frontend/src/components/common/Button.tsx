import React from 'react'

interface ButtonProps {
  btnText: string;
  type?: string;
  className?: string;
}

const Button = ({btnText, type="primary", className=""}: ButtonProps) => {
  return (
    <div className={`${type === "primary" ? "bg-primary text-background hover:text-white hover:bg-transparent border border-primary" : "text-primary bg-transparent border-gradient-primary"} flex items-center justify-center px-5 rounded cursor-pointer transition font-bold ${className}`}>
      {btnText}
    </div>
  )
}

export default Button