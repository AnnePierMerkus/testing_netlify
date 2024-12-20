'use client';

import React, { useState, useMemo } from 'react';
import { useTable, Column } from 'react-table';

// Define the Row type for consistency
type Row = {
  date: string;
  doctor: string;
  type: string;
  status: string;
  document: string | null;
};

const AppointmentHistoryPage = () => {
  const data = useMemo<Row[]>( 
    () => [
      {
        date: '2024-12-10',
        doctor: 'Dr. Smith',
        type: 'General Consultation',
        status: 'Completed',
        document: 'report1.pdf',
      },
      {
        date: '2024-12-08',
        doctor: 'Dr. Doe',
        type: 'Follow-Up',
        status: 'Pending',
        document: null,  // N/A will be shown here
      },
    ],
    []
  );

  const columns: Column<Row>[] = useMemo(
    () => [
      { Header: 'Date', accessor: 'date' },
      { Header: 'Doctor', accessor: 'doctor' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Documents', accessor: 'document' },  // Re-add document column
    ],
    []
  );

  // Sorting logic and state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Row;
    direction: 'asc' | 'desc' | null;
  }>({
    key: 'date', // Default sorting key
    direction: null,
  });

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) { // Ensure we have a valid key before sorting
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue == null || bValue == null) return 0;
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: sortedData });

  return (
    <div>
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Appointment History</h1>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse shadow-lg rounded-lg"
        >
          <thead className="bg-teal-600 text-white">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    onClick={() => handleSort(column.id as keyof Row)} // Ensure column.id matches Row keys
                    className="py-3 px-6 text-left border-b-2 border-teal-700 cursor-pointer"
                  >
                    {column.render('Header')}
                    <span>
                      {sortConfig.key === column.id
                        ? sortConfig.direction === 'asc'
                          ? ' 🔼'
                          : ' 🔽'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="py-3 px-6 text-black border-b border-gray-200"
                      >
                        {cell.column.id === 'document' && !cell.value ? (
                          <span className="text-gray-500">N/A</span>  // Display N/A when document is null
                        ) : cell.column.id === 'document' ? (
                          <a
                            href={`/path/to/documents/${cell.value}`}
                            download
                            className="text-teal-600 hover:text-teal-800"
                          >
                            {cell.value}
                          </a>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentHistoryPage;
