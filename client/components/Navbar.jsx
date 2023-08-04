import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import SearchResults from './SearchResults';
import AppContext from '../lib/AuthContext';

const Navbar = () => {

  const [showModal, setShowModal] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [menu, setMenu] = useState(false);

  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowModal(false);
  }, []);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const [showResults, setShowResults] = useState(false);

  const handleSearch = event => {
    event.preventDefault();
    setShowResults(true);
  };

  const value = useContext(AppContext);

  if (window.localStorage.getItem('trailerflix-jwt')) {
    return (
      <div className={`flex items-center justify-between p-4 z-[100] w-full fixed top-0 ${isScrolled && 'bg-black ease-in-out duration-500'}`}>
        <a className='text-red-600 text-3xl font-bold cursor-pointer' href='#'>TRAILERFLIX</a>
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
    <div className={`flex items-center justify-between p-4 z-[100] w-full fixed top-0 ${isScrolled && 'bg-black ease-in-out duration-500'}`}>
      <a className='text-red-600 text-4xl font-bold cursor-pointer' href='#'>TRAILERFLIX</a>
      <div onClick={() => handleMenu()} className='text-white z-[100] block md:hidden'>
        {!menu ? <AiOutlineMenu size={40} /> : <AiOutlineClose size={40} />}
      </div>
      <div className='hidden md:flex items-center gap-5'>
        <form action="" className='relative mx-auto w-max' onSubmit={event => handleSearch(event)}>
          <input type="search" onChange={e => setSearchKey(e.target.value)} className='text-white cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outine-non focus:w-full focus:cursor-text focus:border-white focuse:pl-16 focus:pr-4' />
          <AiOutlineSearch size={40} className="text-white absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent px-3.5" />
        </form>
        {showResults && (
          <SearchResults
            key={searchKey}
            query={`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${searchKey}&page=1&include_adult=false`}
          />
        )}
        <a className='text-white pr-4 cursor-pointer' href='#sign-in'>Sign In</a>
        <a className='bg-red-600 px-6 py-2 rounded cursor-pointer' href='#sign-up'>Sign Up</a>
      </div>
      <div className={menu ? 'fixed left-0 top-0 w-[70%] h-full border-r-gray-900 bg-black ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <div className='flex items-center p-4'>
          <a className='text-red-600 text-4xl font-bold cursor-pointer' onClick={() => handleMenu()} href='#'>TRAILERFLIX</a>
        </div>
        <div className='p-4'>
          <a className='text-white px-4 py-2 cursor-pointer border-white' onClick={() => handleMenu()} href='#sign-in'>Sign In</a>
        </div>
        <div className='p-4'>
          <a className='bg-red-600 px-4 py-2 rounded cursor-pointer' onClick={() => handleMenu()} href='#sign-up'>Sign Up</a>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
