import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth'; // Adjust the import path to your auth slice
import { useSelector } from 'react-redux';
const Sidebar = ({ data }) => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className='bg-black bg-opacity-20 p-4 rounded flex flex-col items-center justify-center'>
      <img src={data.avatar} className='rounded-full overflow-hidden object-cover h-[20vh]' alt="User Avatar"></img>
      <p className='font-semibold text-xl mt-2'>{data.username}</p>
      <p className='font-semibold text-xl mt-2'>{data.email}</p>
      <hr width="80%" size="5" className='mt-3'></hr>
      <div className='mt-[70px] flex flex-col items-center justify-center'>
        {role === "user" && (
          <><Link to="favourites" className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 mb-2 w-[80%] md:w-auto'>
            Favourites
          </Link><Link to="orderhistory" className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 mb-2 w-[80%] md:w-auto'>
              Order History
            </Link><Link to="settings" className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 mb-2 w-[80%] md:w-auto'>
              Settings
            </Link></>
        )}
        {role === "admin" && (
          <><Link to="Allorders" className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 mb-2 w-[80%] md:w-auto'>
          All Orders
        </Link><Link to="Addbook" className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 mb-2 w-[80%] md:w-auto'>
            Add Book
            </Link></>
        )}
        <Link to="/">
        <button
          onClick={handleLogout}
          className='text-white bg-black bg-opacity-70 rounded-full font-semibold hover:bg-zinc-900 transition-all py-2 px-4 flex items-center mb-2 w-[80%] md:w-auto'
        >
          Logout <IoLogOutSharp className="ml-2" />
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
