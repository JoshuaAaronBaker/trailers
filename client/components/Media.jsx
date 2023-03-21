import React from 'react';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const Media = ({ item }) => {

  const [like, setLike] = useState(false);

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
              <button className='border bg-gray-300 text-black border-gray-300 py-1 px-1 text-xs mt-5'>Watch</button>
            </div>
          </div>
        </div>
        <p>
          {like ? <FaHeart className='absolute top-4 left-4 color-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 color-gray-300' />}
        </p>
      </div>
    </div>
  );
}

export default Media;
