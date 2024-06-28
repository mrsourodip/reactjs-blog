import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    onSignIn(username, password)
      .then(() => {
        navigate('/dashboard');
        setUsername(''); // Reset username field on successful sign-in
        setPassword(''); // Reset password field on successful sign-in
      })
      .catch(() => {
        setError('Invalid credentials');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='p-8 bg-white space-y-4'>
      {error && <p className='text-red-500'>{error}</p>}
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='border p-2 w-full'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border p-2 w-full'
      />
      <button type='submit' className='bg-blue-500 text-white p-2 w-full'>
        Sign In
      </button>
      <p className='text-gray-600'>
        Don't have an account? <Link to='/sign-up'>Sign Up</Link>
      </p>
    </form>
  );
};

export default SignIn;
