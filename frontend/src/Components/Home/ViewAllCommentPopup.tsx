import React, { ReactNode, useState } from 'react';
import {
  Avatar,
  Dialog,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { emitKeypressEvents } from 'readline';
import { CommentType, LikeType, PostType } from '../../Types/otherType';
import imageurl from '../../Images/userPic.jpg';
import { GrClose } from 'react-icons/gr';
import { BsHeart } from 'react-icons/bs';
import { AxiosResponse } from 'axios';
import { LIKEPOST } from '../../Redux/actionType';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import {memo} from 'react'

interface CommentPopupType {
  el:PostType;
  children:ReactNode
}

function ViewAllCommentPopup({ el,children }:CommentPopupType) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);
  const [text, setText] = useState<string>('');
  const data = useSelector((store: Initial) => store.localStorageData);
  const dispatch = useDispatch();
  const postedBy = el.postedBy as AuthUser

  const commentOnPost = (id: string) => {
    fetch(`${process.env.REACT_APP_URL}/post/comment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({ text }),
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<PostType>) => {
        const postData: any = res;
        console.log(postData);
        dispatch({ type: LIKEPOST, payload: postData });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const callFun = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      commentOnPost(el?._id);
      setText('');
    }
  };

  const divClass =
    'flex items-center justify-center p-3  hover:bg-gray-300 rounded-lg text-[15px]';

  return (
    <>
      <p
        className={`cursor-pointer`}
        onClick={() => {
          handleOpenFun();
        }}>
        {children}
      </p>
      <Dialog open={open} handler={handleOpenFun} size='sm' style={{border:'none',outline:'none'}}>
        <div className={`flex items-center justify-between px-5 py-3  `}>
          <div className='flex gap-4 items-center'>
            <Avatar className='h-12 w-12' src={postedBy ? `${process.env.REACT_APP_URL}/${postedBy?.profile}` : imageurl} />
            <p className='text-sm text-center font-bold'>
              {postedBy?.username}
            </p>
          </div>
          <div onClick={handleOpenFun} className=' cursor-pointer'>
            <GrClose />
          </div>
        </div>
        <DialogBody
          divider
          className='flex flex-col gap-2 rounded-lg h-96 overflow-y-auto '
          style={{
            boxShadow:
              'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
          }}>
          {el.comments.length > 0 ? (
            el.comments?.map((ele: any, ind: number) => {
              return (
                <div
                  className='flex justify-between gap-4 items-start'
                  key={ind}>
                  <Avatar
                    src={ele?.commentedBy.profile ? `${process.env.REACT_APP_URL}/${ele?.commentedBy.profile}` : imageurl}
                    className='h-10 w-10 '
                  />
                  <div className='w-full pt-1'>
                    <p className=' break-words text-sm'>
                      <span className='font-bold text-base'>
                        {ele.commentedBy.username}{' '}
                      </span>
                      {ele.text}
                    </p>
                    <p className='text-xs pt-2'>
                      1h <span className='pl-5'>0 like</span>
                    </p>
                  </div>
                  <div className='pt-3 pl-3'>
                    <BsHeart className='w-3 h-3' />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </DialogBody>
        <DialogFooter className='h-11 w-full p-0 relative'>
          <input
            className='w-full h-full hover:outline-none focus:border-none border-none outline-none  hover:border-none rounded-full pl-4 placeholder:text-gray-800 text-black'
            placeholder='Add a comment...'
            onKeyDown={callFun}
            value={text}
            onChange={(e)=>setText(e.target.value)}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default memo(ViewAllCommentPopup)
