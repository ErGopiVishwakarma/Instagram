import { Avatar } from '@material-tailwind/react';
import React from 'react';
import imageurl from '../../Images/userPic.jpg';
import { useState } from 'react';
import HoverPopupForSuggestProfile from './HoverPopupForSuggestProfile';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import { NavLink } from 'react-router-dom';

const SuggestedProfile = () => {
  const suggestedUser = useSelector(
    (store: Initial) => store.user as AuthUser[],
  );
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className='w-full '>
      <div className='flex justify-between items-center'>
        <NavLink to={`/profile/${authUser._id}`}>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Avatar
              src={authUser?.profile ? authUser?.profile : imageurl}
              className='h-11 w-11 '
            />
            <div>
              <p className='text-sm'>{authUser?.name}</p>
              <p className='text-xs text-[rgb(115, 115, 115)]'>
                {authUser?.username}
              </p>
            </div>
          </div>
        </NavLink>
        <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>
          Switch
        </p>
      </div>
      <div className='flex flex-col gap-5 relative'>
        <div className='flex justify-between pt-5'>
          <p className='text-sm'>Suggested for you</p>
          <p className='text-xs'>See All</p>
        </div>
        {suggestedUser &&
          suggestedUser.map((el, ind) => {
            return (
              <HoverPopupForSuggestProfile
                el={el as AuthUser}
                ind={ind}
                key={ind}
              />
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
