// services/doctors.js
import axios from 'axios';

export const fetchDoctors = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/doctors`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
    });
    return response.data.data;
};
