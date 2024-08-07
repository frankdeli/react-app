import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import Spinner from './Spinner'

const EditForm = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = Cookies.get('email');
        const configuration = {
            method: "post",
            url: "https://react-app-server-six.vercel.app/getUser",
            data: {email: email},
        };
        const response = await axios(configuration);
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const configuration = {
            method: "post",
            url: "https://react-app-server-six.vercel.app/edituser",
            data: userData,
        };
        const response = await axios(configuration);
        if(response.data.error == 0){
            navigate(0); 
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        setErrors({ general: 'An error occurred while updating data.' });
        setLoading(false);
    }
  };

  return (
    <div className="">
        <Navbar />
        {loading && <Spinner />}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    value={userData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    disabled
                    />
                </div>

                {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Save Changes
                </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EditForm;