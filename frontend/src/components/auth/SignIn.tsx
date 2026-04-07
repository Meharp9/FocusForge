import SignInForm from '@/components/auth/SignInForm';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeft } from 'lucide-react';

interface SignInProps {
  onToggle: () => void;
  onBack: () => void;
}

const SignIn = ({ onToggle, onBack }: SignInProps) => {
  return (
    <div className='w-full h-screen p-6 md:p-8 flex flex-col items-center'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex gap-1 items-center' onClick={onBack}>
          <ArrowLeft size={18}/>
          <p className='text-lg font-medium cursor-pointer'>
            Back
          </p>
        </div>
        <div className=''>
          <ThemeToggle />
        </div>
      </div>
      <SignInForm switchPage={onToggle}/>
    </div>
  )
}

export default SignIn
