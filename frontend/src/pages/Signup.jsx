import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [values, setValues] = useState({ username: "", email: "", password: "", address: "", gender: ""  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
const Navigate = useNavigate();
  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      if(values.username===  "" || values.email=== "" || values.password=== "" || values.address=== "") {
        toast.error("All fields are Required.")
      }
      const response=await axios.post(`http://localhost:1000/api/v1/signup`,values);
        toast.success(response.data.message);
        setValues({username: "", email: "", password: "", address: "", gender: ""});
        setTimeout(() => {
          Navigate("/login");
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
        <form className="space-y-6" onSubmit={handlesubmit}>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">UserName</label>
            <div className="mt-1">
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={values.username}
                onChange={change}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">Email</label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                placeholder="Please Enter Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={values.email}
                onChange={change}
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
                onChange={change}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">Address</label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                placeholder="Please Enter Your Address"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={values.address}
                onChange={change}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-xl text-white">Gender</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-radio text-blue-500"
                  checked={values.gender === "Male"}
                  onChange={change}
                />
                <span className="ml-2 text-white">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-radio text-blue-500"
                  checked={values.gender === "Female"}
                  onChange={change}
                />
                <span className="ml-2 text-white">Female</span>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 mt-5 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            <div className='text-center mt-5'>
              <label className='text-white'>Already Have an Account?</label>
              <Link to='/login'>
                <button className='text-white ml-1 hover:text-blue-700 underline'>Login</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
