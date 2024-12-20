'use client';
import { useState } from 'react';
import Calendar from '../../../../components/doctor/CalendarDoctor';

const AppointmentsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-teal-600">Consultation</h1>
      </div>
      
      <Calendar />
    </div>
  );
};

export default AppointmentsPage;
