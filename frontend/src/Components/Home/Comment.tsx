import React, { useState } from 'react';
import { BsEmojiFrown } from 'react-icons/bs';
import LikeDetailPopup from './LikeDetailPopup';
import { AxiosResponse } from 'axios';
import { PostType } from '../../Types/otherType';
import { Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import { COMMENTPOST, LIKEPOST } from '../../Redux/actionType';
import ViewAllCommentPopup from './ViewAllCommentPopup';

const Comment = ({ el }: any) => {
  const [text, setText] = useState<string>('');
  const data = useSelector((store: Initial) => store.localStorageData);
  const dispatch = useDispatch();

  const commentOnPost = (id: string) => {
    fetch(`http://localhost:8080/post/comment/${id}`, {
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
      commentOnPost(el._id);
      setText('');
    }
  };
  return (
    <div
      className='flex flex-col gap-1 text-[13px] px-2'
      style={{ fontFamily: 'Poppins, sans-serif' }}>
      {el?.likes.length > 0 ? (
        <p>
          Liked by{' '}
          <span className=' font-bold cursor-pointer'>
            {el.likes[0].username}
          </span>{' '}
          and <LikeDetailPopup el={el} />
        </p>
      ) : (
        <></>
      )}
      {el?.comments.length > 0 ? (
        <>
          <p>commented by <span className='font-bold'>{el.comments[0].commentedBy.username}</span> and others</p>
          <ViewAllCommentPopup el={el} />
        </>
      ) : (
        <></>
      )}

      <div className='relative hidden md:block lg:block'>
        <input
          className='w-[100%] h-8 align-middle flex focus:outline-none border-solid border-b-[1px] border-gray-600'
          placeholder='add your comments'
          onChange={(e) => setText(e.target.value)}
          onKeyDown={callFun}
          value={text}
        />
        <BsEmojiFrown className='absolute right-0 top-[10px]' />
      </div>
    </div>
  );
};

export default Comment;
