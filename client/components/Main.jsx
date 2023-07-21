import React, { useEffect, useState } from 'react';
import requests from '../requests';
import axios from 'axios';
import Youtube from 'react-youtube';

const Main = () => {
  const [media, setMedia] = useState([]);
  const [banner, setBanner] = useState();
  const [key, setKey] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [noTrailer, setNoTrailer] = useState(false);
  const [like, setLike] = useState(false);

  // const banner = media[Math.floor(Math.random() * media.length)];

  const handleTrailer = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${banner.id}?api_key=${process.env.MOVIEDB_API_KEY}&append_to_response=videos`)
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
          document.body.style.overflowY = 'hidden';
        } else if (!trailer) {
          setKey(response.data.videos.results[0]);
          setPlayTrailer(true);
        }
      });
  };

  const closeTrailer = () => {
    setPlayTrailer(false);
    document.body.style.overflowY = 'visible';
  };

  const handleNotFound = () => {
    setNoTrailer(false);
    document.body.style.overflowY = 'visible';
  };

  useEffect(() => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    axios.get(requests.popular)
      .then(response => {
        setMedia(response.data.results);
        setBanner(response.data.results[Math.floor(Math.random() * response.data.results.length)]);
      });
  }, []);

  const handleLikes = () => {
    const token = window.localStorage.getItem('trailerflix-jwt');
    if (token) {
      fetch('/auth/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': `${token}`
        },
        body: JSON.stringify(banner)
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
          console.log(result);

          for (const obj of result) {
            if (obj.favoritedItem.id === banner.id) {
              setLike(true);
            }
          }
        });
    }
  };

  return (
    <div className="w-full h-[700px] md:h-[800px] xl:h-[1000px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[700px]  md:h-[800px] xl:h-[1000px] bg-gradient-to-r from-black" />
        {playTrailer
          ? <Youtube
              videoId={key.key ? key.key : null}
            className="youtube amru absolute z-10 w-full h-full object-cover transition-all duration-300 ease-in border-t-[65px] border-black"
              containerClassName="youtube-container amru"
              opts={
                  {
                    width: '100%',
                    height: '100%',
                    title: '',
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0
                    }
                  // eslint-disable-next-line react/jsx-indent
                  }
              }
          />
          : null}
        {playTrailer ? <button className='absolute z-10 bottom-4 ml-4 border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-gray-300' onClick={() => closeTrailer()}>Close</button> : null}
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${banner?.backdrop_path}`} alt={media?.title} onLoad={() => handleFavoritesList()}/>
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{banner?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-gray-300 ease-in duration-200" onClick={() => banner ? handleTrailer() : null}>Watch Trailer</button>
            {noTrailer
              ? (<div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
                <div className='min-w-[700px] mx-auto bg-black text-white'>
                  <div className='max-w-[320px] mx-auto py-16'>
                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h1 className='text-lg'>Sorry, there are no trailers available for {banner.title}.</h1>
                    <button className='bg-red-600 px-6 py-2 mt-6 rounded cursor-pointer' onClick={() => handleNotFound()}>Ok</button>
                  </div>
                </div>
              </div>)
              : null}
            {like ? <button className="border text-gray-300 bg-green-600 py-2 px-5 ml-4">Liked</button> : <button className="border text-gray-300 py-2 px-5 ml-4" onClick={() => handleLikes()}>Add to List</button>}
          </div>
          <p className="text-gray-400 text-sm">Released:{banner?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{banner?.overview}</p>
        </div>
      </div>

    </div>
  );
};

export default Main;
