import React, { useState } from 'react';
import { 
  Scheduler, 
  WeekView, 
  Appointments, 
  AppointmentTooltip, 
  AppointmentForm 
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment';
import Link from 'next/link';

// Sample appointments
const appointments = [
  {
    title: 'Test Appointment',
    startDate: new Date(2024, 11, 20, 9, 0),
    endDate: new Date(2024, 11, 20, 10, 0),
    id: 0,
    description: 'This is a test description for the appointment.',
    location: 'Room 101',
  },
  // Add more appointments as needed
];

// Custom Tooltip Content Component
const CustomTooltipContent = ({ appointmentData, ...restProps }: any) => (
  <div>
    {/* Render the default tooltip content */}
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData} />

    {/* Add custom content below */}
    <div style={{ padding: '8px 16px', marginTop: '8px', borderTop: '1px solid #e0e0e0' }}>
      <p>
        <Link
          href="/dashboard/doctor/consultations/patient-documents"
          className="block px-4 py-2 rounded-md text-teal-600 hover:text-white hover:bg-teal-600 font-semibold transition-all duration-300"
        >
          View Patient Documents
        </Link>
      </p>
    </div>
  </div>
);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Function to go to the next week
  const goToNextWeek = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, 'week').toDate());
  };

  // Function to go to the previous week
  const goToPreviousWeek = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, 'week').toDate());
  };

  return (
    <div style={{ height: '80vh', width: '80vw', overflow: 'hidden' }}>
      {/* Buttons to navigate weeks */}
      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          style={{
            color: '#00796b', 
            backgroundColor: 'transparent',
            border: '1px solid #00796b', 
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00796b'; 
            e.currentTarget.style.color = '#fff'; 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'; 
            e.currentTarget.style.color = '#00796b'; 
          }}
        >
          Previous Week
        </button>
        <button
          onClick={goToNextWeek}
          style={{
            color: '#00796b',
            backgroundColor: 'transparent',
            border: '1px solid #00796b',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00796b';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#00796b';
          }}
        >
          Next Week
        </button>
      </div>

      {/* Scheduler Component */}
      <Scheduler data={appointments}>
        <ViewState currentDate={currentDate} onCurrentDateChange={setCurrentDate} />
        <WeekView startDayHour={9} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          contentComponent={CustomTooltipContent} // Use the custom tooltip content
        />
        <AppointmentForm />
      </Scheduler>
    </div>
  );
};

export default Calendar;
