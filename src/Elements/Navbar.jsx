import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onSignIn, isSignedIn, onSignOut }) => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    onSignIn(username, password);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignUpClick = () => {
    // Check if on home screen or not
    if (location.pathname === '/') {
      handleScrollToSection('signup-section');
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <nav className='bg-blue-500 p-4 flex justify-between items-center'>
      <h1 className='text-white text-2xl'>
        <Link to='/' className='text-white mr-4'>
          ibatman
        </Link>
      </h1>
      <div className='flex items-center'>
        <Link to='/contact-us' className='text-white mr-4'>
          Contact Us
        </Link>
        <Link to='/about-us' className='text-white mr-4'>
          About Us
        </Link>
        {!isSignedIn && !showSignInForm && (
          <button className='text-white mr-4' onClick={handleSignUpClick}>
            Sign Up
          </button>
        )}
        {isSignedIn ? (
          <button className='text-white' onClick={onSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            {showSignInForm ? (
              <form onSubmit={handleSignInSubmit} className='flex items-center'>
                {error && <p className='text-red-500 mr-4'>{error}</p>}
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='border p-2 mr-2'
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='border p-2 mr-2'
                />
                <button type='submit' className='bg-white text-blue-500 p-2'>
                  Sign In
                </button>
                <button
                  type='button'
                  className='text-white ml-2'
                  onClick={() => setShowSignInForm(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                className='text-white'
                onClick={() => setShowSignInForm(true)}
              >
                Sign In
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
