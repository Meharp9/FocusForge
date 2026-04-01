import React, { useState } from 'react'
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';

interface SignUpFormProps {
  switchPage: () => void;
}

const SignUpForm = ({ switchPage }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='px-6 flex-grow flex flex-col gap-6 justify-center w-full lg:w-[70%]'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl lg:text-2xl font-black'>
          Create your account
        </h2>
        <p className='text-muted'>
          Start your productivity adventure today.
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <InputField
          label="Email"
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="********"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button btnText='Create Account' className='py-2.5'/>
      </div>
      <div className='flex justify-center'>
        <p>
          Already have an account?
          <span className='text-primary font-medium cursor-pointer ml-1' onClick={switchPage}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm
