import { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';

interface SignUpFormProps {
  switchPage: () => void;
}

const SignUpForm = ({ switchPage }: SignUpFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.detail || data.error || 'Sign up failed.');
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      router.push('/dashboard');
    } catch {
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

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
