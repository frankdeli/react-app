import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/TokenUtils';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = () => {
    const token = getToken();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const email = Cookies.get('email');
        if (email) {
            try {
                // const email = Cookies.get('email');
                const configuration = {
                    method: "post",
                    url: "https://express-rho-livid.vercel.app/logout",
                    data: {email: email},
                };
                const response = await axios(configuration);
                if(response.data.error == 0){
                    removeToken();
                    navigate('/login');
                }
            } catch (err) {
                setError('Failed to fetch user data.');
            }
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                <Link to="/">MyApp</Link>
                </div>
                <div>
                {!token ? (
                    <>
                    <Link to="/login" className="text-gray-300 hover:text-white px-3">Login</Link>
                    <Link to="/register" className="text-gray-300 hover:text-white px-3">Register</Link>
                    </>
                ) : (
                    <>
                    <Link to="/home" className="text-gray-300 hover:text-white px-3">Home</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white px-3">Profile</Link>
                    <Link to="/reset" className="text-gray-300 hover:text-white px-3">Reset</Link>
                    <button
                        onClick={handleLogout}
                        className="text-gray-300 hover:text-white px-3 bg-transparent border-none cursor-pointer"
                    >
                        Logout
                    </button>
                    </>
                )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
