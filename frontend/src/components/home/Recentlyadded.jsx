import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../bookcard/Bookcard';
import Loader from '../loader/Loader';

const Recentlyadded = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/getrecentbooks`);
                setBooks(response.data.data);
            } catch (error) {
                console.error('Failed to fetch books', error);
            }
        };
        fetchBooks();
    }, []);
    
    return (
        <div className='mt-2 px-4'>
            <h4 className='text-white font-semibold text-2xl text-yellow-100'>Recently Added Books</h4>
            {books.length === 0 ? (
                <div className='flex items-center justify-center'>
                <Loader />
                </div>
            ) : (
                <div className='my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {books.map((book, i) => (
                        <div key={i}>
                            <Bookcard book={book} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recentlyadded;
