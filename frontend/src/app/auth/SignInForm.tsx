import { useState } from 'react';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';

interface SignInFormProps {
  switchPage: () => void;
}

const SignInForm = ({ switchPage }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='px-6 flex-grow flex flex-col gap-6 justify-center w-full lg:w-[70%]'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl lg:text-2xl font-black'>
          Welcome Back
        </h2>
        <p className='text-muted'>
          Enter your credentials to access your forge.
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
        <Button btnText='Sign In' className='py-2.5'/>
      </div>
      <div className='flex justify-center'>
        <p>
          Don&apos;t have an account?
          <span className='text-primary font-medium cursor-pointer ml-1' onClick={switchPage}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignInForm