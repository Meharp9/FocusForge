import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import SignUpForm from '@/components/auth/SignUpForm';

interface SignUpProps {
  onToggle: () => void;
  onBack: () => void;
}

const SignUp = ({ onToggle, onBack }: SignUpProps) => {
  return (
    <div className='w-[50%] p-8 flex flex-col items-center'>
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
      <SignUpForm switchPage={onToggle}/>
    </div>
  )
}

export default SignUp
