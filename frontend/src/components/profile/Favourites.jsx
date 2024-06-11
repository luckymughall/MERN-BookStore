import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from '../bookcard/Bookcard';

const Favourites = () => {
    const [favbooks, setFavbooks] = useState([]);
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/v1/getfavbooks`, { headers });
            setTimeout(() => {
                setFavbooks(response.data.data);
            }, 1000);
        }
        fetch();
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {favbooks.length === 0 && <div className="col-span-full text-center">No Favourite Books.</div>}
                {favbooks && favbooks.map((items, i) => (
                    <div key={i} className="col-span-1">
                        <Bookcard book={items} favourite={true} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favourites;
