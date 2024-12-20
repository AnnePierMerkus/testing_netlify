'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

interface Service {
    id: number;
    title: string;
    description: string;
    price: number;
}

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get<{ data: Service[] }>(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/services`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                        },
                    }
                );
                setServices(response.data.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-center text-teal-600 mb-8">Our Services</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h2>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <p className="text-teal-600 font-bold text-lg mb-6">${service.price}</p>

                            <div className="mt-auto">
                                <Link
                                    href="/login"
                                    className="block text-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                                >
                                    Continue to Login
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ServicesPage;
