import React, { useState, useContext } from 'react';
import AppContext from '../lib/AuthContext';

const LogIn = () => {
  const value = useContext(AppContext);
  console.log(value);

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });

  };

  const handleSubmit = event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    };
    fetch('/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          value.handleSignIn(result);
          window.location.pathname = '/';
        }
      })
      .catch(err => console.error(err));
  };
  return (
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/d049a3bd-40ee-411b-9f16-d1def798d43b/5eab75b5-7432-4fd3-b60a-1bfe89f7d786/US-en-20230313-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix" />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full x-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <form className='w-full flex flex-col py-4' onSubmit={handleSubmit}>
              <input className='p-3 my-2 bg-gray-600 rounded' required autoFocus id='username' name='username' type="text" onChange={handleChange} placeholder='Username'/>
              <input className='p-3 my-2 bg-gray-600 rounded' required autoFocus id='password' name='password' type="password" onChange={handleChange} placeholder='Password' />
              <button type='submit' className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
            </form>
            <div>
              <a href="">Sign-in with Demo User</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LogIn;
LogIn.contextType = AppContext;
