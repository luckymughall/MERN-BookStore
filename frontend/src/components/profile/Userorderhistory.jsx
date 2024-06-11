import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import axios from 'axios';

const Userorderhistory = () => {
    const [orderHistory, setOrderHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/getorderhistory`, { headers });
                setOrderHistory(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

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
                    <img src='/history.png' alt='No Order History' className='w-64 md:w-96'/>
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
                    <h1>Mode</h1>
                </div>
            </div>
            {orderHistory.map((item, i) => (
                <div key={i} className="bg-black bg-opacity-50 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900">
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
                        <h1 className={`font-bold ${item.status === "Order placed" ? "text-yellow-500" : "text-green-500"}`}>
                            {item.status}
                        </h1>
                    </div>
                    <div className="w-none font-bold md:w-[5%] hidden md:block">
                        <h1 className='font-bold'>COD</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Userorderhistory;
