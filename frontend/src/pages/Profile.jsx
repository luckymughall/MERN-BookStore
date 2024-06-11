import React, { useState, useEffect } from 'react';
import Sidebar from '../components/profile/Sidebar';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/loader/Loader';

const Profile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            return <Navigate to="/login" />;
        }

        const fetchProfile = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get(`http://localhost:1000/api/v1/getuserinfo`, { headers });
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isLoggedIn]);

    if (loading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Loader />
            </div>
        );
    }

    if (!profile) {
        return null; // Handle error or loading state here
    }

    return (
        <div className='flex flex-col md:flex-row text-white'>
            <div className='w-full md:w-2/6 lg:w-1/4'>
                <Sidebar data={profile} />
            </div>
            <div className='w-full md:w-5/6 lg:w-3/4'>
                <Outlet />
            </div>
        </div>
    );
}

export default Profile;
