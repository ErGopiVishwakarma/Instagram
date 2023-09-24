import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';

const NotSelectPage = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className='flex flex-col items-center gap-2'>
          <div className='border-2 border-solid border-black w-24 h-24 bg-white rounded-[50%] flex justify-center items-center'>
            <AiOutlineMessage className=' h-12 w-12' />
          </div>
          <p className=' text-xl'>Your Messages</p>
          <p className='text-sm'>Send private photos and messages to a friend or group</p>
          <button className='px-4 py-2 text-sm text-white bg-blue-400 rounded-lg'>Send message</button>
    </div>
    </div>
  );
};

export default NotSelectPage;
