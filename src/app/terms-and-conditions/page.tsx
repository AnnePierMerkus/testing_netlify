import React from 'react';

const TermsConditions = () => {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
            <header className="bg-teal-600 text-white py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold">Terms & Conditions</h1>
                    <nav>
                        <a href="/" className="text-white hover:underline">Home</a>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
                    <p className="mb-4">Welcome to our platform. By accessing or using our services, you agree to the following terms and conditions:</p>

                    <h3 className="text-lg font-semibold mt-4">1. User Obligations</h3>
                    <p className="mb-4">Users must provide accurate information and comply with all applicable laws when using our services.</p>

                    <h3 className="text-lg font-semibold mt-4">2. Privacy and Data Security</h3>
                    <p className="mb-4">We are committed to protecting your data. Please refer to our Privacy Policy for more details.</p>

                    <h3 className="text-lg font-semibold mt-4">3. Service Availability</h3>
                    <p className="mb-4">We aim to provide uninterrupted access to our services but do not guarantee availability at all times.</p>

                    <h3 className="text-lg font-semibold mt-4">4. Limitation of Liability</h3>
                    <p className="mb-4">We are not liable for any indirect damages arising from the use of our platform.</p>

                    <h3 className="text-lg font-semibold mt-4">5. Modifications to Terms</h3>
                    <p className="mb-4">We may update these terms periodically. Continued use of the platform constitutes acceptance of any changes.</p>

                    <p className="mt-4">If you have any questions, please contact us at support@example.com.</p>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Your Company. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TermsConditions;
