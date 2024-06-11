import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const dispatch=useDispatch();
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:1000/api/v1/signin`,values);
      toast.success(response.data.message);
      setTimeout(() => {
        dispatch(authActions.login()); 
      }, 1000);
      
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setTimeout(() => {
        Navigate("/profile");
      }, 1000);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during form submission. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-40 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="rounded-full p-4 inline-block">
            <Link to='/'>
              <img src="/logo.png" alt="BookPoint" className="h-10 w-50" />
            </Link>
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">UserName/Email</label>
            <div className="mt-1">
              <input
                type="text"
                name="email"
                placeholder="Enter Your Username/Email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={values.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">Password</label>
            <div className="mt-1">
              <input
                type="password"
                name="password"
                placeholder="Please Enter Your Password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 mt-5 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
            <div className='text-center mt-5'>
              <label className='text-white'>Don't Have Account?</label>
              <Link to='/signup'>
                <button className='text-white ml-1 hover:text-blue-700 underline'>Register</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
