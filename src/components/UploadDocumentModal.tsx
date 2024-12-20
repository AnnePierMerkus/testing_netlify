'use client';

import React, { useState } from 'react';

interface UploadDocumentModalProps {
  onClose: () => void;
  appointment: any;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  onClose,
  appointment,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      alert('Document uploaded successfully!');
      setUploading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Upload Document for {appointment?.doctor || 'Appointment'}
        </h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full border rounded px-3 py-2"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className={`bg-teal-600 text-white px-4 py-2 rounded-md ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
