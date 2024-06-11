import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import axios from 'axios';
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { FaUserEdit, FaTimes } from "react-icons/fa";

const Allorders = () => {
    const [options, setOptions] = useState(-1);
    const [orderHistory, setOrderHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [openPopups, setOpenPopups] = useState({});

    const setOptionbutton = (i) => {
        setOptions(i);
    };

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/allorders`, { headers });
                setOrderHistory(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    const statusupdate = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/update-status/${orderId}`, { status }, { headers });
            if (response.data.status === "Success") {
                const updatedOrderHistory = orderHistory.map(order =>
                    order._id === orderId ? { ...order, status } : order
                );
                setOrderHistory(updatedOrderHistory);
                setOptions(-1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const togglePopup = (orderId) => {
        setOpenPopups(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    const closePopup = (orderId) => {
        setOpenPopups(prevState => ({
            ...prevState,
            [orderId]: false
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100vh]">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-[100vh]">
                <div>
                    <h1 className="text-red-500">Error: {error}</h1>
                    <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Retry</button>
                </div>
            </div>
        );
    }

    if (!orderHistory || orderHistory.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className='flex flex-col items-center text-center mt-16 md:mt-32'>
                    <h1 className='text-white text-3xl md:text-5xl font-semibold mb-8 text-opacity-90'>No Order History</h1>
                    <img src='/history.png' alt='No Order History' className='w-64 md:w-96' />
                </div>
            </div>
        );
    }

    return (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
            <div className="mt-4 bg-black bg-opacity-50 w-full rounded py-2 px-4 flex gap-2">
                <div className="w-[3%]">
                    <h1 className="text-center font-bold">Sr.</h1>
                </div>
                <div className="w-[22%] font-bold">
                    <h1>Books</h1>
                </div>
                <div className="w-[45%] font-bold">
                    <h1>Description</h1>
                </div>
                <div className="w-[9%] font-bold">
                    <h1>Price</h1>
                </div>
                <div className="w-[16%] font-bold">
                    <h1>Status</h1>
                </div>
                <div className="w-none font-bold md:w-[5%] hidden md:block">
                    <FaUserLarge />
                </div>
            </div>
            {orderHistory.map((item, i) => (
                <div key={i} className="bg-black bg-opacity-50 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 relative">
                    <div className="w-[3%]">
                        <h1 className="text-center">{i + 1}</h1>
                    </div>
                    <div className="w-[22%]">
                        {item.book ? (
                            <Link
                                to={`/book-details/${item.book._id}`}
                                className="hover:text-blue-300 font-bold"
                            >
                                {item.book.title}
                            </Link>
                        ) : (
                            <span>Unknown Book</span>
                        )}
                    </div>
                    <div className="w-[45%]">
                        <h1 className="font-bold">
                            {item.book && item.book.description ? item.book.description.slice(0, 100) : 'No description available'} ...
                        </h1>
                    </div>
                    <div className="w-[9%]">
                        <h1 className="font-bold">{item.book ? item.book.price : 'N/A'}</h1>
                    </div>
                    <div className="w-[16%]">
                        <h1 className="font-semibold">
                            <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptionbutton(i)}>
                                {item.status === "Order placed" ? (
                                    <div className="text-yellow-500">{item.status}</div>
                                ) : item.status === "Canceled" ? (
                                    <div className="text-red-500">{item.status}</div>
                                ) : (
                                    <div className="text-green-500">{item.status}</div>
                                )}
                            </button>
                            {options === i && (
                                <div className="flex">
                                    <select
                                        name="status"
                                        className="bg-gray-800"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((statusOption, index) => (
                                            <option value={statusOption} key={index}>
                                                {statusOption}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="text-green-500 hover:text-pink-600 mx-2" onClick={() => statusupdate(item._id)}>
                                        <FaCheck />
                                    </button>
                                </div>
                            )}
                        </h1>
                    </div>
                    <div className="w-none font-bold md:w-[5%] hidden md:block">
                        <h1 className='font-bold'>
                            <button onClick={() => togglePopup(item._id)}>
                                <FaUserEdit />
                            </button>
                            {openPopups[item._id] && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 relative w-80">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => closePopup(item._id)}
            >
                <FaTimes />
            </button>
            <h3 className="text-lg text-black font-semibold mb-2">User Information</h3>
            <p className='text-black'><strong>Username:</strong> {item.user.username}</p>
            <p className='text-black'><strong>Email:</strong> {item.user.email}</p>
            <p className='text-black'><strong>Address:</strong> {item.user.address}</p>
        </div>
    </div>
)}

                        </h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Allorders;