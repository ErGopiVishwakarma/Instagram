import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  Avatar,
} from '@material-tailwind/react';
import { BsSearch, BsInstagram } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { FiMenu } from 'react-icons/fi'
import { BiSolidHome, BiSolidShoppingBagAlt } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const IconSidebar = () => {
  return (
    <Card className='h-[calc(100vh)] max-w-[4.5rem] rounded-none py-4 px-2 border-solid border-1 border-r border-gray-400 box-border align-middle'>
      <div className='mb-2 p-4 flex justify-center'>
        <Typography variant='h5' color='blue-gray'>
          <BsInstagram className='h-6 w-6' />
        </Typography>
      </div>
      <List className='box-border min-w-0 w-full h-full p-0 align-middle gap-2.5 pt-2'>
        <NavLink to='/'>
          <ListItem className='flex justify-center'>
            <BiSolidHome className='h-6 w-6' />
          </ListItem>
        </NavLink>
        <ListItem className='flex justify-center'>
          <BsSearch className='h-6 w-6' />
        </ListItem>
        <ListItem className='flex justify-center'>
          <MdOutlineExplore className='h-6 w-6' />
        </ListItem>
        <ListItem className='flex justify-center'>
          <GoVideo className='h-6 w-6' />
        </ListItem>
        <NavLink to='/message'>
          <ListItem className='flex justify-center'>
            <PiTelegramLogoBold className='h-6 w-6' />
          </ListItem>
        </NavLink>
        <ListItem className='flex justify-center'>
          <AiOutlineHeart className='h-6 w-6' />
        </ListItem>
        <ListItem className='flex justify-center'>
          <GrAddCircle className='h-6 w-6' />
        </ListItem>
        <ListItem className='flex justify-center'>
          <Avatar
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            className='h-6 w-6'
          />
        </ListItem>
        <ListItem className='flex justify-center '>
          <FiMenu className='h-6 w-6' />
        </ListItem>
      </List>
    </Card>
  );
};

export default IconSidebar;
