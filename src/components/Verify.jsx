import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get('email');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const configuration = {
            method: "post",
            url: "http://localhost:5000/api/v1/verify_email",
            data: {email: email},
        };
        const response = await axios(configuration);
        console.log(response)
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Verification failed');
      }
    };

    verifyEmail();
  }, [email]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
