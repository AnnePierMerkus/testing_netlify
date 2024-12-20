'use client';

import Navbar from "@/components/Navbar";
import Link from "next/link";

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Main Content Section */}
            <div className="container mx-auto py-16 px-4">
                <div className="flex flex-col lg:flex-row items-start lg:gap-8">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-full lg:w-1/3 flex flex-col items-center lg:items-start">
                        <img
                            src="/images/doctor-image.jpg" // Replace with your image path
                            alt="Jane Doe"
                            className="rounded-lg shadow-lg h-auto max-h-[90vh] w-auto"
                        />
                    </div>

                    {/* Info and Accolades Section */}
                    <div className="flex flex-col lg:flex-row flex-1 gap-8 mt-8 lg:mt-0">
                        {/* About Jane Doe Card */}
                        <div
                            className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                                About Jane Doe
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Jane Doe is a renowned cardiologist with over 15 years of
                                experience in providing expert care and personalized consultations
                                to patients worldwide.
                            </p>
                            <p className="text-gray-700 mt-4">
                                With a deep commitment to innovation, she has been instrumental in
                                shaping CardioCare into a platform that ensures accessibility and
                                quality care for everyone.
                            </p>
                            <p className="text-gray-700 mt-4">
                                With a deep commitment to innovation, she has been instrumental in
                                shaping CardioCare into a platform that ensures accessibility and
                                quality care for everyone.
                            </p>
                            <p className="text-gray-700 mt-4">
                                With a deep commitment to innovation, she has been instrumental in
                                shaping CardioCare into a platform that ensures accessibility and
                                quality care for everyone.
                            </p>
                        </div>

                        {/* Accolades Card */}
                        <div
                            className="flex-1 bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col relative">
                            <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                                Accolades
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-teal-100 p-4 rounded-lg shadow">
                                    <h4 className="text-xl font-bold text-teal-800">15+</h4>
                                    <p className="text-gray-700">Years of Experience</p>
                                </div>
                                <div className="bg-teal-100 p-4 rounded-lg shadow">
                                    <h4 className="text-xl font-bold text-teal-800">10,000+</h4>
                                    <p className="text-gray-700">Patients Helped</p>
                                </div>
                                <div className="bg-teal-100 p-4 rounded-lg shadow">
                                    <h4 className="text-xl font-bold text-teal-800">20+</h4>
                                    <p className="text-gray-700">Countries Served</p>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4">
                                <Link
                                    href="/login"
                                    className="block text-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                                >
                                    Continue to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
