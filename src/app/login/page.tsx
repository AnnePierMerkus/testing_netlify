// app/login/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { RedirectToSignIn } from '@clerk/nextjs';

const LoginPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted to true when the component mounts on the client
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isSignedIn) {
      router.push('/dashboard/doctor');
    }
  }, [isSignedIn, router]);
  
  if (!isMounted) {
    return null; // Render nothing until the component has mounted on the client-side
  }

  if (isSignedIn) {
    return null; // Redirect to dashboard if already signed in
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Login</h2>
        <RedirectToSignIn />
      </div>
    </div>
  );
};

export default LoginPage;
