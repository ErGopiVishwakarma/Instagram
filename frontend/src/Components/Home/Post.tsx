import { Avatar } from '@material-tailwind/react';
import React from 'react';

const Post = () => {
  return (
    <div className='w-[100%]'  style={{fontFamily:'Poppins, sans-serif'}}>
      <div className='flex items-center justify-between pb-3'>
        <div className='flex gap-2 items-center'>
          <Avatar
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            className='h-10 w-10 border-solid border-2 border-red-400'
          />
          <p className='text-sm'>gopi vishwakarma</p>
          <p className='text-sm'>2day</p>
        </div>
        <p className='text-3xl'>...</p>
      </div>
      <div className='w-[100%]'>
        <img
          src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
          className='w-[100%] max-h-[400px] min-h-[350px]'
        />
      </div>
    </div>
  );
};

export default Post;
