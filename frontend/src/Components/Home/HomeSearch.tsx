import { Avatar, Input, ListItem } from '@material-tailwind/react';
import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import { GrAddCircle } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

const HomeSearch = () => {
  return (
    <div className='w-full flex sm:flex md:hidden lg:hidden justify-evenly absolute top-0 z-10 items-center border-b border-gray-400 bg-white'>
      <NavLink to='/'>
        <ListItem className='flex justify-center'>
          <BsInstagram className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <div className='w-full'>
        <input className='w-full h-8 pl-3 bg-gray-300' placeholder='search and press enter'  />
      </div>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <GoVideo className='h-5 w-5' />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default HomeSearch;
