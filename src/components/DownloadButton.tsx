// components/DownloadButton.tsx
import React from 'react';

type DownloadButtonProps = {
    url: string;
    fileName: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, fileName }) => {
    const handleDownload = async () => {
        try {
            // Fetch the file from the server
            const response = await fetch(url);
            const blob = await response.blob(); // Create a Blob from the response

            // Create an object URL for the Blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a temporary link element to trigger the download
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName; // Specify the file name for download
            a.click(); // Trigger the download by simulating a click
            window.URL.revokeObjectURL(blobUrl); // Clean up after download
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="text-teal-600 hover:text-teal-800 font-semibold cursor-pointer"
        >
            {fileName} {/* Display the document name */}
        </button>
    );
};

export default DownloadButton;
