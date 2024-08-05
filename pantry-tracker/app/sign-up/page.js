// Signup.js
'use client'
import React, { useState } from 'react';
import './sign-up.css'; // Import the CSS file
import { auth } from '@/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import {firebaseConfig} from '../../firebase';
// firebase.initializeApp(firebaseConfig);


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  // let divElement = document.getElementById("divId");
  // divElement.scrollIntoView({ behavior: "smooth" });
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log('User created:', res);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div id='divId'>

    <div className={isDarkMode ? 'container dark' : 'container'}>
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Signup;
