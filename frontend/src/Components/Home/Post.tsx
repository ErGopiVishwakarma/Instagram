import { Avatar } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import Likeshare from './Likeshare';
import Comment from './Comment';
import userPick from '../../Images/userimage.png';
import { NavLink } from 'react-router-dom';
import HoverDetailPopup from './HoverDetailPopup';
import PostThreeDotModal from './PostThreeDotModal';
import { PostType } from '../../Types/otherType';

const Post = ({el}:any) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const date: any = new Date();
  const postDate: any = new Date(`${el.createdAt}`);
  let hour = Math.floor((date - postDate) / 1000 / 3600);
  let day = postDate.getDate();
  let month = postDate
    .toLocaleString('default', { month: 'long' })
    .substring(0, 3);

  return (
    <div
      className='w-full sm:w-[470px] md:w-[470px] lg:w-[470px] m-auto px-2'
      key={el._id}>
      <div
        className='w-[100%] relative'
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        {/* user post code here  */}
        <div className='flex items-center justify-between pb-2 relative'>
          {/* =======================================navigate link here to go profile page========================================  */}
          <NavLink to='/'>
            <div
              className='flex gap-2 items-center'
              onMouseOver={() => setShowPopup(true)}
              onMouseOut={() => setShowPopup(false)}>
              <Avatar
                src={el.postedBy?.profile ? el.postedBy?.profile : userPick}
                className='h-9 w-9'
              />
              <p className='text-sm'>{el.postedBy?.username}</p>
              {hour < 24 ? (
                <p className=' text-xs'>{hour}h ago</p>
              ) : (
                <p className=' text-xs'>{`${day} ${month}`}</p>
              )}
            </div>
          </NavLink>
          {/* =========================popup box which will open when user hover on the image of name===============================  */}
          <div className=' absolute left-2 top-12'>
            <HoverDetailPopup
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          </div>
          {/*==========================this is the right side three dot for show menu which will contain the lile delete follow etc========================  */}
          <PostThreeDotModal el={el} />
          
        </div>

        {/*=================================== this is the post image=======================================  */}
        <div className='w-[100%] bg-black flex justify-center '>
          <img
            src={`http://localhost:8080/${el.postUrl}`}
            className='w-full object-contain'
          />
        </div>
      </div>
      <div>
        {/* ============================================like functionality is here==========================================  */}
        <Likeshare el={el} />
        {/*================================= comment part here ================================= */}
        <Comment el={el} />
      </div>
    </div>
  );
};

export default Post;
