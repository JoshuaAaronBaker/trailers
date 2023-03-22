import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContext from './lib/AuthContext';
import jwtDecode from 'jwt-decode';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {

  const [user, setUser] = useState(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser({ user });
    setIsAuthorizing(false);
  }
  , []);

  const handleSignIn = () => {
    const { user, token } = result;
    window.localStorage.setItem('trailerflix-jwt', token);
    setUser({ user });
  };

  const contextValue = { user, handleSignIn };
  return (
    <AppContext.Provider value={contextValue}>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<LogIn />} />
        </Routes>
      </>
    </AppContext.Provider>
  );
}

export default App;
