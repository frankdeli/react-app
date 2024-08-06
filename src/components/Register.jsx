import React, { useState } from 'react';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleRegisterForm = (e) => {
    e.preventDefault();
    // Add your register logic here
  };

  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8'>
                <h2 className='text-[28px] font-bold text-white mb-6 text-center'>
                    Register
                </h2>
                <form className='flex flex-col'>
                    <input 
                        type="text" 
                        placeholder='User Name'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-3'
                    />
                    <input 
                        type="email" 
                        placeholder='Email'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-3'
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-3'
                    />
                    <input 
                        type="password" 
                        placeholder='Confirm Password'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300 mb-8'
                    />
                    <button className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hove:to-blue-600 transition ease-in-out duration-200' type='submit'>
                        Submit
                    </button>
                    <p className='text-white mt-4 text-center'>
                        Already have an account?
                        <a href="/login" className='text-white-500 hover:underline mt-4 px-1'>
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Register;