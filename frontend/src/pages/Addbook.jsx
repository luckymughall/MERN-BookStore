import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Addbook = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    imageUrl: '',
    title: '',
    author: '',
    language: '',
    price: '',
    description: ''
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1000/api/v1/addbook`, data, { headers });
      
      toast.success(response.data.message);
      
      // Reset form data after successful API call
      setData({
        imageUrl: '',
        title: '',
        author: '',
        language: '',
        price: '',
        description: ''
      });
      
      // Refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milliseconds = 2 seconds
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  
  
  

  return (
    <div className="container mx-auto mt-5 p-5">
      <h1 className="text-5xl mb-5 text-center">Add Book</h1>
      <div className="form-group bg-black bg-opacity-60 p-5 rounded-lg">
        <div className='flex flex-col'>
          <label htmlFor="imageUrl" className="block text-2xl mb-2">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            placeholder="Enter the image URL"
            className="p-2 border border-gray-300 rounded text-black"
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col mt-7'>
          <label htmlFor='title' className='text-2xl block mb-2'>Title of Book</label>
          <input type='text' id='title' placeholder='Title of The Book' className='p-2 border border-gray-300 rounded text-black' onChange={handleChange} />
        </div>
        <div className='flex flex-col mt-7'>
          <label htmlFor='author' className='text-2xl block mb-2'>Author of Book</label>
          <input type='text' id='author' placeholder='Author of Book' className='p-2 border border-gray-300 rounded text-black' onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className='mt-7 flex-col'>
            <label htmlFor='language' className='text-2xl block mb-2'>Language of Book</label>
            <input type='text' id='language' placeholder='Language' className='w-full p-2 border border-gray-300 rounded text-black' onChange={handleChange} />
          </div>
          <div className='mt-7 flex-col'>
            <label htmlFor='price' className='text-2xl block mb-2'>Price of Book</label>
            <input type='text' id='price' placeholder='Price' className='w-full p-2 border border-gray-300 rounded text-black' onChange={handleChange} />
          </div>
        </div>
        <div className='mt-7'>
          <label htmlFor='description' className='text-2xl block mb-2'>Description of Book</label>
          <textarea id='description' placeholder='Description of Book' className='w-full p-2 border border-gray-300 rounded text-black' onChange={handleChange} />
        </div>
        <div className='mt-7 flex justify-center'>
          <button className='text-white text-3xl bg-blue-600 font-bold py-2 px-4 rounded-lg text-xl hover:bg-blue-700' onClick={addBook}>Add Book</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addbook;
