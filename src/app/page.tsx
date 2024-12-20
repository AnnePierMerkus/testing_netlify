'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Full-width image */}
            <div className="relative w-full h-[50vh]">
                <img
                    src="/images/landing-page-image.jpg" // Replace with your image path
                    alt="Cardiology Image"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Welcome Section with Card positioned on top of the image */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white bg-opacity-70 border border-gray-200 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <h1 className="text-4xl font-semibold text-teal-800 mb-4">Welcome to CardioCare</h1>
                    <h2 className="text-2xl font-bold text-teal-600 mb-4">Dr. Jane Doe, Cardiologist</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Dr. Jane Doe is a leading cardiologist with over 15 years of experience in providing
                        personalized and expert care to her patients worldwide.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700"
                    >
                        Continue to Login
                    </Link>
                </div>
            </div>

            {/* Services & About Us Section */}
            <div className="bg-gray-50 py-12 px-4">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-semibold text-teal-800 mb-6">Explore Our Offerings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* View Services */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h4 className="text-xl font-semibold text-teal-600 mb-4">View the Services We Offer</h4>
                            <p className="text-gray-600 mb-4">
                                Explore our wide range of cardiology services tailored to your health needs.
                            </p>
                            <Link
                                href="/services"
                                className="block text-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                            >
                                View Services
                            </Link>
                        </div>

                        {/* More About the Doctor */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h4 className="text-xl font-semibold text-teal-600 mb-4">More About the Doctor</h4>
                            <p className="text-gray-600 mb-4">
                                Learn more about Dr. Jane Doe, her experience, and her passion for heart health.
                            </p>
                            <Link
                                href="/about-us"
                                className="block text-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                            >
                                About Dr. Jane Doe
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
