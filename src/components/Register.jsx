import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Spinner from './Spinner'
import Navbar from './Navbar';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { getToken, setToken } from '../utils/TokenUtils';
import { setAuthToken } from '../utils/Auth';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' , confirmPassword: ''});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = (password, confirmPassword) => {
        const errors = {};
        const patterns = {
            lower: /[a-z]/,
            upper: /[A-Z]/,
            digit: /[0-9]/,
            special: /[!@#$%^&*(),.?":{}|<>]/,
        };

        // Validate password
        if (password && !patterns.lower.test(password)) errors.password = "Must contain at least one lowercase letter.";
        if (password && !patterns.upper.test(password)) errors.password = "Must contain at least one uppercase letter.";
        if (password && !patterns.digit.test(password)) errors.password = "Must contain at least one digit.";
        if (password && !patterns.special.test(password)) errors.password = "Must contain at least one special character.";
        if (password && password.length < 8) errors.password = "Must be at least 8 characters long.";

        // Validate confirm password
        if (confirmPassword && password && password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        // Confirm password validation
        if (confirmPassword && !patterns.lower.test(confirmPassword)) errors.confirmPassword = "Must contain at least one lowercase letter.";
        if (confirmPassword && !patterns.upper.test(confirmPassword)) errors.confirmPassword = "Must contain at least one uppercase letter.";
        if (confirmPassword && !patterns.digit.test(confirmPassword)) errors.confirmPassword = "Must contain at least one digit.";
        if (confirmPassword && !patterns.special.test(confirmPassword)) errors.confirmPassword = "Must contain at least one special character.";
        if (confirmPassword && confirmPassword.length < 8) errors.confirmPassword = "Must be at least 8 characters long.";

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });

        const { password, confirmPassword } = { ...credentials, [name]: value };
        const validationErrors = validateForm(password, confirmPassword);
        setErrors(validationErrors);
    };

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        
        const configuration = {
            method: "post",
            url: "https://react-app-server-six.vercel.app/register",
            data: credentials,
        };

        try {
            const result = await axios(configuration);
            if(result.data.error == 0){
                navigate('/login'); 
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                setErrors(error.response.data);
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
            url: "https://react-app-server-six.vercel.app/login_google",
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
              url: "https://react-app-server-six.vercel.app/login_facebook",
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
                        Register
                    </h2>
                    <form className='flex flex-col' onSubmit={handleRegisterForm}>
                        <input 
                            required
                            id='username'
                            name='username'
                            type="text" 
                            placeholder='Username'
                            className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300'
                            value={credentials.username}
                            onChange={handleInputChange}
                        />
                        <br />
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
                            className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300'
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        <br />
                        <input 
                            required
                            id='confirmPassword'
                            name='confirmPassword'
                            type="password" 
                            placeholder='Password'
                            className='bg-gray-700 text-white border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none transition ease-in-out diration-150 placeholder-gray-300'
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
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