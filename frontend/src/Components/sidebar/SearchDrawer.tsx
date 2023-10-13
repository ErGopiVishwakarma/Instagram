import React, { ReactNode } from 'react';
import { Drawer } from '@material-tailwind/react';
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
import { FiMenu } from 'react-icons/fi';
import { BiSolidHome, BiSolidShoppingBagAlt } from 'react-icons/bi';

interface Children {
  children: ReactNode;
}

export default function SearchDrawer({ children }: Children) {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <span onClick={openDrawer}>{children}</span>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className={`flex transition-all relative ${
          open
            ? 'duration-1000 ease-in-out transform translate-x-0'
            : 'duration-600 ease-in-out transform -translate-x-full'
        }`}
        size={450}>
        <Card className='h-[calc(100vh)] max-w-[4.5rem] rounded-none py-4 px-2 border-solid border-1 border-r border-gray-500 box-border align-middle relative z-40'>
          <div className='mb-2 p-4 flex justify-center'>
            <Typography variant='h5' color='blue-gray'>
              <BsInstagram className='h-6 w-6' />
            </Typography>
          </div>
          <List className='box-border min-w-0 w-full h-full p-0 align-middle gap-1 relative'>
            <ListItem className='flex justify-center'>
              <BiSolidHome className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center' onClick={closeDrawer}>
              <BsSearch className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <MdOutlineExplore className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <GoVideo className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <PiTelegramLogoBold className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <AiOutlineHeart className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <GrAddCircle className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <Avatar className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center absolute bottom-0'>
              <FiMenu className='h-6 w-6' />
            </ListItem>
          </List>
        </Card>
        <div
          className=' w-[378px] border-solid border-1 border-r border-gray-500 box-border bg-white'
          style={{ zIndex: '9999' }}>
          <div className='border-1 border-b border-gray-500  flex flex-col gap-8 p-5'>
            <h1 className='font-bold text-2xl'>Search</h1>
            <div className=''>
              <input
                className='w-full hover:outline-none focus:border-none border-none outline-none  hover:border-none rounded-md pl-4 placeholder:text-gray-800 text-black bg-brown-50 h-10'
                placeholder='search...'
              />
            </div>
          </div>
          <div className='w-full h-[calc(100vh - 150px)] p-5 flex justify-center items-center'>
            <p>no recent search</p>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
