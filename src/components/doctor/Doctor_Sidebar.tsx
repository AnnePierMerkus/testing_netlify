'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../LogoutButton';

const Doctor_Sidebar = () => {
  const pathname = usePathname();

  // Function to check if a route is active
  const isActive = (route: string) => pathname === route;

  return (
    <div className="h-screen w-64 bg-teal-600 text-white flex flex-col py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard/doctor"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/doctor') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          Dashboard Doctor
        </Link>
        <Link
          href="/dashboard/doctor/consultations"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/doctor/consultations') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          Consultations
        </Link>
        <Link
          href="/dashboard/doctor/second_opinions"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/doctor/second_opinions') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          Pending Second Opinions
        </Link>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
};

export default Doctor_Sidebar;
