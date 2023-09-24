import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSave } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { PiTelegramLogoBold } from 'react-icons/pi';

const Likeshare = () => {
  return (
    <div className='flex w-[100%] justify-between py-2 sm:px-2 md:px-0 lg:px-0'>
      <div className='flex gap-6'>
        <div>
          <AiOutlineHeart  className='w-6 h-6'/>{' '}
        </div>
        <div>
          <FaRegComment className='w-6 h-6' />
        </div>
        <div>
          <PiTelegramLogoBold className='w-6 h-6' />
        </div>
      </div>
      <div>
        <div>
          <BsSave  className='w-5 h-5'/>
        </div>
      </div>
    </div>
  );
};

export default Likeshare;
