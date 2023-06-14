import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Player from './Player';

const Media = ({ item }) => {

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
    console.log('button was clicked');
  };

  const sendToPlayer = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=videos`)
      .then(response => {
        let trailer = response.data.videos.results.find(vid => vid.name === 'Official Trailer');
        if (response.data.videos.results.length === 0) {
          return <Player trailer={response.data} playTrailer={playTrailer} noTrailer={noTrailer} />;
        } else if (trailer) {
          console.log(trailer);
          return <Player trailer={trailer} playTrailer={playTrailer} noTrailer={noTrailer}/>;
        } else if (!trailer) {
          trailer = response.data.videos.results[0];
          return <Player trailer={trailer} playTrailer={playTrailer} noTrailer={noTrailer} />;
        }
      });
    console.log('button was clicked');
  };

  if (watchClicked) {
    console.log('media:', key);
    return <Player trailer={key} playTrailer={playTrailer} noTrailer={noTrailer} />;
  } else {
    return (
      <div className='w-[160px] sm:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
        <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item.title} />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
          <div className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full'>
            <div className='flex-wrap'>
              <p>
                {(item.title !== null ? item.title : item.original_title) || (item.media_type === 'tv' && item.name !== null ? item.name : 'Title Unavailble')}
              </p>
              <div>
                <a className='border bg-gray-300 text-black border-gray-300 py-1 px-1 text-xs mt-5' onClick={() => watchTrailer()}>Watch</a>
              </div>
            </div>
          </div>
          <p>
            {like ? <FaHeart className='absolute top-4 left-4 color-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 color-gray-300' />}
          </p>
        </div>
      </div>);
  }

};
export default Media;
