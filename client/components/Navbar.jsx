import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/AuthContext';

const Navbar = () => {

  if (window.localStorage.getItem('trailerflix-jwt')) {
    return (
      <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
        <Link to='/'>
          <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>TRAILERFLIX</h1>
        </Link>
        <div>
          <button className='text-white pr-4'>Account</button>
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
        <button className='text-white pr-4 cursor-pointer invisible'>Account</button>
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
Navbar.contextType = AppContext;
