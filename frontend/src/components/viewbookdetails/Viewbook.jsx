import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Viewbook = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({});
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const setFavourite = async () => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/favourites`, {}, { headers });
            if (response.data.message === "Book is Already in Favourites") {
                toast.warn(response.data.message);
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const setCart = async () => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/addtocart`, {}, { headers });
            if (response.data.message === "Book added to cart successfully.") {
                toast.success(response.data.message);
            } else {
                toast.warn(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const editBook = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/updatebook`, updatedBook, { headers });
            if (response.data.message === "Book Updated successfully") {
                toast.success(response.data.message);
                setBook(updatedBook);
                setEditMode(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const deleteBook = async () => {
        try {
            const response = await axios.delete(`http://localhost:1000/api/v1/deletebook`, { headers });
            toast.success(response.data.message);
            Navigate("/books");
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/getrecentbooksbyid/${id}`);
                setBook(response.data.data);
                setUpdatedBook(response.data.data); // Initialize updatedBook with fetched book data
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch book', error);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-red-700 rounded p-4 bg-opacity-10">
            <div className="relative flex flex-col md:flex-row items-center justify-start rounded p-4">
                <img 
                    src={book.url} 
                    alt={book.title} 
                    className="h-[300px] md:h-[400px] lg:h-[500px] object-contain w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-4 md:mb-0" 
                />
                {isLoggedIn && role === "user" && (
                    <div className="flex md:flex-col justify-center items-center space-x-4 md:space-x-0 md:space-y-4 md:mb-40 lg:mb-40 lg:mt-[-220px] md:mt-[-120px] gap-4 ml-5">
                        <button className="text-red-600 text-4xl bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-300" onClick={setFavourite}>
                            <FaHeart />
                        </button>
                        <button className="text-4xl bg-white text-blue-500 rounded-full p-2 hover:bg-gray-100 transition-colors duration-300" onClick={setCart}>
                            <FaShoppingCart />
                        </button>
                    </div>
                )}
                {isLoggedIn && role === "admin" && (
                    <div className="flex md:flex-col justify-center items-center space-x-4 md:space-x-0 md:space-y-4 md:mb-40 lg:mb-40 lg:mt-[-220px] md:mt-[-120px] gap-4 ml-5">
                        <button className="text-red-600 text-4xl bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-300" onClick={() => setEditMode(!editMode)}>
                            <FaEdit />
                        </button>
                        <button className="text-4xl bg-white text-blue-500 rounded-full p-2 hover:bg-gray-100 transition-colors duration-300" onClick={deleteBook}>
                            <MdDelete />
                        </button>
                    </div>
                )}

                {editMode ? (
                    <form onSubmit={editBook} className='ml-0 md:ml-4 bg-black bg-opacity-50 p-4 w-full md:w-auto'>
                        <div className="mb-2">
                            <label className="text-white font-extrabold text-lg">Title:</label>
                            <input 
                                type="text" 
                                value={updatedBook.title} 
                                onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })} 
                                className="w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-white font-semibold">Author:</label>
                            <input 
                                type="text" 
                                value={updatedBook.author} 
                                onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })} 
                                className="w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-white font-bold">Description:</label>
                            <textarea 
                                value={updatedBook.description} 
                                onChange={(e) => setUpdatedBook({ ...updatedBook, description: e.target.value })} 
                                className="w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-white font-bold">Language:</label>
                            <input 
                                type="text" 
                                value={updatedBook.language} 
                                onChange={(e) => setUpdatedBook({ ...updatedBook, language: e.target.value })} 
                                className="w-full p-2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-white text-2xl font-bold">Price:</label>
                            <input 
                                type="number" 
                                value={updatedBook.price} 
                                onChange={(e) => setUpdatedBook({ ...updatedBook, price: e.target.value })} 
                                className="w-full p-2"
                            />
                        </div>
                        <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
                    </form>
                ) : (
                    <div className='ml-0 md:ml-4 bg-black bg-opacity-50 p-4 w-full md:w-auto'>
                        <p className="text-white font-extrabold text-lg mb-2">{book.title}</p>
                        <p className="text-white font-semibold mb-2">{book.author}</p>
                        <p className="text-white font-bold mb-2">{book.description}</p>
                        <p className="text-white text-xl font-semibold flex items-center p-1"><GrLanguage className="mr-2"/>{book.language}</p>
                        <p className="text-white text-2xl font-bold">Price : Rs. {book.price}</p>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Viewbook;
