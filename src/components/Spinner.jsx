import React from 'react';

const Spinner = () => (
  
<div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
  <div className="spinner-border animate-spin inline-block w-8 h-8 rounded-full" role="status">
<span className="visually-hidden">
    <svg
      className="animate-spin -inline-block w-8 h-8 border-4 rounded-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
</span>
  </div>
</div>

);

export default Spinner;