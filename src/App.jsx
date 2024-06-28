import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Navbar from './Elements/Navbar';
import Hero from './Elements/Hero';
import SignUp from './Elements/SignUp';
import SignIn from './Elements/SignIn';
import SignInModal from './Elements/SignInModal';
import BlogDashboard from './Elements/BlogDashboard';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import AboutUs from './Elements/AboutUs';
import ContactUs from './Elements/ContactUs';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = (username) => {
    setModalMessage(
      `You have successfully signed up with username: ${username}`
    );
    setShowModal(true);
  };

  const handleSignIn = async (username, password) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/users?username=${username}`
      );
      const user = response.data[0];
      if (user && (await bcrypt.compare(password, user.password))) {
        setUsername(username);
        setIsSignedIn(true);
        setModalMessage('Signed in!');
        setShowModal(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Error signing in. Please try again.');
    }
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUsername('');
  };

  const location = useLocation();
  const isAboutUsPage = location.pathname === '/about-us';

  return (
    <div className='relative min-h-screen flex flex-col'>
      <Navbar
        onSignIn={handleSignIn}
        isSignedIn={isSignedIn}
        onSignOut={handleSignOut}
      />
      <div className='flex-grow'>
        <Routes>
          <Route
            path='/'
            element={
              isSignedIn ? (
                <Navigate to='/dashboard' />
              ) : (
                <>
                  <Hero />
                  <SignUp onSignUp={handleSignUp} />
                </>
              )
            }
          />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/dashboard'
            element={
              isSignedIn ? (
                <BlogDashboard username={username} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />
        </Routes>
      </div>
      {showModal && (
        <SignInModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
      {!isAboutUsPage && <AboutUs />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
