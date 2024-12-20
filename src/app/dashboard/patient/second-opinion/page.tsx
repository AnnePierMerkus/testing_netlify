'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Modal from '../../../../components/patient/Modal';
import DownloadButton from '../../../../components/DownloadButton'; // Import the new DownloadButton component

type Row = {
  date: string;
  medicalConcern: string;
  patient_documents: any[];
  status: string;
  medicalReport?: string | null;
  doctor: { name: string; specialty: string; email: string };
  patient: { name: string; email: string };
};

const RequestSecondOpinionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [medicalConcern, setMedicalConcern] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('form');
  const [secondOpinions, setSecondOpinions] = useState<Row[]>([]); // Store data from API
  const router = useRouter();

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchSecondOpinions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/second-opinions`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
          params: {
            populate: ['doctor', 'patient', 'patient_documents'],
          },
        });
        setSecondOpinions(response.data.data); // Store the retrieved data
      } catch (error) {
        console.error('Error fetching second opinions data:', error);
      }
    };

    fetchSecondOpinions();
  }, []);

  // Columns definition
  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Medical Concern', accessor: 'medical_concern' },
    { Header: 'Doctor', accessor: 'doctor' },
    { Header: 'Patient', accessor: 'patient' },
    { Header: 'Documents', accessor: 'patient_documents' },
    { Header: 'Status', accessor: 'completion_status' },
    { Header: 'Medical Report', accessor: 'medical_report' },
  ];

  // Sorting logic and state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Row; direction: 'asc' | 'desc' | null }>({
    key: 'date',
    direction: null,
  });

  const sortedData = React.useMemo(() => {
    const sortableData = [...secondOpinions];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue == null || bValue == null) return 0; // Skip comparison if either value is null/undefined
        if (typeof aValue !== typeof bValue) return 0; // Skip if values have different types

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0; // In case values are equal
      });
    }
    return sortableData;
  }, [secondOpinions, sortConfig]);

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

    if (!file || !medicalConcern) {
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

      // Route to payment page after submission
      router.push('/dashboard/patient/payment');
    }, 2000);
  };

  // Toggle modal open/close
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
      <div>
        {/* Button to request second opinion */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-teal-600">Second Opinion</h1>

          <button
              onClick={toggleModal}
              className="bg-teal-600 text-white py-2 px-6 rounded-md border-2 border-teal-600 hover:bg-teal-700"
          >
            Request Second Opinion
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
                        {

                          column.accessor === 'patient' ? (
                              row[column.accessor].email // Directly access email since patient is always set
                          ) : column.accessor === 'doctor' ? (
                              row[column.accessor].name // Directly access name since doctor is always set
                          ) : column.accessor === 'patient_documents' ? (
                              Array.isArray(row[column.accessor]) && row[column.accessor]?.length > 0 ? (
                                  <DownloadButton
                                      url={`http://localhost:1337${row[column.accessor][0].url}`} // Pass URL to DownloadButton
                                      fileName={row[column.accessor][0].name} // Pass file name to DownloadButton
                                  />
                              ) : (
                                  'No document available'
                              )
                          ) : column.accessor === 'medicalReport' ? (
                              'N/A'// row[column.accessor as keyof Row] || 'N/A'
                          ) : (
                              'N/A'// row[column.accessor as keyof Row] || 'N/A' // Ensure there's always something rendered
                          )
                        }
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
                medicalConcern={medicalConcern}
                setMedicalConcern={setMedicalConcern}
            />
        )}
      </div>
  );
};

export default RequestSecondOpinionPage;
