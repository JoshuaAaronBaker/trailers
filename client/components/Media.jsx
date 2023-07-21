import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Player from './Player';
import AppContext from '../lib/AuthContext';

const Media = ({ item, rowId }) => {

  const contextValue = useContext(AppContext);

  const [watchClicked, setWatchClicked] = useState(false);
  const [like, setLike] = useState(false);
  const [key, setKey] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);
  const [noTrailer, setNoTrailer] = useState(false);

  const watchTrailer = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=videos`)
      .then(response => {
        const trailer = response.data.videos.results.find(vid => vid.name === 'Official Trailer');
        if (response.data.videos.results.length === 0) {
          setKey('');
          setPlayTrailer(false);
          setNoTrailer(true);
          document.body.style.overflowY = 'hidden';
        } else if (trailer) {
          setKey(trailer);
          setPlayTrailer(true);
        } else if (!trailer) {
          setKey(response.data.videos.results[0]);
          setPlayTrailer(true);
        }
      });
    setWatchClicked(true);
    document.body.style.overflowY = 'hidden';
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const handleLikes = () => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token) {
      fetch('/auth/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`
        },
        body: JSON.stringify(item)
      })
        .then(res => res.json())
        .then(result => {
          setLike(true);
        })
        .catch(err => console.error('Fetch failed during POST', err));
    } else return window.alert('You need to be signed in to save a movie!');
  };

  const handleFavoritesList = () => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token) {
      fetch('/auth/get-likes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`
        }
      })
        .then(res => res.json())
        .then(result => {

          for (const obj of result) {
            if (obj.favoritedItem.id === item.id) {
              setLike(true);
            }
          }
        });
    }
  };

  return (
    <>
      {watchClicked ? <Player trailer={key} playTrailer={playTrailer} noTrailer={noTrailer} onClose={() => setWatchClicked(false)}/> : null}
      <div className='w-[200px] sm:w-[300px] lg:w-[400px] inline-block cursor-pointer relative p-2 lg:mr-8 sm:mr-5'>
        <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${rowId === '1' || rowId === '4' ? item?.poster_path : item?.backdrop_path}`} alt={item.title} onLoad={() => handleFavoritesList()} />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 ease-in duration-300 text-white'>
          <div className='white-space-normal text-xs md:text-sm lg:text-base font-bold flex justify-center items-center text-center h-full'>
            <div className='flex-wrap'>
              <p className='mb-2'>
                {(item.title !== null ? truncateString(item.title, 35) : truncateString(item.original_title, 35)) || (item.media_type === 'tv' && item.name !== null ? item.name : 'Title Unavailble')}
              </p>
              <div>
                <a className='border bg-gray-300 text-black border-gray-300 py-1 px-1 text-xs lg:text-base hover:bg-red-600 hover:border-red-600 hover:text-gray-300 ease-in duration-250' onClick={() => watchTrailer()}>Watch</a>
              </div>
            </div>
          </div>
          <p onClick={() => handleLikes()}>
            {like ? <FaHeart className='absolute top-4 left-4 text-red-600'/> : <FaRegHeart className='absolute top-4 left-4 hover:text-red-600 ease-in duration-100' />}
          </p>
        </div>
      </div>
    </>
  );

};
export default Media;
