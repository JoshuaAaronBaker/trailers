import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const Player = ({ trailer, playTrailer, noTrailer }) => {

  const [isPlaying, setIsPlaying] = useState(true);

  const closeTrailer = () => {

  };
  return (
    <div className="w-screen h-screen z-50 flex text-center justify-center">
      {isPlaying

        ? <YouTube
        videoId={trailer.key ? trailer.key : null}
        className="youtube amru absolute z-50 w-full h-full"
        containerClassName="youtube-container amru"
        opts={
          {
            width: '100%',
            height: '100%',
            title: '',
            playerVars: {
              autoplay: 1,
              controls: 1,
              cc_load_policy: 0,
              fs: 1,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0
            }
            // eslint-disable-next-line react/jsx-indent
          }
        } />
        : null}
      {isPlaying ? <button className='absolute z-50 bottom-4 ml-4 border bg-gray-300 text-black border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-gray-300' onClick={() => setIsPlaying(false)}>Close</button> : null}
      {console.log('from player component:', trailer)}
      {console.log('from player component:', trailer.key)};

    </div>

  );
};

export default Player;
