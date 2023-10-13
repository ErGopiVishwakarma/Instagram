import { Avatar } from '@material-tailwind/react';
import React from 'react';
import imageurl from '../../Images/userimage.png';
import { useState } from 'react';

const SuggestedProfile = () => {
  let arr = new Array(5).fill(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <Avatar src={imageurl} className='h-11 w-11 ' />
          <div>
            <p className='text-sm'>gpi vishaksdfkads</p>
            <p className='text-xs text-[rgb(115, 115, 115)]'>kadkdfkdfk</p>
          </div>
        </div>
        <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>
          Switch
        </p>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between pt-5'>
          <p className='text-sm'>Suggested for you</p>
          <p className='text-xs'>See All</p>
        </div>
        {arr &&
          arr.map((el, ind) => {
            return (
              <div
                className='flex justify-between items-center relative'
                key={ind}>
                <div
                  className={`flex items-center gap-3`}
                  onMouseOver={() => setShowPopup(true)}
                  onMouseOut={() => setShowPopup(false)}>
                  <Avatar src={imageurl} className='h-11 w-11 ' />
                  <div>
                    <p className='text-sm'>gpi vishaksdfkads</p>
                    <p className='text-xs text-[rgb(115, 115, 115)]'>
                      kadkdfkd
                    </p>
                  </div>
                </div>
                <div
                  className={`h-[350px] w-[350px] border-2 border-teal-400 border-solid absolute bg-white left-2 flex-col gap-3 ${
                    showPopup ? 'flex' : 'hidden'
                  }`}
                  onMouseOver={() => setShowPopup(true)}
                  onMouseOut={() => setShowPopup(false)}>
                  <div className='flex items-center gap-3 p-4'>
                    <Avatar src={imageurl} className='h-14 w-14 ' />
                    <div>
                      <p className='text-sm'>gpi vishaksdfkads</p>
                      <p className='text-xs text-[rgb(115, 115, 115)]'>
                        kadkdfkdfk
                      </p>
                    </div>
                  </div>
                  <div className=' grid-cols-3 grid'>
                    <div className=' flex flex-col gap-2 justify-center items-center'>
                      <p className=' text-xs font-bold'>1234</p>
                      <p className=' text-xs'>gopisingh</p>
                    </div>
                    <div className=' flex flex-col gap-2 justify-center items-center'>
                      <p className=' text-xs font-bold'>2222</p>
                      <p className=' text-xs'>gopisingh</p>
                    </div>
                    <div className=' flex flex-col gap-2 justify-center items-center'>
                      <p className=' text-xs font-bold'>7</p>
                      <p className=' text-xs'>gopisingh</p>
                    </div>
                  </div>
                  <div className='grid-cols-3 grid gap-1'>
                    <img
                      src='http://localhost:8080/1696378152909_image.jpg'
                      className=' h-full w-full'
                    />
                    <img
                      src='http://localhost:8080/1696388527263_image.jpg'
                      className=' h-full w-full'
                    />
                    <img
                      src='http://localhost:8080/1696378152909_image.jpg'
                      className=' h-full w-full'
                    />
                  </div>
                  <div className='flex justify-between px-10'>
                    <button className=' px-4 py-1 bg-blue-300'>Message</button>
                    <button className=' px-4 py-1 bg-blue-300'>
                      following
                    </button>
                  </div>
                </div>
                <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>
                  Follow
                </p>
              </div>
            );
          })}
      </div>
      <div className=' pt-10'>
        <a>
          <span className=' text-xs text-[#c7c7c7] '>
            About Help Press API Jobs Privacy Terms Locations Language Meta
            Verified
          </span>
        </a>
        <p className='text-xs text-[#c7c7c7] pt-5'>
          © 2023 INSTAGRAM FROM META
        </p>
      </div>
    </div>
  );
};

export default SuggestedProfile;
