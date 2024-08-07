import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { setAuthToken } from '../utils/Auth';
import Spinner from './Spinner'
import Navbar from './Navbar';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { getToken, setToken } from '../utils/TokenUtils';
import Cookies from 'js-cookie';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const configuration = {
      method: "post",
      url: "https://express-rho-livid.vercel.app/login",
      data: credentials,
    };

    try {
      const result = await axios(configuration);
      if(result.data.error == 0){
        const { token } = result.data; 
        const { email } = result.data; 
        Cookies.set('email', email, { expires: 7 });
        setToken(token);
        setAuthToken(token);
        navigate('/home'); 
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        setErrors({general: error.response.data.message});
      } else {
        setErrors({ general: 'An error occurred. Please try again later.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const responseMessage = async (response) => {
    try {
      const configuration = {
        method: "post",
        url: "https://express-rho-livid.vercel.app/login_google",
        data: {
          idToken: response.credential
        },
      };
      const result = await axios(configuration);
      if(result.data.error == 0){
        setToken(result.data.token);
        setAuthToken(result.data.token);
        navigate('/home');
      }
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  const handleFacebookCallback = async (response) => {
    if (response.accessToken) {
      try {
        const configuration = {
          method: "post",
          url: "https://express-rho-livid.vercel.app/login_facebook",
          data: {
            accessToken: response.accessToken
          },
        };
        const result = await axios(configuration);
        if(result.data.error == 0){
          setToken(result.data.token);
          setAuthToken(result.data.token);
          navigate('/home');
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      console.log("Facebook login failed:", response);
    }
  }

  return (
    <div>
      <Navbar />
       {loading && <Spinner />}
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8'>
                <h2 className='text-[28px] font-bold text-white mb-6 text-center'>
                    Login
                </h2>
                <form className='flex flex-col' onSubmit={handleLoginForm}>
                    <input 
                        required
                        id='email'
                        name='email'
                        type="email" 
                        placeholder='Email'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300'
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                    <br />
                    <input 
                        required
                        id='password'
                        name='password'
                        type="password" 
                        placeholder='Password'
                        className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300'
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    <br />
                    <br />
                    <button className='bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hove:to-blue-600 transition ease-in-out duration-200' type='submit'>
                        Submit
                    </button>
                    {errors.general && <p className="text-red-500 text-xs italic">{errors.general}</p>}
                    <br />

                    <FacebookLogin 
                      appId="490332947029722"
                      autoLoad={false}  
                      fields="name,email,picture"  
                      onSuccess={handleFacebookCallback}
                      icon="fa-facebook"
                      className='bg-blue-800 p-1.5 rounded-md text-white'
                    />
                    <br />
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} buttonStyle={{width: "100%"}} />

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