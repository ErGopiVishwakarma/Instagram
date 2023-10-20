import React, { ReactNode, useState } from 'react';
import { Avatar, Dialog, DialogBody } from '@material-tailwind/react';
import { PostType } from '../../Types/otherType';
import { AxiosResponse } from 'axios';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';


interface UnfolowPopupType {
    children:ReactNode;
  }

const ChangeProfilePicPopuc = ({children}:UnfolowPopupType) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);

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
      <Dialog open={open} handler={handleOpenFun} size='xs' style={{border:'none',outline:'none'}}>
        <DialogBody
          divider
          className='flex flex-col p-0 rounded-lg '
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}>
          <div
            className={`flex flex-col gap-1 py-5 border-b-[1px] border-solid border-gray-300 justify-center items-center`}>
            <h1 className='text-2xl  text-black'>Delete Post</h1>
            <p className='text-sm'>Are you sure want to delete this post.</p>
          </div>
          <div
            className={`${divClass} cursor-pointer text-[#f00707]`}
            onClick={() => {
              handleOpenFun();
            }}>
            <p>Unfollow</p>
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

export default ChangeProfilePicPopuc;
