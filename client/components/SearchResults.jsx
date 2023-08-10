import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Media from './Media';
import AppContext from '../lib/AuthContext';

const SearchResults = ({ query }) => {

  const contextValue = useContext(AppContext);

  const [results, setResults] = useState([]);
  const validMedia = [];

  useEffect(() => {
    axios.get(query).then(response => {
      const media = response.data.results;
      for (let i = 0; i < media.length; i++) {
        if (media[i].backdrop_path !== null) {
          validMedia.push(media[i]);
        } else {
          media.splice(i, 1);
        }
      }
      setResults(validMedia);
    });
  }, [query]);

  return (
    <div className='w-full h-screen inset-0 fixed bg-black overflow-auto' >
      <h2 className='text-white font-bold md:text-xl p-4'>Search Results</h2>
      <div className='absolute flex flex-wrap items-center justify-center pt-20'>
        {results.map((item, id) => {
          return <Media key={id} item={item} rowId='1' handleNewLikes={contextValue.handleNewLikes} likedItems={contextValue.likedItems}/>;
        })}
      </div>

    </div>
  );
};

export default SearchResults;
