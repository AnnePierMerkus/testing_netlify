'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Define the Row data type
type Row = {
  date: string;
  medicalConcern: string;
  documents: string;
};

const ReviewSecondOpinionPage = () => {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [uploadingRow, setUploadingRow] = useState<number | null>(null); // Track which row is being uploaded
  const [medicalConcern, setMedicalConcern] = useState('');
  const router = useRouter();

  // Table data (with Row type annotation)
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

  // Columns definition
  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Medical Concern', accessor: 'medicalConcern' },
    { Header: 'Documents', accessor: 'documents' },
    { Header: 'Action', accessor: 'action' }, // New column for actions
  ];

  // Handle file upload for a specific row
  const handleFileUpload = (rowIndex: number) => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }

    setUploadingRow(rowIndex);

    // Simulate file upload (replace with your DB logic)
    setTimeout(() => {
      console.log(`Uploaded file: ${file.name} for row index ${rowIndex}`);
      setFile(null); // Clear the file input
      setUploadingRow(null);

      // Remove the row after successful upload
      setData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    }, 2000); // Simulated delay
  };

  // Sorting logic and state
  const [sortConfig, setSortConfig] = useState<{ key: keyof Row; direction: 'asc' | 'desc' } | null>(null);


  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig?.key) {
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
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-teal-600">Second Opinions</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => column.accessor !== 'action' && handleSort(column.accessor as keyof Row)}
                  className={`py-3 px-6 text-left border-b-2 border-teal-700 ${
                    column.accessor !== 'action' ? 'cursor-pointer' : ''
                  }`}
                >
                  {column.Header}
                  {sortConfig?.key === column.accessor ? (
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
                    ) : column.accessor === 'action' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                          className="text-sm"
                        />
                        <button
                          onClick={() => handleFileUpload(index)}
                          disabled={uploadingRow === index}
                          className={`px-4 py-2 text-white font-semibold rounded ${
                            uploadingRow === index ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-800'
                          }`}
                        >
                          {uploadingRow === index ? 'Uploading...' : 'Upload'}
                        </button>
                      </div>
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
    </div>
  );
};

export default ReviewSecondOpinionPage;
