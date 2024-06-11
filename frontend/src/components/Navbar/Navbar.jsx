import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

    const linksGroup1 = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/books" },
    ];

    const linksGroup2 = isLoggedIn ? [
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "Admin Profile", link: "/profile" }
    ] : [];
    const role = useSelector((state) => state.auth.role);
    if (isLoggedIn === true && role === "admin") {
        // Find the index of the "Profile" link
        const profileIndex = linksGroup2.findIndex(item => item.title === "Profile");
        
        // If the "Profile" link is found, remove it using splice
        if (profileIndex !== -1) {
            linksGroup2.splice(profileIndex, 1);
        }
    }
    if (isLoggedIn === true && role === "user") {
        // Find the index of the "Profile" link
        const profileIndex = linksGroup2.findIndex(item => item.title === "Admin Profile");
        
        // If the "Profile" link is found, remove it using splice
        if (profileIndex !== -1) {
            linksGroup2.splice(profileIndex, 1);
        }
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative flex items-center justify-between text-white px-4 py-2 sm:px-6 lg:px-10'>
            <a href='/' className='flex-shrink-0'>
                <img className="h-[60px] w-[250px] sm:h-[80px] sm:w-[330px]" src="/logo.png" alt="Bookland Haven Logo" />
            </a>
            
            <div className="flex flex-grow justify-center sm:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-1 py-2 px-4 sm:hidden">
                        <div className='flex flex-col gap-2 font-bold'>
                            {linksGroup1.concat(linksGroup2).map((item, i) => (
                                <a key={i} href={item.link} className='hover:text-blue-500 transition-all duration-300 text-black font-semibold'>
                                    {item.title}
                                </a>
                            ))}
                            {!isLoggedIn && !isLoading && (
                                <>
                                    <Link to='/login'>
                                        <button className='border border-blue-500 rounded bg-black text-white px-2 py-1 hover:text-blue-500 transition-all duration-300'>Sign In</button>
                                    </Link>
                                    <Link to='/signup'>
                                        <button className='border border-blue-500 rounded bg-black text-white px-2 py-1 hover:text-blue-500 transition-all duration-300'>Sign Up</button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="hidden sm:flex flex-grow items-center justify-center mr-[60px]">
                <div className='flex gap-2 sm:gap-4 font-bold'>
                    {linksGroup1.map((item, i) => (
                        <a key={i} href={item.link} className='hover:text-blue-500 transition-all duration-300'>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
            <div className="hidden sm:flex items-center justify-end">
                <div className='flex gap-2 sm:gap-4 font-bold'>
                    {linksGroup2.map((item, i) => (
                        <a key={i} href={item.link} className='hover:text-blue-500 transition-all duration-300'>
                            {item.title}
                        </a>
                    ))}
                </div>
                {!isLoggedIn && !isLoading && (
                    <div className='flex gap-2 sm:gap-4 items-center'>
                        <Link to='/login'>
                            <button className={`border rounded px-2 py-1 hover:text-white hover:bg-black transition-all duration-300 ${isOpen ? 'text-white bg-black' : 'border-blue-500'}`}>Sign In</button>
                        </Link>
                        <Link to='/signup'>
                            <button className='border border-blue-500 rounded bg-black text-white px-2 py-1 hover:text-blue-500 transition-all duration-300'>Sign Up</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
