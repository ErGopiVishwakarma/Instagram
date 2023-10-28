import React, { ReactNode, useState } from 'react';
import { Avatar, Dialog, DialogBody } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import imageurl from '../Images/userPic.jpg'
import { AuthUser, Initial } from '../Types/reducerType';
import { useNavigate } from 'react-router-dom';

interface Children {
  children: ReactNode;
}

const LogOut = ({ children }: Children) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('xx12insta@123auth1t3ork0en');
    window.location.reload()
    navigate('/login');
  };

  const divClass =
    'flex items-center justify-center p-3 border-b-[1px] border-solid border-gray-300 hover:bg-gray-300 rounded-lg text-[15px]';
  return (
    <>
      <div
        onClick={() => {
          handleOpenFun();
        }}>
        {children}
      </div>
      <Dialog
        open={open}
        handler={handleOpenFun}
        size='xs'
        style={{ border: 'none', outline: 'none' }}>
        <DialogBody
          divider
          className='flex flex-col p-0 rounded-lg '
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}>
          <div
            className={`flex flex-col gap-1 py-6 border-b-[1px] border-solid border-gray-300 justify-center items-center`}>
            <Avatar
              className='h-24 w-24'
              src={
                authUser?.profile
                  ? `${process.env.REACT_APP_URL}/${authUser?.profile}`
                  : imageurl
              }
            />
            <p className='text-sm'>{authUser?.username}?.</p>
          </div>
          <div
            className={`${divClass} cursor-pointer text-[#f00707]`}
            onClick={() => {
              handleOpenFun();
              handleLogout()
            }}>
            <p>LogOut</p>
          </div>
          <div
            className={`${divClass} cursor-pointer text-black`}
            onClick={handleOpenFun}>
            <p>Cancel</p>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default memo(LogOut);
