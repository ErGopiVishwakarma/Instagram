import React, { useState } from 'react';
import imageurl from '../../Images/userPic.jpg';
import { Avatar, Spinner } from '@material-tailwind/react';
import { PostType } from '../../Types/otherType';
import { AuthUser, Initial } from '../../Types/reducerType';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATEUSER } from '../../Redux/actionType';
import {memo} from 'react'

interface HoverDetail {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  userPostData: PostType[];
  authUser: AuthUser;
}

const HoverDetailPopup = ({
  showPopup,
  setShowPopup,
  userPostData,
  authUser,
}: HoverDetail) => {
  const data = useSelector((store: Initial) => store.localStorageData);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);

  const followFun = () => {
    const config = {
      followerId: authUser?._id,
    };
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}/user/follow`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(config),
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<AuthUser>) => {
        const userData: any = res;
        setLoading(false);
        dispatch({ type: UPDATEUSER, payload: userData });
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div
      className={`h-[350px] w-[350px]  bg-white  flex-col gap-3 rounded-md transition-all duration-2000 ease-in-out delay-500 ${
        showPopup ? ' opacity-100 flex ' : 'opacity-0 hidden '
      } rounded-md`}
      style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
      onMouseOver={() => setShowPopup(true)}
      onMouseOut={() => setShowPopup(false)}>
      <div className='flex items-center gap-3 p-4'>
        <Avatar
          src={
            authUser?.profile
              ? `${process.env.REACT_APP_URL}/${authUser?.profile}`
              : imageurl
          }
          className='h-14 w-14 '
        />
        <div>
          <p className='text-sm'>{authUser?.name}</p>
          <p className='text-xs text-[rgb(115, 115, 115)]'>
            {authUser?.username}
          </p>
        </div>
      </div>
      <div className=' grid-cols-3 grid'>
        <div className=' flex flex-col gap-2 justify-center items-center'>
          <p className=' text-xs font-bold'>{userPostData?.length}</p>
          <p className=' text-xs'>posts</p>
        </div>
        <div className=' flex flex-col gap-2 justify-center items-center'>
          <p className=' text-xs font-bold'>{authUser?.followers?.length}</p>
          <p className=' text-xs'>followers</p>
        </div>
        <div className=' flex flex-col gap-2 justify-center items-center'>
          <p className=' text-xs font-bold'>{authUser?.followings?.length}</p>
          <p className=' text-xs'>following</p>
        </div>
      </div>
      {userPostData && userPostData?.length > 0 ? (
        <div className='grid-cols-3 grid gap-1 px-[2px]'>
          {userPostData.slice(0, 3).map((el) => {
            return (
              <img
                src={`${process.env.REACT_APP_URL}/${el?.postUrl}`}
                className=' h-[140px] w-full'
                key={el?._id}
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
          <button
            className='w-full flex justify-center items-center bg-blue-500 py-[5px] rounded-md text-white cursor-not-allowed'>
            {loading ? <Spinner className='h-5 w-5' /> : 'Follow'}
          </button>        
      </div>
    </div>
  );
};

export default memo(HoverDetailPopup);
