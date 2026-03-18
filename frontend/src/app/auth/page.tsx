'use client';

import AuthBanner from '@/components/auth/AuthBanner'
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(true);
  const router = useRouter();

  const goBackToHome = () => {
    router.push("/");
  }

  return (
    <div className='bg-background flex'>
      <AuthBanner />
      {showSignUp ? 
        <SignUp onToggle={() => setShowSignUp(false)} onBack={goBackToHome} /> : 
        <SignIn onToggle={() => setShowSignUp(true)} onBack={goBackToHome} />
      }
    </div>
  )
}