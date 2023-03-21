import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-un" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
