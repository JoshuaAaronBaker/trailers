/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Player from './Player';
import AppContext from '../lib/AuthContext';

const Media = ({ item, rowId, handleNewLikes, likedItems }) => {
  const contextValue = useContext(AppContext);

  const [watchClicked, setWatchClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [key, setKey] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);
  const [noTrailer, setNoTrailer] = useState(false);
  const [likeModal, setLikeModal] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token && contextValue?.user?.user) {
      axios.get('/auth/get-likes', {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      })
        .then(response => {
          const result = response.data;
          const isItemLiked = result.some(obj => obj.favoritedItem.id === item.id);
          setIsLiked(isItemLiked);
        })
        .catch(error => {
          console.error('Fetch failed during GET', error);
        });
    }
  });

  const handleTrailerClick = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=videos`)
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

  const handleLikes = () => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token && contextValue?.user?.user) {
      axios.post('/auth/likes', item, {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        }
      })
        .then(response => {
          handleNewLikes(item);
          setIsLiked(true);
        })
        .catch(error => {
          console.error('Fetch failed during POST', error);
        });
    } else {
      window.alert('You need to be signed in to save a movie!');
    }
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const handleUnlike = () => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token && contextValue?.user?.user) {
      axios.delete('/auth/unlike', {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': token
        },
        data: { id: item.id }
      })
        .then(response => {
          setIsLiked(false);
          handleNewLikes([]);
        })
        .catch(error => {
          console.error('Fetch failed during DELETE', error);
        });
    }
  };

  const { title, original_title, media_type, name } = item;

  return (
    <>
      {watchClicked && (
        <Player trailer={key} playTrailer={playTrailer} noTrailer={noTrailer} onClose={() => setWatchClicked(false)} />
      )}
      <div className="w-[200px] sm:w-[300px] lg:w-[400px] inline-block cursor-pointer relative transition duration-200 ease-out p-2 lg:mr-1 sm:mr-2 md:hover:scale-105">
        <img
          className="w-full h-auto block rounded-sm object-cover md:rounded"
          src={`https://image.tmdb.org/t/p/w500/${rowId === '1' || rowId === '4' ? item?.poster_path : item?.backdrop_path}`}
          alt={title || original_title || name || media_type || 'Title Unavailable'}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 ease-in duration-300 text-white">
          <div className="white-space-normal text-xs md:text-sm lg:text-base font-bold flex justify-center items-center text-center h-full">
            <div className="flex-wrap">
              <p className="mb-2">
                {truncateString(title || original_title || name || media_type || 'Title Unavailable', 30)}
              </p>
              <div>
                <a
                  className="border bg-gray-300 text-black border-gray-300 py-1 px-1 text-xs lg:text-base hover:bg-red-600 hover:border-red-600 hover:text-gray-300 ease-in duration-250"
                  onClick={handleTrailerClick}
                >
                  Watch
                </a>
              </div>
            </div>
          </div>
          <p>
            {isLiked && contextValue.user?.user
              ? (
                <FaHeart className="absolute top-4 left-4 text-red-600" onClick={() => handleUnlike()}/>
                )
              : (
                <FaRegHeart className="absolute top-4 left-4 hover:text-red-600 ease-in duration-100" onClick={contextValue.user?.user ? () => handleLikes() : () => setLikeModal(true)}/>
                )}
          </p>
        </div>
      </div>
      {likeModal
        ? (<div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
          <div className='min-w-[700px] mx-auto bg-black text-white text-center'>
            <div className='max-w-[350px] mx-auto py-16'>
              <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className='text-lg'>Sorry you need to be signed into an account</p>
              <p className='text-lg'>in order to like a movie.</p>
              <button className='bg-red-600 px-6 py-2 mt-6 rounded cursor-pointer' onClick={() => setLikeModal(false)}>Ok</button>
            </div>
          </div>
        </div>)
        : null}
    </>
  );
};

export default Media;
