import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookcard = ({ book,favourite }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid:book._id,
    };
    const favremove = async()=>{
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/removefavourites`,{},{headers});
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <>
            
                <div className='rounded overflow-hidden shadow-lg p-4 bg-red-700 bg-opacity-10'>
                    <div className='w-full h-64 md:h-48 flex items-center justify-center rounded'>
                    <Link to={`/book-details/${book._id}`}>
                        <img 
                            src={book.url} 
                            alt={book.title} 
                            className='max-h-full max-w-full object-cover h-[25vh]'
                        />
                        </Link>
                    </div>
                    <div className='mt-2'>
                    <Link to={`/book-details/${book._id}`}>
                        <h5 className='text-white text-lg font-extrabold'>{book.title}</h5>
                        <p className='text-gray-100 font-bold'>{book.author}</p>
                        <p className='text-white text-xl font-bold'>RS.{book.price}</p>
                        </Link>
                        {favourite && (
                        <button onClick={favremove} className="bg-yellow-50 px-4 py-2 rounded-border border-yellow-500 text-yellow-500 mt-4">Remove From Favourites</button>
                    )}
                    </div>
                    <ToastContainer />
                </div>
            
            
        </>
    );
};

export default Bookcard;
