import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => (
  <footer className='bg-gray-100 text-gray-600 py-4 mt-auto'>
    <div className='container mx-auto px-4'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left mb-4 md:mb-0'>
          <h3 className='text-lg font-bold'>About Us</h3>
          <p className='mt-2'>
            Hi, The Batman owns this page and all of Gotham City and most
            importantly,Batman owns Superman.
          </p>
        </div>
        <div className='flex space-x-4'>
          <Link
            to='/about-us'
            className='text-gray-600 hover:text-gray-900 transition duration-300'
          >
            About Us
          </Link>
          <Link
            to='/sign-up'
            className='text-gray-600 hover:text-gray-900 transition duration-300'
          >
            Sign Up
          </Link>
          <Link
            to='/'
            className='text-gray-600 hover:text-gray-900 transition duration-300'
          >
            Sign In
          </Link>
          <Link
            to='/dashboard'
            className='text-gray-600 hover:text-gray-900 transition duration-300'
          >
            Dashboard
          </Link>
          <Link
            to='/contact-us'
            className='text-gray-600 hover:text-gray-900 transition duration-300'
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default AboutUs;
