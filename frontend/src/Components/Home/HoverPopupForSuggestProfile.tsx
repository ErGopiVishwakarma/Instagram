import React, { ReactNode, useState } from 'react';
import imageurl from '../../Images/userPic.jpg';
import { Avatar, Spinner } from '@material-tailwind/react';
import { AuthUser, Initial } from '../../Types/reducerType';
import { NavLink } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { PostType } from '../../Types/otherType';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATEUSER } from '../../Redux/actionType';
import { Dialog, DialogBody } from '@material-tailwind/react';

interface TypeForThis {
  el: AuthUser;
  ind: number;
}

const HoverPopupForSuggestProfile = ({ el, ind }: TypeForThis) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenFun = () => setOpen(!open);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPostData, setUserPostData] = useState<PostType[] | []>();
  const data = useSelector((store: Initial) => store.localStorageData);
  const authUser = useSelector((store: Initial) => store.authUser as AuthUser);
  const dispatch = useDispatch();

  const getUserPost = (id: string | undefined, token: string) => {
    fetch(`${process.env.REACT_APP_URL}/post/${id}`, {
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

  const followFun = () => {
    const config = {
      followerId: el?._id,
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

  const unFollowFun = () => {
    const config = {
      unfollowId: el?._id,
    };
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}/user/unfollow`, {
      method: 'PUT',
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
  const divClass =
    'flex items-center justify-center p-3 border-b-[1px] border-solid border-gray-300 hover:bg-gray-300 rounded-lg text-[15px]';

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
            src={
              el?.profile
                ? `${process.env.REACT_APP_URL}/${el?.profile}`
                : imageurl
            }
            className='h-11 w-11 '
          />
          <div>
            <p className='text-sm'>{el?.name}</p>
            <p className='text-xs text-[rgb(115, 115, 115)]'>{el?.username}</p>
          </div>
        </div>
      </NavLink>
      <div
        className={`h-[350px] w-[350px] bg-white flex-col gap-3 -ml-5 absolute  top-8 z-50 rounded-md ${
          showPopup ? 'flex' : 'hidden'
        }`}
        style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        onMouseOver={() => setShowPopup(true)}
        onMouseOut={() => setShowPopup(false)}>
        <NavLink to={`/profile/${el?._id}`}>
          <div className='flex items-center gap-3 p-4'>
            <Avatar
              src={
                el?.profile
                  ? `${process.env.REACT_APP_URL}/${el?.profile}`
                  : imageurl
              }
              className='h-14 w-14 '
            />
            <div>
              <p className='text-sm'>{el?.name}</p>
              <p className='text-xs text-[rgb(115, 115, 115)]'>
                {el?.username}
              </p>
            </div>
          </div>
        </NavLink>
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
                  src={`${process.env.REACT_APP_URL}/${el?.postUrl}`}
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
          {el?.followers?.find((ele) => ele?._id === authUser?._id) ? (
            <div className='w-full flex gap-2'>
              <button className=' w-full flex justify-center items-center bg-blue-500 py-[5px] rounded-md text-white'>
                Message
              </button>
              <button className=' w-full flex justify-center items-center bg-gray-200 py-[5px] rounded-md '>
                following
              </button>
            </div>
          ) : (
            <button
              className='w-full flex justify-center items-center bg-blue-500 py-[5px] rounded-md text-white'
              onClick={followFun}>
              {loading ? <Spinner className='h-5 w-5' /> : 'Follow'}
            </button>
          )}
        </div>
      </div>
      {el?.followers?.find((ele) => ele?._id === authUser?._id) ? (
        <>
          <p
            className='text-xs cursor-pointer'
            onClick={() => {
              handleOpenFun();
            }}>
            {loading ? <Spinner className='h-5 w-5' /> : 'Following'}
          </p>
          <Dialog
            open={open}
            handler={handleOpenFun}
            size='xs'
            style={{ border: 'none', outline: 'none' }}>
            <DialogBody
              divider
              className='flex flex-col p-0 rounded-lg'
              style={{
                boxShadow:
                  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
              }}>
              <div
                className={`flex flex-col gap-1 py-6 border-b-[1px] border-solid border-gray-300 justify-center items-center`}>
                <Avatar
                className='h-24 w-24'
                  src={
                    el?.profile
                      ? `${process.env.REACT_APP_URL}/${el?.profile}`
                      : imageurl
                  }
                />
                <p className='text-sm'>unfollow @{el?.username}?.</p>
              </div>
              <div
                className={`${divClass} cursor-pointer text-[#f00707]`}
                onClick={() => {
                  handleOpenFun();
                  unFollowFun();
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
      ) : (
        /////////=========================
        <p
          className='text-xs text-[rgb(33,163,247)] cursor-pointer'
          onClick={followFun}>
          {loading ? <Spinner className='h-5 w-5 ' /> : 'Follow'}
        </p>
      )}
    </div>
  );
};

export default HoverPopupForSuggestProfile;
