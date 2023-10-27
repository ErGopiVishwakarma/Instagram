import { Avatar } from '@material-tailwind/react';
import React from 'react';
import {memo} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import { Context, ContextType } from '../../Routes/ContextProvider';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useContext, useState, useEffect } from 'react';
import { MessageType } from '../../Types/otherType';
import imageurl from '../../Images/userPic.jpg';
import { NavLink } from 'react-router-dom';
import SingleMessage from './SingleMessage';

const Messages = () => {
  // const [message, setMessage] = useState<MessageType[]>([]);
  const { selectedChat, setSelectedChat } = useContext(Context) as ContextType;
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);
  let data: any = selectedChat;
  const user =
    data && data.users[0]._id === authUser._id ? data.users[1] : data.users[0];
  let allMessage = useSelector(
    (store: Initial) => store.message as MessageType[],
  );
console.log(allMessage)
  return (
    <div className=' flex flex-col pl-4 h-full w-full  relative box-border'>
      <ReactScrollableFeed>
        <div className='flex items-center flex-col py-10 gap-1 '>
          <Avatar
            src={
              user.profile
                ? `${process.env.REACT_APP_URL}/${user?.profile}`
                : imageurl
            }
            className='h-24 w-24'
          />
          <p className='pt-2 font-bold'>{user.name}</p>
          <p className='text-sm text-gray-600'>{user.username}</p>
          <NavLink to={`/profile/${user?._id}`}>
            <button className='px-4 py-2 text-sm text-white bg-blue-400 rounded-lg'>
              view profile
            </button>
          </NavLink>
        </div>

        {allMessage &&
          allMessage.map((el, ind) => {
            return <SingleMessage el={el} ind={ind} key={ind} />
          })}

        <div></div>
      </ReactScrollableFeed>
    </div>
  );
};

export default memo(Messages);
