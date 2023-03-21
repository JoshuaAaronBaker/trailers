import React, { useState, useEffect } from 'react';

const SignUp = () => {
  return (
    <div className='w-full h-screen'>
      <img className='hidden sm:block absolute w-full h-full object-cover' src="https://assets.nflxext.com/ffe/siteui/vlv3/d049a3bd-40ee-411b-9f16-d1def798d43b/5eab75b5-7432-4fd3-b60a-1bfe89f7d786/US-en-20230313-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix" />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
      <div className='fixed w-full x-4 py-24 z-50'>
        <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
          <div className='max-w-[320px] mx-auto py-16'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>
            <form className='w-full flex flex-col py-4'>
              <input className='p-3 my-2 bg-gray-600 rounded' type="text" placeholder='Username'/>
              <input className='p-3 my-2 bg-gray-600 rounded' type="password" placeholder='Password'/>
              <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
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

export default SignUp;
