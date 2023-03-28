import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to='/'>
          <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>TRAILERFLIX</h1>
        </Link>
        <div>
          <button className='text-white bg-red-600 px-6 py-2 rounded cursor-pointer'
          onClick={() => handleModal()}
          >Log Out</button>
          {showModal
            ? (<div className='w-full h-screen absolute text-center'>
              <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'>
                <div className='fixed w-full x-4 py-24 z-50'>
                  <div className='max-w-[700px] h-[400px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                      <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <h1 className='text-lg'>Are you sure you want to log out?</h1>
                      <button className='bg-red-600 px-6 py-2 mr-4 mt-6 rounded cursor-pointer' onClick={() => { value.handleSignOut(); setShowModal(false); } }>Yes</button>
                      <button className='bg-red-600 px-6 py-2 ml-4 mt-6 rounded cursor-pointer' onClick={() => setShowModal(false)}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
            : null}
          <Link to='/sign-in'>
            <button className='text-white pr-4 hidden'>Sign In</button>
          </Link>
          <Link to='/sign-up'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer hidden'>Sign Up</button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>TRAILERFLIX</h1>
      </Link>
      <div>
        <Link to='/sign-in'>
          <button className='text-white pr-4 cursor-pointer'>Sign In</button>
        </Link>
        <Link to='/sign-up'>
          <button className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
