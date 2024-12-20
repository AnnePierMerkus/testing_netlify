// components/Calendar.tsx

'use client';

import React, { useState } from 'react';
import { Scheduler, WeekView, Appointments, AppointmentTooltip, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import moment from 'moment'; // To handle date manipulation

const appointments = [
  {
    title: 'Test Appointment',
    startDate: new Date(2024, 11, 20, 9, 0), // December 20, 2024, 9:00 AM
    endDate: new Date(2024, 11, 20, 10, 0), // December 20, 2024, 10:00 AM
    id: 0,
  },
  // Add more appointments here as needed
];

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
    <div style={{ height: '80vh', width: '80vw', overflow: 'hidden' }}> {/* Hide overflow to remove extra scrollbar */}
      {/* Buttons to navigate weeks */}
      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          style={{
            color: '#00796b', // Lighter color for the text
            backgroundColor: 'transparent',
            border: '1px solid #00796b', // Border to make it visible
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s', // Added transition for text color change
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00796b'; // Hover background
            e.currentTarget.style.color = '#fff'; // Change text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'; // Reset background
            e.currentTarget.style.color = '#00796b'; // Reset text color
          }}
        >
          Previous Week
        </button>
        <button
          onClick={goToNextWeek}
          style={{
            color: '#00796b', // Lighter color for the text
            backgroundColor: 'transparent',
            border: '1px solid #00796b', // Border to make it visible
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s', // Added transition for text color change
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00796b'; // Hover background
            e.currentTarget.style.color = '#fff'; // Change text color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'; // Reset background
            e.currentTarget.style.color = '#00796b'; // Reset text color
          }}
        >
          Next Week
        </button>
      </div>

      <Scheduler data={appointments}>
        <ViewState currentDate={currentDate} onCurrentDateChange={setCurrentDate} />
        <WeekView startDayHour={9} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip showCloseButton />
        <AppointmentForm />
      </Scheduler>
    </div>
  );
};

export default Calendar;
