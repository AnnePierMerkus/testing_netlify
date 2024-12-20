'use client';

import { useClerk } from '@clerk/nextjs';

const LogoutButton = () => {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';  // Redirect to home page after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
