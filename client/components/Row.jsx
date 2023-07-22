import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Media from './Media';
import AppContext from '../lib/AuthContext';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Row = ({ title, fetchURL, rowId, videos }) => {

  const [media, setMedia] = useState([]);

  const contextValue = useContext(AppContext);
  const token = window.localStorage.getItem('trailerflix-jwt');

  useEffect(() => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token && fetchURL === '/auth/get-likes') {
      fetch(fetchURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`
        }
      })
        .then(res => res.json())
        .then(response => {
          const flattenedArray = response.map(item => item.favoritedItem);
          setMedia(flattenedArray);
        });
    } else if (fetchURL !== '/auth/get-likes') {
      axios.get(fetchURL)
        .then(response => {
          setMedia(response.data.results);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [fetchURL]);

  const validMedia = [];

  for (let i = 0; i < media.length; i++) {
    if (media[i].backdrop_path !== null) {
      validMedia.push(media[i]);
    } else {
      media.splice(i, 1);
    }
  }

  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleSlider = direction => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }

  };

  return (

    <>
      <h2 className='text-white font-bold md:text-2xl p-4 mt-8 mb-3 ml-4'>{title}</h2>
      <div className='relative flex items-center group mb-10 ml-4'>

        <MdChevronLeft className={`text-white bg-transparent left-0 absolute hover:opacity-100 cursor-pointer z-10 hidden invisible lg:visible md:visible group-hover:block ${!isMoved && ' lg:invisible md:invisible'}`} size={60}
          onClick={() => handleSlider('left')}
        />
        <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative scrollbar-hide overflow-y-hidden' ref={rowRef}>
          {validMedia.map((item, id) => {
            return <Media key={id} item={item} rowId={rowId}/>;
          })}
        </div>
        <MdChevronRight className='text-white bg-transparent right-0 absolute hover:opacity-100 cursor-pointer z-10 hidden invisible lg:visible md:visible group-hover:block' size={60}
          onClick={() => handleSlider('right')}
        />
      </div>
    </>
  );
};

export default Row;
