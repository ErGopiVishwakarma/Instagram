import { Tooltip } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHeart, BsHeartFill, BsSave } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useSelector } from 'react-redux';

const Likeshare = ({el}:any) => {

  const authUser: AuthUser | {} = useSelector((store: Initial) => store.authUser);

  return (
    <div className='flex w-[100%] justify-between py-[2px]'>
      <div className='flex gap-3'>
        <Tooltip content='Like' placement='bottom' className="py-1 px-2">
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <BsHeart className='w-5 h-5' />
            <BsHeartFill className='h-5 w-5 text-[#f00707]' />
          </div>
        </Tooltip>
        <Tooltip content='Comment' placement='bottom' className="py-1 px-2">
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <FaRegComment className='w-5 h-5' />
          </div>
        </Tooltip>
        <Tooltip content='Share' placement='bottom' className="py-1 px-2">
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <PiTelegramLogoBold className='w-5 h-5' />
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip content='Save' placement='bottom' className="py-1 px-2">
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <BsSave className='w-5 h-5' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Likeshare;
