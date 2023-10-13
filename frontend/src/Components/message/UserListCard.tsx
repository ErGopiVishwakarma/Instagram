import { Avatar } from '@material-tailwind/react';
import React from 'react';
import { ChatType } from '../../Types/otherType';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import { Context, ContextType } from '../../Routes/ContextProvider';
import { useContext } from 'react'

const UserListCard = ({ el }: any) => {
  const { selectedChat, setSelectedChat } = useContext(Context) as ContextType;
  const authUser: any = useSelector((store: Initial) => store.authUser);
  const user = el.users[0]._id === authUser._id ? el.users[1] : el.users[0];

  return (
    <div
      key={el._id}
      className='flex gap-3 items-center px-4 py-4  cursor-pointer hover:bg-gray-400 w-full'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: selectedChat && selectedChat === el ? 'gray' : '',
      }}
      onClick={() => setSelectedChat(el)}>
      <div className='block md:hidden lg:block'>
        <Avatar
          src={
            user.profile
              ? user.profile
              : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
          }
          className='h-12 w-12'
        />
      </div>
      <div className='block md:hidden lg:block'>
        <p className=' text-sm'>{user.name}</p>
        <p className=' text-xs'>{user.username}</p>
      </div>

      <div className='hidden md:flex lg:hidden gap-2 items-center flex-col'>
        <div className='w-16'>
          <Avatar
            src={
              user.profile
                ? user.profile
                : 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            }
            className='h-16 w-16 border-solid border-2 border-red-400'
          />
        </div>
        <p className=' text-xs'>{user.name}</p>
      </div>
    </div>
  );
};

export default UserListCard;
