'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from './layout'; // Assuming you want the logout button to appear here

const Dashboard = () => {
  const { isLoaded, userId } = useAuth(); // Correct way to use useAuth
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      // If no userId (i.e., not signed in), redirect to login page
      router.push('/login');
    } else if (isLoaded && userId) {
      // User is authenticated, proceed with the dashboard content
      setLoading(false);
    }
  }, [isLoaded, userId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-700">You are signed in. Dashboard content will be shown here soon.</p>
      </div>
  );
};

export default Dashboard;

