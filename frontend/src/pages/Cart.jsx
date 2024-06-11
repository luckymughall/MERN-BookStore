import React, { useState, useEffect } from 'react';
import Loader from '../components/loader/Loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const Navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/getcart`, { headers });
                setCart(response.data.data);
            } catch (error) {
                console.error("Error fetching cart data:", error);
                toast.error("Failed to fetch cart data");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const deletecart = async (bookid) => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v1/delcart/${bookid}`, {}, { headers });
            setCart(cart.filter(item => item._id !== bookid));
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error deleting cart item:", error);
            toast.error("Failed to delete item");
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const PlaceOrder = async () => {
        setPlacingOrder(true);
        try {
            const orderPayload = cart.map(item => ({ id: item._id }));
            const response = await axios.post(`http://localhost:1000/api/v1/order`, { order: orderPayload }, { headers });
            console.log(response);
            toast.success("Order placed successfully!");
            setCart([]);
            Navigate("/profile/orderhistory");
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order");
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {cart.length === 0 ? (
                <div className="min-h-screen flex items-center justify-center">
                    <div className='flex flex-col items-center text-center mt-16 md:mt-32'>
                        <h1 className='text-white text-3xl md:text-5xl font-semibold mb-8'>Empty Cart</h1>
                        <img src='/emptycart.png' alt='empty-cart' className='w-64 md:w-96' />
                    </div>
                </div>
            ) : (
                <>
                    <h1 className='text-white text-2xl md:text-3xl font-semibold mb-4 md:mb-8'>Your Cart</h1>
                    {cart.map((item, i) => (
                        <div key={i} className='flex flex-col md:flex-row my-4 w-full rounded justify-between items-center bg-zinc-800 bg-opacity-40 p-4'>
                            <img src={item.url} alt='cart-img' className='h-[20vh] object-cover ' />
                            <div className='w-full text-white mt-4 md:mt-0'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-xl md:text-2xl font-semibold ml-10'>{item.title}</h2>
                                    <div className='flex items-center'>
                                        <p className='text-lg font-bold'>RS.{item.price}</p>
                                        <FaTrashAlt className='text-white ml-4 cursor-pointer hover:bg-blue-700' onClick={() => deletecart(item._id)} />
                                    </div>
                                </div>
                                <p className='ml-10 hidden lg:block'>{item.description.slice(0, 100)}...</p>
                                <p className='ml-10 md:block lg:hidden'>{item.description.slice(0, 65)}...</p>
                                <p className='ml-10 block md:hidden'>{item.description.slice(0, 100)}...</p>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {cart.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-end">
                    <div className="p-4 bg-zinc-800 bg-opacity-40 rounded">
                        <h1 className="text-3xl text-zinc-200 font-semibold">
                            Total Amount
                        </h1>
                        <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                            <h2>{cart.length} books</h2>
                            <h2>Rs.{calculateTotal()}</h2>
                        </div>
                        <div className="w-[100%] mt-3">
                            <button
                                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                                onClick={PlaceOrder}
                                disabled={placingOrder}
                            >
                                {placingOrder ? "Placing order..." : "Place your order"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
}

export default Cart;
