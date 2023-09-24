import { Avatar } from '@material-tailwind/react';
import React from 'react';
import ReactScrollableFeed from 'react-scrollable-feed';
import { Context, ContextType } from '../../Routes/ContextProvider';
import { useSelector } from 'react-redux';
import { Initial } from '../../Types/reducerType';
import { useContext, useState, useEffect } from 'react';
import { MessageType } from '../../Types/otherType';

const Messages = () => {
  // const [message, setMessage] = useState<MessageType[]>([]);
  const { selectedChat, setSelectedChat} = useContext(Context) as ContextType;
  const authUser: any = useSelector((store: Initial) => store.authUser);
  let data: any = selectedChat;
  const user =
    data && data.users[0]._id === authUser._id ? data.users[1] : data.users[0];
  let allMessage: MessageType[] = useSelector(
    (store: Initial) => store.message,
  );

  return (
    <div className=' flex flex-col pl-4 h-full w-full  relative box-border'>
      {/* user profile part here  */}
      <ReactScrollableFeed>
        <div className='flex items-center flex-col py-10 gap-1 '>
          <Avatar
            src={
              user.profile
                ? user.profile
                : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
            }
            className='h-24 w-24'
          />
          <p className='pt-2 font-bold'>{user.name}</p>
          <p className='text-sm text-gray-600'>{user.username}</p>
          <button className='px-4 py-2 text-sm text-white bg-blue-400 rounded-lg'>
            view profile
          </button>
        </div>

        {allMessage &&
          allMessage.map((el, ind) => {
            return el.sender === authUser._id ? (
              <div className='flex flex-col gap-1 box-border pr-4' key={el._id}>
                <span className='text-center py-4 text-xs'>02-05-2018</span>
                <div className='text-right justify-end items-end w-content'>
                  <a className='py-2 px-3 text-[15px]  bg-blue-500 text-white box-content rounded-xl'>
                    {el.content}
                  </a>
                </div>
              </div>
            ) : (
              <div className='flex flex-col gap-1 box-border' key={el._id}>
                <span className='text-center py-4 text-xs'>02-05-2018</span>
                <div className=' w-content'>
                  <a className='py-2 px-3 text-[15px] bg-gray-300 text-black box-content rounded-xl'>
                    {el.content}
                  </a>
                </div>
              </div>
            );
          })}

        <div></div>
      </ReactScrollableFeed>
    </div>
  );
};

export default Messages;
