'use client';
import { useState } from "react";

interface AppointmentModalProps {
  onClose: () => void;
}

const AppointmentModal = ({ onClose }: AppointmentModalProps) => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate appointment booking
    setTimeout(() => {
      setLoading(false);
      alert('Appointment booked successfully!');
      onClose(); // Close the modal after booking
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-teal-600 mb-4 text-black">Book an Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="doctor" className="block text-black">Select Doctor</label>
            <select
              id="doctor"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Select a doctor</option>
              <option value="Dr. John">Dr. John Doe</option>
              <option value="Dr. Jane">Dr. Jane Smith</option>
              <option value="Dr. Alan">Dr. Alan Brown</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-black">Date</label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-black">Time</label>
            <input
              type="time"
              id="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-black">Reason for Consultation</label>
            <textarea
              id="reason"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
