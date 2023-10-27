import React from 'react';
import TabList from './Tabs';
import { FiEdit } from 'react-icons/fi';
import { Avatar } from '@material-tailwind/react';
import UserListCard from './UserListCard';
import NewChatSearchModal from './NewChatSearchModal';
import { useSelector } from 'react-redux';
import { Initial } from '../../Types/reducerType';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { ChatType } from '../../Types/otherType';
import '../../Styles/following .css'
import {memo} from 'react'

const UserList = () => {
  const chatsData = useSelector((store: Initial) => store.chats as ChatType[]);
  return (
    <div className='w-[370px] md:w-24 lg:w-[375px] h-[100vh] border-solid border-1 border-r border-gray-400'>
      <div className='flex justify-between md:justify-center lg:justify-between w-full px-7 py-10'>
        <div
          onClick={() => window.history.back()}
          className='block md:hidden lg:hidden'>
          <BsArrowLeftCircle className='h-6 w-6' />
        </div>
        <p className='block md:hidden lg:block'>gopi_v777</p>
        <div className=' cursor-pointer'>
          <NewChatSearchModal>
            <FiEdit className='h-6 w-6' />
          </NewChatSearchModal>
        </div>
      </div>
      <hr />
      {/* tabs code here  */}
      <div className='w-full h-[calc(100vh-120px)] overflow-y-auto py-2 customCss'>
        {/* <TabList /> */}
        {chatsData.length > 0 ? (
          chatsData?.map((el, ind) => {
            return <UserListCard el={el} key={ind} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(UserList);
