import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import {useState} from 'react'
import { PostType } from '../../../Types/otherType';
import {memo} from 'react'

interface PostTypes {
    el:PostType
}

const Posts = ({el}:PostTypes) => {
    const [show, setShow] = useState<boolean>(false)
  return (
    <div className='relative cursor-pointer' onMouseOver={()=>setShow(true)} onMouseOut={()=>setShow(false)}>
      <img
        src={`${process.env.REACT_APP_URL}/${el?.postUrl}`}
        className=' h-full w-full object-cover'
      />
      <div className={`h-full w-full absolute top-0 hover:bg-[#0a0a0a4d] z-20 ${show?'flex':'hidden'} justify-center items-center gap-3 cursor-pointer`}>
        <div className='flex gap-2'>
          <BsHeartFill className='text-white h-4 w-4' />{' '}
          <p className='text-white text-sm'>{el?.likes?.length}</p>
        </div>
        <div className='flex gap-2'>
          <FaRegComment className='text-white h-4 w-4' />{' '}
          <p className='text-white text-sm'>{el?.comments?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Posts);
