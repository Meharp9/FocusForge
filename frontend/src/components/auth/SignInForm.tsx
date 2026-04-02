import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signIn, clearError } from '@/store/slices/authSlice';

interface SignInFormProps {
  switchPage: () => void;
}

const SignInForm = ({ switchPage }: SignInFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error: authError } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSignIn = async () => {
    setValidationError('');
    dispatch(clearError());

    if (!email || !password) {
      setValidationError('All fields are required.');
      return;
    }

    const result = await dispatch(signIn({ email, password }));
    if (signIn.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  const error = validationError || authError;

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
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <Button btnText={loading ? 'Signing In...' : 'Sign In'} className='py-2.5' onClick={handleSignIn}/>
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
