import { Avatar, ListItem } from '@material-tailwind/react';
import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { GoVideo } from 'react-icons/go';
import { GrAddCircle } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

const SmSidebar = () => {
  return (
    <div className='w-full flex sm:flex md:hidden lg:hidden justify-evenly absolute bottom-0 z-10 bg-white border-t border-gray-400 '>
      <NavLink to='/'>
        <ListItem className='flex justify-center'>
          <BiSolidHome className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <MdOutlineExplore className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <GoVideo className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <GrAddCircle className='h-5 w-5' />
        </ListItem> 
      </NavLink>
      <NavLink to='/message'>
        <ListItem className='flex justify-center'>
          <PiTelegramLogoBold className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <Avatar
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            className='h-5 w-5'
          />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default SmSidebar;
