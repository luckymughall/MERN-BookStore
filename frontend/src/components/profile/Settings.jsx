import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: ''
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/getuserinfo`, { headers });
        const data = response.data; // Extract data from response
        setFormData({
          username: data.username,
          email: data.email,
          address: data.address
        });
      } catch (error) {
        alert('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/api/v1/updateaddress`, { address: formData.address }, { headers });
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Error updating address');
    }
  };

  return (
    <div className="flex bg-black bg-opacity-40">
      <div className="flex-col bg-black bg-opacity-40 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-300 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-gray-100 rounded-md"
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300 mb-2">Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-gray-100 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
