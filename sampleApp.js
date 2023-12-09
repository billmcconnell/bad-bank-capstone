

// App.js
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import './App.css';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
// ... other components

// Load environment variables
require('dotenv').config();

const firebaseConfig = {
  // ... (load from environment variables)
};

const baseUrl = '';

const [status, setStatus] = useState 


// Firebase initialization
initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);

// initialize a user using async function 
let initializeUser = async (username, password) => { 
  try {
    const res = await fetch(`${baseUrl}/account/login${email}/${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const tempUser = await res.json();
    console.log("tempUser: ", tempUser);
    setUser(tempUser);
    setLoggedIn(true);
    setStatus('success');
  } catch (error) {
    setStatus('error');
    console.log(error);
    return "login failed"; 
  }
}



  useEffect(() => {
    // Initialize user data from state or Firebase
    const checkAuth = async () => {
      const userCredential = await auth.currentUser;
      if (userCredential) {
        // Get user data
      }
    };
    checkAuth();
  }, []);

  // ... other functions and routes

  return (
    <HashRouter basename="/">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />
        {/* Other routes with authentication checks */}
      </Routes>
    </HashRouter>
  );
}

export default App;
