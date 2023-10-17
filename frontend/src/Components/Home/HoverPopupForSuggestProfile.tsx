import React from 'react';
import { useState } from 'react';
import imageurl from '../../Images/userPic.jpg';
import { Avatar } from '@material-tailwind/react';
import { AuthUser, Initial } from '../../Types/reducerType';
import { NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { PostType } from '../../Types/otherType';
import { useSelector } from 'react-redux';

interface TypeForThis {
  el: AuthUser;
  ind: number;
}

const HoverPopupForSuggestProfile = ({ el, ind }: TypeForThis) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [userPostData, setUserPostData] = useState<PostType[] | []>();
  const data = useSelector((store: Initial) => store.localStorageData);

  const getUserPost = (id: string | undefined, token: string) => {
    fetch(`http://localhost:8080/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<PostType>) => {
        const postData: any = res;
        console.log(postData);
        setUserPostData(postData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div
      className='flex justify-between items-center relative rounded-md'
      key={ind}>
      <NavLink to={`/profile/${el?._id}`}>
        <div
          className={`flex items-center gap-3`}
          onMouseOver={() => {
            getUserPost(el?._id, data.token);
            setShowPopup(true);
          }}
          onMouseOut={() => setShowPopup(false)}>
          <Avatar
            src={el.profile ? el.profile : imageurl}
            className='h-11 w-11 '
          />
          <div>
            <p className='text-sm'>{el.name}</p>
            <p className='text-xs text-[rgb(115, 115, 115)]'>{el.username}</p>
          </div>
        </div>
      </NavLink>
      <div
        className={`h-[350px] w-[350px] bg-white flex-col gap-3 -ml-5 absolute  top-8 z-50 rounded-md ${
          showPopup ? 'flex' : 'hidden'
        }`}
        style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
        onMouseOver={() => setShowPopup(true)}
        onMouseOut={() => setShowPopup(false)}>
        <div className='flex items-center gap-3 p-4'>
          <Avatar
            src={el?.profile ? el?.profile : imageurl}
            className='h-14 w-14 '
          />
          <div>
            <p className='text-sm'>{el?.name}</p>
            <p className='text-xs text-[rgb(115, 115, 115)]'>{el?.username}</p>
          </div>
        </div>
        <div className=' grid-cols-3 grid'>
          <div className=' flex flex-col gap-2 justify-center items-center'>
            <p className=' text-xs font-bold'>{userPostData?.length}</p>
            <p className=' text-xs'>posts</p>
          </div>
          <div className=' flex flex-col gap-2 justify-center items-center'>
            <p className=' text-xs font-bold'>{el?.followers?.length}</p>
            <p className=' text-xs'>followers</p>
          </div>
          <div className=' flex flex-col gap-2 justify-center items-center'>
            <p className=' text-xs font-bold'>{el?.followings?.length}</p>
            <p className=' text-xs'>following</p>
          </div>
        </div>
        {userPostData && userPostData?.length > 0 ? (
          <div className='grid-cols-3 grid gap-1 px-[2px]'>
            {userPostData?.slice(0, 3).map((el) => {
              return (
                <img
                  src={`http://localhost:8080/${el?.postUrl}`}
                  className=' h-[140px] w-full'
                />
              );
            })}
          </div>
        ) : (
          <div className='w-full h-[140px] flex justify-center items-center'>
            <p>No Post Yet.</p>
          </div>
        )}
        <div className='flex w-full justify-between px-3'>
          <div className='w-full flex gap-2'>
            <button className=' w-full flex justify-center items-center bg-blue-500 py-[5px] rounded-md text-white'>
              Message
            </button>
            <button className=' w-full flex justify-center items-center bg-gray-200 py-[5px] rounded-md '>
              following
            </button>
          </div>
          {/* <button className='w-full flex justify-center items-center bg-blue-500 py-[5px] rounded-md text-white'>
            Follow
          </button> */}
        </div>
      </div>
      <p className='text-xs text-[rgb(33,163,247)] text-opacity-100'>Follow</p>
    </div>
  );
};

export default HoverPopupForSuggestProfile;
