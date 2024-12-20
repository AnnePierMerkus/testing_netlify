'use client';

import { useState } from 'react';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePayment = () => {
    if (!agreedToTerms) {
      alert('You must agree to the terms and conditions before proceeding.');
      return;
    }
    // Placeholder for payment integration
    alert('Payment processed!');
  };

  return (
      <div className="min-h-screen bg-gray-100 flex items-start justify-center text-black">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Payment</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Appointment Summary</h3>
            <p className="text-gray-600">Consultation with Dr. Smith</p>
            <p className="text-gray-600">Date: Jan 5th, 2025</p>
            <p className="text-gray-600">Time: 3:00 PM</p>
            <p className="text-lg font-bold mt-2">Price: $120.00</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-1">
                Card Number
              </label>
              <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="expiry" className="block text-gray-700 font-medium mb-1">
                  Expiry Date
                </label>
                <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full border rounded-md px-4 py-2"
                    placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                    type="password"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full border rounded-md px-4 py-2"
                    placeholder="123"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="rounded"
              />
              <span>
              I agree to the{' '}
                <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                >
                Terms and Conditions
              </a>
            </span>
            </label>
          </div>

          <button
              onClick={handlePayment}
              className={`w-full mt-6 py-2 rounded-md ${
                  agreedToTerms ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-400 cursor-not-allowed'
              } text-white`}
              disabled={!agreedToTerms}
          >
            Pay Now
          </button>
        </div>
      </div>
  );
};

export default PaymentPage;
