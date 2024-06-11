import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcard from '../components/bookcard/Bookcard';
import Loader from '../components/loader/Loader';

const Allbooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/readbooks`);
        setBooks(response.data.data);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className='px-4 py-8 sm:px-6 lg:px-8'>
      <h4 className='text-white font-semibold text-2xl text-yellow-100 mb-6'>
        All Books
      </h4>

      {books.length === 0 ? (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {books.map((book, i) => (
            <Bookcard key={i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Allbooks;
