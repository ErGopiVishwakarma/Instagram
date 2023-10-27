import React, { useEffect } from 'react';
import UserList from '../Components/message/UserList';
import NotSelectPage from '../Components/message/NotSelectPage';
import MessagePage from '../Components/message/MessagePage';
import { Context, ContextType } from '../Routes/ContextProvider';
import { useContext } from 'react';
// import io from 'socket.io-client';
import MdSidebar from '../Components/sidebar/MdSidebar';
import { useSelector } from 'react-redux';
import { Initial } from '../Types/reducerType';

const Message = () => {
  const { selectedChat} = useContext(Context) as ContextType;
  // const a = useSelector((store:Initial)=>console.log(store))

  return (
    <div className='w-full h-[100vh] flex relative '>
      {/* left side bar code  */}
      <div className='flex '>
        <div className='hidden md:block '>
          <MdSidebar />
        </div>
        <div className={`${!selectedChat ? 'block' : 'hidden'} md:block `}>
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
