import React, { useEffect, useState } from 'react';
import requests from '../requests';
import axios from 'axios';
import Youtube from 'react-youtube';

const Main = () => {
  const [media, setMedia] = useState([]);

  const banner = media[Math.floor(Math.random() * media.length)];

  useEffect(() => {
    axios.get(requests.popular)
      .then((response) => {
        setMedia(response.data.results);
      })
  }, []);

  // const fetchVideos = () => {
  //   axios.get(`https://api.themoviedb.org/3/movie/${banner.id}/videos?api_key=${requests.api_key}&language=en-US`)
  //     .then((response) => {
  //       const movie = response.data.results
  //       console.log(banner)
  //       console.log(movie);
  //       const trailer = movie.find(video => video.name === 'Official Trailer')
  //       console.log(trailer.key);
  //       return trailer.key;

  //     })
  // }

  // console.log(fetchVideos());

  // let key;

  // useRef(() => {
  //   key = fetchVideos();
  // })

  // console.log(key)

  // function fetchVideos(videos) {
  //   axios.get(`https://api.themoviedb.org/3/movie/${banner.id}/videos?api_key=${requests.api_key}&language=en-US`)
  //   .then((response) => {
  //      videos = response.data.results;
  //      console.log(videos);
  //   });
  // }

  // let videos;

  // function renderPlayer() {
  //   const trailer = videos.find(vid => vid.name === 'Official Trailer')
  //   console.log(trailer);
  // }

  return (
    <div className="w-full h-[700px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[700px] bg-gradient-to-r from-black"></div>
        {/* <Youtube
                                        videoId='M25zXBIUVr0'
                                        className={"youtube amru absolute z-10"}
                                        containerClassName={"youtube-container amru"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    /> */}
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original${banner?.backdrop_path}`} alt={media?.title} />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{banner?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-gray-300">Watch Trailer</button>
            <button className="border text-gray-300 py-2 px-5 ml-4">Add to List</button>
          </div>
          <p className="text-gray-400 text-sm">Released:{banner?.release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{banner?.overview}</p>
        </div>
      </div>

    </div>
  );
};

export default Main;
