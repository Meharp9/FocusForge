import { Eye, EyeClosed } from 'lucide-react';
import React from 'react'

interface InputFieldProps {
  label?: string;
  type: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, value, placeholder, className, onChange, onKeyDown }: InputFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === 'password';
  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      {label && <label>{label}</label>}
      <div className='relative'>
        <input
          type={isPasswordType ? (showPassword ? 'text' : 'password') : type}
          value={value} 
          placeholder={placeholder} 
          onChange={onChange}
          onKeyDown={onKeyDown}
          className='border border-border focus:border-transparent rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-primary transition bg-input w-full pr-10' 
        />
        {isPasswordType && (
          <button
            type='button'
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none'
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeClosed size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default InputField