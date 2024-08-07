import Cookies from 'js-cookie';

// Set token in cookie
export const setToken = (token) => {
  Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
};

// Get token from cookie
export const getToken = () => {
  return Cookies.get('token');
};

// Remove token from cookie
export const removeToken = () => {
  Cookies.remove('token');
};
