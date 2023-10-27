import { Avatar, ListItem } from '@material-tailwind/react';
import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { GoVideo } from 'react-icons/go';
import { GrAddCircle } from 'react-icons/gr';
import { MdOutlineExplore } from 'react-icons/md';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthUser, Initial } from '../../Types/reducerType';
import imageurl from '../../Images/userPic.jpg';

const SmSidebar = () => {

  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);

  return (
    <div className='w-full flex sm:flex md:hidden lg:hidden justify-evenly absolute bottom-0 z-10 bg-white border-t border-gray-400'>
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
      <NavLink to='/create'>
        <ListItem className='flex justify-center'>
          <GrAddCircle className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to='/message'>
        <ListItem className='flex justify-center'>
          <PiTelegramLogoBold className='h-5 w-5' />
        </ListItem>
      </NavLink>
      <NavLink to={`/profile/${checkAuth._id}`}>
        <ListItem className='flex justify-center'>
          <Avatar
            src={checkAuth?.profile?`${process.env.REACT_APP_URL}/${checkAuth?.profile}` : imageurl }
            className='h-5 w-5'
          />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default SmSidebar;
