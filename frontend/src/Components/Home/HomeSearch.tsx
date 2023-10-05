import { Avatar, Input, ListItem } from '@material-tailwind/react';
import React, { useState } from 'react';
import { BsHeart, BsInstagram } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const HomeSearch = () => {

const [searchVisible, setSearchVisible] = useState<boolean>(false)

  return (
    <div className='w-full flex md:hidden lg:hidden justify-evenly absolute top-0 z-10 items-center border-b border-gray-400 bg-white mb-3 py-[6px]'>
      <NavLink to='/'>
        <ListItem className='flex justify-center'>
          <BsInstagram className='h-6 w-6' />
        </ListItem>
      </NavLink>
      <div className='w-full'>
        <input className='w-full h-9 text-base pl-3 bg-gray-300 border-none focus:outline-none rounded-lg' placeholder='search and press enter' onFocus={()=>setSearchVisible(true)} onBlur={()=>setSearchVisible(false)}  />
      </div>
      <div className={`bg-white mt-[60px] absolute top-0 z-50 h-12 w-full rounded-lg ${searchVisible ? 'block': 'hidden'}`} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        no recent search
      </div>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <BsHeart className='h-6 w-6' />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default HomeSearch;
