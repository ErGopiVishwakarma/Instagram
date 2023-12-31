import React, { ReactNode, useState } from 'react';
import { Avatar, Dialog, DialogBody } from '@material-tailwind/react';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import DeletePostPopup from './DeletePostPopup';
import { PostType } from '../../Types/otherType';
import {memo} from 'react'

interface PostDataType {
  el:PostType
}

function PostThreeDotModal({ el }: PostDataType) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  const data = useSelector((store: Initial) => store.localStorageData);
  const authUser: any = useSelector((store: Initial) => store.authUser);
  const dispatch = useDispatch();
  const postedBy = el.postedBy as AuthUser

  const divClass =
    'flex items-center justify-center p-3 border-b-[1px] border-solid border-gray-300 hover:bg-gray-300 rounded-lg text-[15px]';

  return (
    <>
      <p onClick={handleOpen} className='text-3xl p-3 cursor-pointer'>
        ...
      </p>
      <Dialog open={open} handler={handleOpen} size='xs' style={{border:'none',outline:'none'}}>
        <DialogBody
          divider
          className='flex flex-col p-0 rounded-lg '
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}>
          {authUser._id === postedBy?._id ? (
            <DeletePostPopup id={el?._id} />
          ) : (
            <div
              className={` ${divClass} cursor-pointer text-[#f00707]`}
              onClick={() => {
                handleOpen();
              }}>
              <p>Report</p>
            </div>
          )}
          <div className={`${divClass} cursor-not-allowed text-black`}>
            <p>Add to favorites</p>
          </div>
          <div className={`${divClass} cursor-not-allowed text-black`}>
            <p>Go to post</p>
          </div>
          <div className={`${divClass} cursor-not-allowed text-black`}>
            <p>Share to</p>
          </div>
          <div className={`${divClass} cursor-not-allowed text-black`}>
            <p>Copy link</p>
          </div>
          <div className={`${divClass} cursor-not-allowed text-black`}>
            <p>About this account</p>
          </div>
          <div
            className={`${divClass} cursor-pointer text-black`}
            onClick={handleOpen}>
            <p>Cancel</p>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default memo(PostThreeDotModal)
