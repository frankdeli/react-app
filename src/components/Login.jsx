import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    // Add your login logic here
    setLoading(true);
    setErrors({});
    
    const configuration = {
        method: "post",
        url: "http://localhost:3001/login",
        data: credentials,
     };

    try {
        const result = await axios(configuration);
        console.log(result);
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8'>
                <h2 className='text-[28px] font-bold text-white mb-6 text-center'>
                    Login
                </h2>
                <form className='flex flex-col' onSubmit={handleLoginForm}>
                    <input 
                        id='email'
                        name='email'
                        type="email" 
                        placeholder='Email'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-3'
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    <input 
                        id='password'
                        name='password'
                        type="password" 
                        placeholder='Password'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-8'
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    <button className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hove:to-blue-600 transition ease-in-out duration-200' type='submit'>
                        Submit
                    </button>
                    <p className='text-white mt-4 text-center'>
                        Dont have an account?
                        <a href="/register" className='text-white-500 hover:underline mt-4 px-1'>
                            Sign Up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;