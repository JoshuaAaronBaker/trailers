import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Media from './Media';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


const Row = ({ title, fetchURL, rowId, videos }) => {

  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMedia(response.data.results)
    })
  }, [fetchURL]);

  const validMedia = [];

  for (let i = 0; i < media.length; i++) {
    if (media[i].backdrop_path !== null) {
      validMedia.push(media[i])
    } else {
      media.splice(i, 1);
    }
  }

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  return (

    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>

        <MdChevronLeft className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}
          onClick={slideLeft}
        />
        <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative scrollbar-hide'>
          {validMedia.map((item, id) => {
            return <Media key={id} item={item} />
          })}
        </div>
        <MdChevronRight className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
}

export default Row
