// App.js
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Lyout/Layout';
import Signup from './pages/Signup';
import Allbooks from './pages/Allbooks'
import Viewbook from './components/viewbookdetails/Viewbook';
import Profile from './pages/Profile';
import Favourites from './components/profile/Favourites';
import Cart from './pages/Cart';
import Userorderhistory from './components/profile/Userorderhistory';
import Settings from './components/profile/Settings';
import { useSelector } from 'react-redux';
import Allorders from './pages/Allorders';
import Addbook from './pages/Addbook';
const App = () => {
  const role = useSelector((state)=>state.auth.role);
  return (
    
      <Routes>
      <Route path="/books" element={<Layout showBg={true}><Allbooks /></Layout>} />
      <Route path="/book-details/:id" element={<Layout showBg={true}><Viewbook /></Layout>} />
       <Route path="/signup" element={<Layout showBg={true}><Signup /></Layout>} />
       <Route path="/profile" element={<Layout showBg={true}><Profile /></Layout>} >
        {role ==="user" ? <Route index element={<Favourites />}></Route> : <Route index element={<Allorders />}></Route>}
        <Route path='favourites' element={<Favourites />}></Route>
        <Route path='orderhistory' element={<Userorderhistory />}></Route>
        <Route path='settings' element={<Settings />}></Route>
        {role ==="admin" ? <Route path='Allorders' element={<Allorders />}></Route>: "You are Not Authorized"}
        {role ==="admin" ? <Route path='Addbook' element={<Addbook />}></Route> : "You are Not Authorized"}
       </Route>
       <Route path='/cart' element={<Layout showBg={true}><Cart /></Layout>} />
        <Route path="/login" element={<Layout showBg={true}><Login /></Layout>} />
        <Route path="/" element={<Layout showBg={true}><Home /></Layout>} />
      </Routes>
  
  );
};

export default App;
