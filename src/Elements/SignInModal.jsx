import React from 'react';

const SignInModal = ({ message, onClose }) => (
  <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center'>
    <div className='bg-white p-8 rounded shadow-lg text-center'>
      <p className='mb-4'>{message}</p>
      <button onClick={onClose} className='bg-blue-500 text-white p-2'>
        OK
      </button>
    </div>
  </div>
);

export default SignInModal;
