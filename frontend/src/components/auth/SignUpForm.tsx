import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signUp, clearError } from '@/store/slices/authSlice';

interface SignUpFormProps {
  switchPage: () => void;
}

const SignUpForm = ({ switchPage }: SignUpFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error: authError } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSignUp = async () => {
    setValidationError('');
    dispatch(clearError());

    if (!email || !password || !confirmPassword) {
      setValidationError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    const result = await dispatch(signUp({ email, password }));
    if (signUp.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  const error = validationError || authError;

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
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <Button btnText={loading ? 'Creating Account...' : 'Create Account'} className='py-2.5' onClick={handleSignUp}/>
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
