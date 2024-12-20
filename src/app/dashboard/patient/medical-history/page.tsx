'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Modal from '../../../../components/patient/MedicalHistoryModal'; // Import your Modal component

// Define the Row data type
type Row = {
  date: string;
  medicalConcern: string;
  documents: string;
};

const MedicalHistoryPage = () => {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('form'); // Determines what content to show in the modal
  const [data, setData] = useState<Row[]>([
    {
      date: '2024-12-01',
      medicalConcern: 'Heart pain',
      documents: 'sample-document.pdf',
    },
    {
      date: '2024-11-15',
      medicalConcern: 'Shortness of breath',
      documents: 'heart-report.pdf',
    },
    // More rows as needed
  ]);
  const router = useRouter();

  // Columns definition
  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Medical Concern', accessor: 'medicalConcern' },
    { Header: 'Documents', accessor: 'documents' },
  ];

  // Sorting logic and state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Row; direction: 'asc' | 'desc' | null }>({
    key: 'date', // Default sorting key
    direction: null,
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: keyof Row) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file and provide a medical concern.');
      return;
    }

    setUploading(true);

    // Simulating a file upload (replace this with real upload logic later)
    setTimeout(() => {
      setUploading(false);
      alert('File uploaded successfully (dummy process).');

      // Update modal to show success message
      setModalContent('success');

      // Add the uploaded file to the list
      const newDocument: Row = {
        date: new Date().toISOString().split('T')[0], // Use current date
        medicalConcern: file.name, // You can modify this based on your form data
        documents: file.name, // Add the uploaded document's name
      };

      setData((prevData) => [...prevData, newDocument]);
    }, 2000);
  };

  // Toggle modal open/close
  const toggleModal = () => {
    // Reset modal content and file when closing the modal
    setModalContent('form');
    setFile(null);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Button to request second opinion */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-teal-600">Medical History</h1>

        <button
          onClick={toggleModal}
          className="bg-teal-600 text-white py-2 px-6 rounded-md border-2 border-teal-600 hover:bg-teal-700"
        >
          Upload Medical History
        </button>
      </div>

      {/* Previous Second Opinions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => handleSort(column.accessor as keyof Row)}
                  className="py-3 px-6 text-left border-b-2 border-teal-700 cursor-pointer"
                >
                  {column.Header}
                  {sortConfig.key === column.accessor ? (
                    sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                {columns.map((column) => (
                  <td key={column.accessor} className="py-3 px-6 text-black border-b border-gray-200">
                    {column.accessor === 'documents' ? (
                      <a
                        href={`/path-to-documents/${row[column.accessor as keyof Row]}`}
                        download
                        className="text-teal-600 hover:text-teal-800 font-semibold"
                      >
                        {row[column.accessor as keyof Row]}
                      </a>
                    ) : (
                      row[column.accessor as keyof Row]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          onClose={toggleModal}
          modalContent={modalContent}
          onSubmit={handleSubmit}
          file={file}
          setFile={setFile}
          uploading={uploading}
          setUploading={setUploading}
        />
      )}
    </div>
  );
};

export default MedicalHistoryPage;
