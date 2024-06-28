import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import SignInModal from './SignInModal';

const SignUp = ({ onSignUp }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !age) {
      setError('All fields are required');
      return;
    }
    const username = `${firstName}_${lastName}`;
    const password = Math.random().toString(36).substring(2, 7);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    try {
      await axios.post('http://localhost:3002/users', {
        id: userId,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        age,
      });
      setModalMessage(`Your username: ${username}\nYour password: ${password}`);
      setShowModal(true);
      onSignUp(username);
      setFirstName('');
      setLastName('');
      setAge('');
    } catch (err) {
      console.error(err);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <section id='signup-section' className='p-8 bg-white mt-8'>
      <h2 className='text-2xl mb-4'>Sign Up</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className='border p-2 w-full'
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className='border p-2 w-full'
        />
        <input
          type='number'
          placeholder='Age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className='border p-2 w-full'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 w-full rounded-md'
        >
          Sign Up
        </button>
      </form>
      {showModal && (
        <SignInModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default SignUp;
