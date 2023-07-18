import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../lib/AuthContext';

const Navbar = () => {

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
  }, []);

  const handleModal = () => {
    setShowModal(true);
  };

  const value = useContext(AppContext);

  if (window.localStorage.getItem('trailerflix-jwt')) {
    return (
      <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
        <a className='text-red-600 text-4xl font-bold cursor-pointer' href='#'>TRAILERFLIX</a>
        <div>
          <button className='text-white bg-red-600 px-6 py-2 rounded cursor-pointer'
          onClick={() => handleModal()}
          >Log Out</button>
          {showModal
            ? (<div className="fixed inset-0 bg-black/60 flex justify-center items-center">
              <div className="min-w-[600px] mx-auto bg-black text-white text-center">
                <div className='max-w-[320px] mx-auto py-16'>
                  <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h1 className='text-lg'>Are you sure you want to log out?</h1>
                  <button className='bg-red-600 px-6 py-2 mr-4 mt-6 rounded cursor-pointer' onClick={() => { value.handleSignOut(); setShowModal(false); }}>Yes</button>
                  <button className='bg-red-600 px-6 py-2 ml-4 mt-6 rounded cursor-pointer' onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </div>)
            : null}
          <a className='text-white pr-4 hidden' href='#sign-in'>Sign In</a>
          <a className='bg-red-600 px-6 py-2 rounded cursor-pointer hidden' href='#sign-up'>Sign Up</a>
        </div>
      </div>
    );
  }
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <a className='text-red-600 text-4xl font-bold cursor-pointer' href='#'>TRAILERFLIX</a>
      <div>
        <a className='text-white pr-4 cursor-pointer' href='#sign-in'>Sign In</a>
        <a className='bg-red-600 px-6 py-2 rounded cursor-pointer' href='#sign-up'>Sign Up</a>
      </div>
    </div>
  );
};

export default Navbar;
