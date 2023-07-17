import React, { useState } from 'react';
import YouTube from 'react-youtube';

const Player = ({ trailer, playTrailer, noTrailer, onClose }) => {

  const [isPlaying, setIsPlaying] = useState(true);
  const [invis, setInvis] = useState(false);

  const closeTrailer = () => {
    setIsPlaying(false);
    setInvis(true);
    document.body.style.overflowY = 'visible';
    onClose();
  };

  if (invis) {
    return null;
  } else {
    return (
      <div className="z-50 flex justify-center fixed inset-0">
        {isPlaying

          ? <YouTube
        videoId={trailer.key ? trailer.key : null}
            className="youtube amru absolute z-50 w-screen h-screen content-center transition-all duration-300 ease-in border-t-[65px] border-black"
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
        {isPlaying ? <div><button className='absolute z-50 bottom-12 left-4 border bg-transparent text-gray-300 border-gray-300 py-2 px-5 hover:bg-red-600 hover:border-red-600 hover:text-gray-300' onClick={() => closeTrailer()}>Close</button></div> : null}

      </div>

    );
  }
};

export default Player;
