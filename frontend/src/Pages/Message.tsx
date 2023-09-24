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

// const backEndPoint = 'http://localhost:8080';
// var socket: any, chatCompare: ChatType;

const Message = () => {
  const { selectedChat, setSelectedChat } = useContext(Context) as ContextType;
  // const authUser: any = useSelector((store: Initial) => store.authUser);
  // const user: any = selectedChat;
  // const dispatch = useDispatch();
  // const data = useSelector((store: Initial) => store.localStorageData);
  // useEffect(() => {
  //   socket = io(backEndPoint);
  //   socket.emit('roomSetup', authUser);
  //   socket.on('connected', () => {});
  //   socket.emit('joinChatPage', user._id);
  // }, [selectedChat]);

  // useEffect(() => {
  //   getAllMessages(data.token, user._id, dispatch);
  //   chatCompare = user;
  // }, [selectedChat]);

  // useEffect(() => {
  //   socket.on('recieveMessage', (returnMessage: MessageType) => {
  //     if (!chatCompare || user._id !== returnMessage._id) {
  //       //give notification
  //     } else {
  //       console.log('recieve mesthod dispach')
  //       dispatch({ type: UPDATEMESSAGE, payload: returnMessage });
  //     }
  //   });
  // });

  // const a = useSelector((store: Initial) => console.log(store));

  return (
    <div className='w-full h-[100vh] flex  '>
      {/* left side bar code  */}
      <div className='flex'>
        <div className='hidden md:block'>
          <IconSidebar />
        </div>
        <div className={`${!selectedChat ? 'block' : 'hidden'} md:block`}>
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
