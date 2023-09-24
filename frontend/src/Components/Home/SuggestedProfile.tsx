import { Avatar } from '@material-tailwind/react';
import React from 'react';

const SuggestedProfile = () => {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <Avatar
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            className='h-12 w-12 border-solid border-2 border-red-400'
          />
          <div>
            <p className='text-sm'>gpi vishaksdfkads</p>
            <p className='text-xs text-[rgb(115, 115, 115)]'>kadkdfkdfk</p>
          </div>
        </div>
        <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>Switch</p>
      </div>
      <div>
        <div className='flex justify-between py-6'>
          <p className='text-sm'>Suggested for you</p>
          <p className='text-xs'>See All</p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1'>
            <Avatar
              src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
              className='h-12 w-12 border-solid border-2 border-red-400'
            />
            <div>
              <p className='text-sm'>gpi vishaksdfkads</p>
              <p className='text-xs text-[rgb(115, 115, 115)]'>kadkdfkdfk</p>
            </div>
          </div>
          <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>Follow</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedProfile;
