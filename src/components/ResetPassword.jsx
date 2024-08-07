import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import Spinner from './Spinner'

const EditForm = () => {
    const [userData, setUserData] = useState({ oldPassword: '', newPassword: '', newConfirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = (password, confirmPassword, newConfirmPassword) => {
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
        if (newConfirmPassword && confirmPassword && confirmPassword !== newConfirmPassword) {
            errors.newConfirmPassword = "Passwords do not match.";
        }

        // Confirm password validation
        if (confirmPassword && !patterns.lower.test(confirmPassword)) errors.confirmPassword = "Must contain at least one lowercase letter.";
        if (confirmPassword && !patterns.upper.test(confirmPassword)) errors.confirmPassword = "Must contain at least one uppercase letter.";
        if (confirmPassword && !patterns.digit.test(confirmPassword)) errors.confirmPassword = "Must contain at least one digit.";
        if (confirmPassword && !patterns.special.test(confirmPassword)) errors.confirmPassword = "Must contain at least one special character.";
        if (confirmPassword && confirmPassword.length < 8) errors.confirmPassword = "Must be at least 8 characters long.";

        // Confirm password validation
        if (newConfirmPassword && !patterns.lower.test(newConfirmPassword)) errors.newConfirmPassword = "Must contain at least one lowercase letter.";
        if (newConfirmPassword && !patterns.upper.test(newConfirmPassword)) errors.newConfirmPassword = "Must contain at least one uppercase letter.";
        if (newConfirmPassword && !patterns.digit.test(newConfirmPassword)) errors.newConfirmPassword = "Must contain at least one digit.";
        if (newConfirmPassword && !patterns.special.test(newConfirmPassword)) errors.newConfirmPassword = "Must contain at least one special character.";
        if (newConfirmPassword && newConfirmPassword.length < 8) errors.newConfirmPassword = "Must be at least 8 characters long.";

        return errors;
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    const { oldPassword, newPassword, newConfirmPassword } = { ...userData, [name]: value };
    const validationErrors = validateForm(oldPassword, newPassword, newConfirmPassword);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const email = Cookies.get('email');
        userData.email = email
        const configuration = {
            method: "post",
            url: "https://react-app-server-six.vercel.app/resetPassword",
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
                <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                    <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={userData.oldPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={userData.newPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                </div>

                <div>
                    <label htmlFor="newConfirmPassword" className="block text-sm font-medium text-gray-700">New Confirm Password</label>
                    <input
                    id="newConfirmPassword"
                    name="newConfirmPassword"
                    type="password"
                    value={userData.newConfirmPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.newConfirmPassword && <p className="text-red-500 text-xs italic">{errors.newConfirmPassword}</p>}
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