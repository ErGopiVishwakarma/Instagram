import React, { ReactNode, useState } from 'react';
import { Avatar, Dialog, DialogBody } from '@material-tailwind/react';
import { PostType } from '../../Types/otherType';
import { AxiosResponse } from 'axios';
import { Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import { DELETEPOST } from '../../Redux/actionType';
import {memo} from 'react'

interface HandleFun {
  id:any
}

 function DeletePostPopup({ id }: HandleFun) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);
  const data = useSelector((store: Initial) => store.localStorageData);
  const dispatch = useDispatch();

  const deletePost = (id: string) => {
    fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<PostType>) => {
        const postData: any = res;
        console.log(postData);
        dispatch({ type: DELETEPOST, payload: postData });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const divClass =
    'flex items-center justify-center p-3 border-b-[1px] border-solid border-gray-300 hover:bg-gray-300 rounded-lg text-[15px]';

  return (
    <>
      <div
        className={`${divClass} cursor-pointer text-[#f00707]`}
        onClick={() => {
          handleOpenFun();
        }}>
        <p>Delete</p>
      </div>
      <Dialog open={open} handler={handleOpenFun} size='xs'>
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
              deletePost(id);
              handleOpenFun();
            }}>
            <p>Delete post</p>
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
}

export default memo(DeletePostPopup);