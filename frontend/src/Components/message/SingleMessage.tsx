import React from 'react';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useSelector } from 'react-redux';
import { memo } from 'react';

const SingleMessage = ({ el, ind }: any) => {
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);
//   calculating the date of message 
//   const date: any = new Date();
//   const postDate: any = new Date(`${el?.createdAt}`);
//   let hour = Math.floor((date - postDate) / 1000 / 3600);
//   let day = postDate.getDate();
//   let month = postDate
//     .toLocaleString('default', { month: 'long' })
//     .substring(0, 3);

  return el.sender === authUser._id ? (
    <div className='flex flex-col gap-1 box-border pr-4' key={ind}>
      <div className='text-right justify-end items-end w-content py-3'>
        <a className='py-2 px-3 text-[15px]  bg-blue-500 text-white box-content rounded-xl'>
          {el.content}
        </a>
      </div>
    </div>
  ) : (
    <div className='flex flex-col gap-1 box-border' key={ind}>
      <div className=' w-content py-3'>
        <a className='py-2 px-3 text-[15px] bg-gray-300 text-black box-content rounded-xl'>
          {el.content}
        </a>
      </div>
    </div>
  );
};

export default memo(SingleMessage);
