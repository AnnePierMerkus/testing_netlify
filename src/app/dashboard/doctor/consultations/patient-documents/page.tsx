'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Define the Row data type
type Row = {
  date: string;
  documentTitle: string;
  documents: string;
};

const ReviewSecondOpinionPage = () => {
  const { user } = useUser();
  const [medicalConcern, setMedicalConcern] = useState('');
  const router = useRouter();

  // Table data (with Row type annotation)
  const [data, setData] = useState<Row[]>([
    {
      date: '2024-12-01',
      documentTitle: 'TBC scan',
      documents: 'TBC scan.pdf',
    },
    {
      date: '2024-11-15',
      documentTitle: 'History',
      documents: 'history.pdf',
    },
  ]);

  // Columns definition
  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'Document Title', accessor: 'documentTitle' },
    { Header: 'Documents', accessor: 'documents' },
  ];

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
        <h1 className="text-2xl font-bold text-teal-600">Patients Documents</h1>
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
