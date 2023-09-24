import { Avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircle, BsExclamationCircle } from 'react-icons/bs';
import Messages from './Messages';
import { AiOutlineSend } from 'react-icons/ai';
import { Context, ContextType } from '../../Routes/ContextProvider';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Initial } from '../../Types/reducerType';
import { ChatType, MessageType } from '../../Types/otherType';
import axios from 'axios';
import { UPDATEMESSAGE } from '../../Redux/actionType';
import io from 'socket.io-client';
import { getAllMessages } from '../../Redux/action';


const backEndPoint = 'http://localhost:8080';
var socket: any, chatCompare: ChatType;

const MessagePage = () => {
  const { selectedChat, setSelectedChat } = useContext(Context) as ContextType;
  const [newMessage, setNewMessage] = useState<string>('');
  const authUser: any = useSelector((store: Initial) => store.authUser);
  const [messageRender,setMessageRender] = useState<boolean>(false)
  const [socketConnected,setSocketConnected] = useState<boolean>(false)
  const dispatch = useDispatch();
  const token: string = useSelector(
    (store: Initial) => store.localStorageData.token,
  );
  let value: any = selectedChat;
  const user =
    value && value.users[0]._id === authUser._id
      ? value.users[1]
      : value.users[0];
  const data = useSelector((store: Initial) => store.localStorageData);
  // socket part is here
  useEffect(() => {
    socket = io(backEndPoint);
    socket.emit('userRoom', authUser);
    socket.on('connected', () => {setSocketConnected(true)});

  }, []);

  useEffect(() => {
    getAllMessages(data.token, value._id, dispatch);
    socket.emit('joinChatPage', value._id);
    chatCompare = value;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('recieveMessage', (returnMessage: MessageType) => {
      if (!chatCompare || value._id !== returnMessage.chatId) {
        //give notification
      } else {
        dispatch({ type: UPDATEMESSAGE, payload: returnMessage });
        return
      }
    });
  });

  // sending message code
  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        setNewMessage('');
        const { data } = await axios.post(
          `http://localhost:8080/message`,
          {
            content: newMessage,
            chatId: value._id,
          },
          config,
        );
        // console.log(data)
        let users = value.users;
        //  console.log(data,users)
        socket.emit('newMessage', { data, users });
        dispatch({ type: UPDATEMESSAGE, payload: data });
        setMessageRender(prev=>!prev)
      } catch (error) {
        console.log(error);
        alert('ohh something went wrong');
      }
    } else {
      alert('please write something ..');
      return;
    }
  };

  return (
    <div className='w-full h-full relative  flex flex-col'>
      {/* top user info part here  */}
      <div
        className='flex justify-between h-20 items-center px-6 w-full top-0 z-20 bg-white'
        style={{
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        }}>
        <div
          onClick={() => setSelectedChat('')}
          className='sm:block md:hidden lg:hidden'>
          <BsArrowLeftCircle className='h-6 w-6' />
        </div>

        <div className='flex gap-3 items-center'>
          <Avatar
            src={
              user.profile
                ? user.profile
                : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
            }
            className='h-10 w-10'
          />
          <p>{user.username}</p>
        </div>
        <div>
          <BsExclamationCircle className='h-7 w-7' />
        </div>
      </div>
      {/* message code here  */}
      <div className='h-[calc(100vh-144px)]'>
        <Messages />
      </div>
      {/* input part here  */}
      <div className='w-full h-16 px-4 items-center flex relative'>
        <input
          className='w-full px-5 border-solid border-[1px] border-gray-800 h-10 rounded-[50px] focus:outline-none'
          placeholder='message....'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <div className='absolute right-12' onClick={sendMessage}>
          <AiOutlineSend className=' h-5 w-5 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
