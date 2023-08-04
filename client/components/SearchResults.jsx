import React, { useState } from 'react';
import Row from './Row';

const SearchResults = ({ query }) => {
  console.log(query);
  return (
    <div className='bg-black fixed w-full h-[700px] md:h-[800px] inset-0 mt-[64px] md:mt-[80px]'>
      {/* mt-[64px] (or mt-[80px] for md breakpoint) adds space for the navbar */}
      <Row title='Search Results' fetchURL={query} />
    </div>
  );
};

export default SearchResults;
