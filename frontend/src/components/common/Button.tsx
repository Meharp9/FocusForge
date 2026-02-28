import React from 'react'

interface ButtonProps {
  btnText: string;
  type?: string
}

const Button = ({btnText, type="primary"}: ButtonProps) => {
  return (
    <div className={`${type === "primary" ? "bg-primary text-white hover:bg-background" : "hover:bg-primary/50"} flex items-center justify-center px-5 rounded cursor-pointer border border-primary transition font-bold`}>
      {btnText}
    </div>
  )
}

export default Button