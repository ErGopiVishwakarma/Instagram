import React from 'react';
import { BsEmojiFrown } from 'react-icons/bs';

const Comment = () => {
  return (
    <div
      className='flex flex-col gap-1 text-[13px] px-2'
      style={{ fontFamily: 'Poppins, sans-serif' }}>
      <p>gopi@aldka;dsf.tech follow us for more</p>
      <p>view all 10 comments</p>
      <p>
        <span className=' font-bold text-s'>shri_ram_bhakt 0000</span>somethin
        has commented
      </p>
      <p>akdskaflk_ddkkk 00000</p>
      <div className='relative hidden md:block lg:block'>
        <input
          className='w-[100%] h-10 align-middle flex focus:outline-none border-solid border-b-[1px] border-gray-600'
          placeholder='add your comments'
        />
        <BsEmojiFrown className='absolute right-0 top-[10px]' />
      </div>
    </div>
  );
};

export default Comment;
