import React, { useEffect } from 'react';
import IconSidebar from '../Components/sidebar/IconSidebar';
import UserList from '../Components/message/UserList';
import NotSelectPage from '../Components/message/NotSelectPage';
import MessagePage from '../Components/message/MessagePage';
import { Context, ContextType } from '../Routes/ContextProvider';
import { useContext } from 'react';
// import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Initial } from '../Types/reducerType';
import { getAllMessages } from '../Redux/action';
import { ChatType, MessageType } from '../Types/otherType';
import { UPDATEMESSAGE } from '../Redux/actionType';
import MdSidebar from '../Components/sidebar/MdSidebar';

// const backEndPoint = 'http://localhost:8080';
// var socket: any, chatCompare: ChatType;

const Message = () => {
  const { selectedChat, setSelectedChat } = useContext(Context) as ContextType;

  return (
    <div className='w-full h-[100vh] flex '>
      {/* left side bar code  */}
      <div className='flex relative'>
        <div className='hidden md:block relative z-50'>
          <MdSidebar />
        </div>
        <div className={`${!selectedChat ? 'block' : 'hidden'} md:block relative z-20`}>
          <UserList />
        </div>
      </div>
      {/* main div code of post  */}
      <div
        className={`w-full h-[100vh] overflow-y-auto ${
          selectedChat ? 'flex' : 'hidden'
        } md:flex items-center justify-center `}>
        {selectedChat ? <MessagePage /> : <NotSelectPage />}
      </div>
    </div>
  );
};

export default Message;
