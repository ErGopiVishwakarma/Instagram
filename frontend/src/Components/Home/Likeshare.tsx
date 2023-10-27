import { Tooltip } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHeart, BsHeartFill, BsSave } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../Redux/action';
import { LikeType, PostType } from '../../Types/otherType';
import {memo} from 'react'

interface PostDataType {
  el:PostType
}

const Likeshare = ({ el }: PostDataType) => {
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);
  const data = useSelector((store: Initial) => store.localStorageData);
  const dispatch = useDispatch();

  const likeFunHandler = () => {
    likePost(data.token, el?._id, dispatch);
  };

  return (
    <div className='flex w-[100%] justify-between py-[2px]'>
      <div className='flex gap-3'>
        <Tooltip content='Like' placement='bottom' className='py-1 px-2'>
          <div
            className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'
            onClick={likeFunHandler}>
            {el.likes?.find((ele: LikeType) => ele?._id == authUser?._id) ? (
              <BsHeartFill className='h-5 w-5 text-[#f00707]' />
            ) : (
              <BsHeart className='w-5 h-5' />
            )}
          </div>
        </Tooltip>
        <Tooltip content='Comment' placement='bottom' className='py-1 px-2'>
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <FaRegComment className='w-5 h-5' />
          </div>
        </Tooltip>
        <Tooltip content='Share' placement='bottom' className='py-1 px-2'>
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <PiTelegramLogoBold className='w-5 h-5' />
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip content='Save' placement='bottom' className='py-1 px-2'>
          <div className=' cursor-pointer p-2 hover:bg-gray-300 rounded-full'>
            <BsSave className='w-5 h-5' />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default memo(Likeshare);
