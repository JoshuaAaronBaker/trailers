import React, { useState, useContext } from 'react';
import AppContext from '../lib/AuthContext';
import Redirect from './Redirect';
import axios from 'axios';

const LogIn = () => {
  const value = useContext(AppContext);

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  };

  const handleDemoUser = () => {
    setCredentials({ username: 'demo', password: 'user' });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/auth/sign-in', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const result = response.data;
        if (result.user && result.token) {
          value.handleSignIn(result);
          window.location.hash = '';
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (value.user && window.localStorage.getItem('trailerflix-jwt')) {
    return <Redirect to=''/>;
  }

  return (
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/d049a3bd-40ee-411b-9f16-d1def798d43b/5eab75b5-7432-4fd3-b60a-1bfe89f7d786/US-en-20230313-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix" />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full x-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <form className='w-full flex flex-col py-4' onSubmit={handleSubmit}>
              <input className='p-3 my-2 bg-gray-600 rounded' required autoFocus id='username' name='username' type="text" onChange={handleChange} placeholder='Username' value={credentials.username}/>
              <input className='p-3 my-2 bg-gray-600 rounded' required autoFocus id='password' name='password' type="password" onChange={handleChange} placeholder='Password' value={credentials.password}/>
              <button type='submit' className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
              <div>
                <button type='submit' onClick={handleDemoUser}>Sign-in with Demo User</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LogIn;
