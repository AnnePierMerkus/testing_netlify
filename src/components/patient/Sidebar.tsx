'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '../LogoutButton';

const Sidebar = () => {
  const pathname = usePathname();

  // Function to check if a route is active
  const isActive = (route: string) => pathname === route;

  return (
    <div className="h-screen w-64 bg-teal-600 text-white flex flex-col py-8 px-4">
      <h2 className="text-2xl font-bold mb-8">Patient Dashboard</h2>
      <nav className="space-y-4">
        <Link
          href="/dashboard/patient"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/patient') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          Dashboard Home
        </Link>
        <Link
          href="/dashboard/patient/appointments"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/patient/appointments') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          My Appointments
        </Link>
        <Link
          href="/dashboard/patient/appointments/history"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/patient/appointments/history') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          My Appointment History
        </Link>
        <Link
          href="/dashboard/patient/medical-history"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard/patient/medical-history') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          My Medical History
        </Link>
        <Link
          href="/dashboard/patient/second-opinion"
          className={`block px-4 py-2 rounded-md ${
            isActive('/dashboard//patient/second-opinion') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          Second Opinion
        </Link>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
