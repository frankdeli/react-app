import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from './Navbar';
import Spinner from './Spinner'

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [emailVerified, setEmailVerified] = useState(false); 
    const [timestampSignup, setTimestampSignup] = useState('');
    const [countLogin, setCountLogin] = useState('');
    const [timestampLogout, setTimestampLogout] = useState('');
    const [totalSignUp, setTotalSignUp] = useState('');
    const [totalLoginToday, setTotalLoginToday] = useState('');
    const [averageLogin, setAverageLogin] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const email = Cookies.get('email');

            if (email) {
                try {
                    const email = Cookies.get('email');
                    const configuration = {
                        method: "post",
                        url: "https://express-rho-livid.vercel.app/getUser",
                        data: {email: email},
                    };
                    const response = await axios(configuration);
                    setUserData(response.data.data);
                    setEmailVerified(response.data.data.is_verified_email);
                    if(response.data.data.is_verified_email){
                        const configuration2 = {
                            method: "post",
                            url: "https://express-rho-livid.vercel.app/getHome",
                            data: {email: email},
                        };
                        const response2 = await axios(configuration2);
                        if(response2.data.error == 0){
                            setTimestampSignup(new Date(response2.data.data.user_sign_up).toLocaleString())
                            setCountLogin(response2.data.data.times_logged_in)
                            setTimestampLogout(new Date(response2.data.data.user_logged_out).toLocaleString())
                            setTotalSignUp(response2.data.data.total_sign_up)
                            setTotalLoginToday(response2.data.data.total_login_today)
                            setAverageLogin(response2.data.data.averageUsers)
                        }
                    }
                } catch (err) {
                    setError('Failed to fetch user data.');
                } finally { 
                    setLoading(false)
                }
            } else {
                setError('No email or token found in cookies.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleResendVerification = async () => {
        setLoading(true);
        const email = Cookies.get('email');
        if (email) {
            try {
                // const email = Cookies.get('email');
                const configuration = {
                    method: "post",
                    url: "https://express-rho-livid.vercel.app/resend_verify_email",
                    data: {email: email},
                };
                const response = await axios(configuration);
                if(response.data.error == 0){
                    errors.resend_email = response.data.message
                }
            } catch (err) {
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            {loading && <Spinner />}
            {emailVerified ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-16">
                    <div className='flex gap-x-6 gap-y-6 justify-center'>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total user sign up</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalSignUp}</p>
                        </div>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total user active today</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{totalLoginToday}</p>
                        </div>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Average active user in 7 days</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{averageLogin}</p>
                        </div>
                    </div>
                    <div className='flex gap-x-6 gap-y-6 justify-center'>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Timestamp of the user sign up</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{timestampSignup}</p>
                        </div>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Number of times logged in</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{countLogin}</p>
                        </div>
                        <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Timestamp of the user logged out</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{timestampLogout}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p>Your email is not verified. Please verify your email.</p>
                        <button
                            onClick={handleResendVerification}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Resend Verification Email
                        </button>
                        {errors.resend_email && <p className="text-red-500 text-xs italic">{errors.resend_email}</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard