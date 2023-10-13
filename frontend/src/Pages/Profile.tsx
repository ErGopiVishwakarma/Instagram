import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderFile from '../Components/profile/HeaderFile';
import LgSidebar from '../Components/sidebar/LgSidebar';
import MdSidebar from '../Components/sidebar/MdSidebar';
import ProfilePost from '../Components/profile/ProfilePost';
import { BsPlus } from 'react-icons/bs';

export default function Profile() {
  return (
    <div className='w-full flex'>
      {/* left part  */}
      <div>
        <div className='hidden md:hidden lg:block z-50'>
          <LgSidebar />
        </div>
        <div className='hidden lg:hidden md:block'>
          <MdSidebar />
        </div>
      </div>
      {/* right part  */}
      <div className='w-full h-[100vh] px-[87px] pt-10 pb-12 overflow-y-auto '>
        {/* profile part  */}
        <div className='pl-[70px]'>
          <HeaderFile />
        </div>
        {/* add new + sign part  */}
        <div className='flex p-10 w-full'>
          <div className='flex flex-col gap-3 items-center cursor-pointer'>
            <div className='h-[80px] w-[80px] border-solid border-[1px] border-gray-400 rounded-full flex justify-center items-center bg-[#f0eeee]'>
              <BsPlus className='h-16 w-16 text-[#b7b6b6]' />
            </div>
            <p className='text-xs'>New</p>
          </div>
        </div>
        {/* post part  */}
        <div>
          <ProfilePost />
        </div>
      </div>
    </div>
  );
}

{
  /* <div className='bg-gray-background'>
  <button className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-110'>
    Animated Button
  </button>
  <div
    className='w-16 h-16 border-8 border-blue-500 border-solid rounded-full animate-spin'
    style={{
      borderWidth: '10px',
      width: '50px',
      height: '50px',
      borderImage: 'conic-gradient(from 0deg, #3498db, #e74c3c, #2ecc71)',
    }}></div>

  <div className='mx-auto max-w-screen-lg'></div>
</div>; */
}
