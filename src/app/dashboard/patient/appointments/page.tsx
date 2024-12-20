'use client';
import { useState } from 'react';
import Calendar from '../../../../components/patient/CalendarTimeline';
import AppointmentModal from '../../../../components/patient/AppointmentModal';
import {router} from "next/client";
import {useRouter} from "next/navigation";

const AppointmentsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    router.push('/dashboard/patient/payment');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-teal-600">Appointments</h1>
        <button
          onClick={handleOpenModal}
          className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
        >
          Book Appointment
        </button>
      </div>

      <Calendar />

      {isModalOpen && <AppointmentModal onClose={handleCloseModal} />}
    </div>
  );
};

export default AppointmentsPage;
