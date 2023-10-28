import { useContext, useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useDispatch, useSelector } from 'react-redux';
import { CommentType, LikeType, PostType } from '../../Types/otherType';
import { BiSolidUser, BiUser, BiUserPlus } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import userPic from '../../Images/userPic.jpg';
import { AxiosResponse } from 'axios';
import { Spinner } from '@material-tailwind/react';
import UnfollowPopup from '../Home/UnfollowPopup';
import ChangeProfilePicPopuc from './ChangeProfilePicPopuc';
import SeeFollowerFollowingUser from './SeeFollowerFollowingUser';
import {memo} from 'react'


interface PropType {
  userData: AuthUser;
  userPostData: PostType[];
  setUserData: React.Dispatch<React.SetStateAction<AuthUser | undefined>>;
  setAgainRender: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderFile({
  userData,
  userPostData,
  setUserData,
  setAgainRender,
}: PropType) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);
  const data = useSelector((store: Initial) => store.localStorageData);
  const [render, setRender] = useState<boolean>(false);
  const navigate = useNavigate()

  // follow to user function
  const followFun = () => {
    const config = {
      followerId: userData?._id,
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
        setUserData(userData);
        setRender((prev) => !prev);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log(err);
      });
  };



  const buttonStyle =
    'px-4 py-1 bg-gray-200 rounded-md text-sm cursor-pointer tracking-wider hover:bg-gray-400 justify-center items-center';

  return (
    <header
      className='flex gap-5 md:gap-16 lg:gap-[100px] tracking-wider'
      style={{ fontFamily: 'sans-serif' }}>
      {checkAuth?._id === id ? (
        <ChangeProfilePicPopuc setAgainRender={setAgainRender}>
          <div>
            <img
              src={
                userData?.profile
                  ? `${process.env.REACT_APP_URL}/${userData?.profile}`
                  : userPic
              }
              className=' h-[152px] w-[152px] rounded-full cursor-pointer '
            />
          </div>
        </ChangeProfilePicPopuc>
      ) : (
        <div>
          <img
            src={
              userData?.profile
                ? `${process.env.REACT_APP_URL}/${userData?.profile}`
                : userPic
            }
            className=' h-[152px] w-[152px] rounded-full cursor-pointer '
          />
        </div>
      )}
      <div className='flex flex-col gap-[15px]'>
        <div className='flex gap-4 items-center pb-2 flex-wrap'>
          <p className='text-[20px]'>{userData?.username}</p>
          {/* for first button check condition  */}
          {checkAuth._id === id ? (
            <button className={`${buttonStyle}`}>Edit profile</button>
          ) : userData?.followers?.find((el) => el?._id === checkAuth?._id) ? (
            <UnfollowPopup
              setLoading={setLoading}
              userId={userData?._id}
              userData={userData}
              setUserData={setUserData}>
              <button
                className={`w-[100px] ${buttonStyle} flex justify-center items-center`}>
                {loading ? <Spinner className='h-5 w-5' /> : 'Following'}
              </button>
            </UnfollowPopup>
          ) : (
            <button
              className=' py-1 w-[72px]  bg-blue-500 rounded-md text-sm cursor-pointer text-white flex items-center justify-center'
              onClick={followFun}>
              {loading ? <Spinner className='h-5 w-5 ' /> : 'Follow'}
            </button>
          )}
          {/* for second button  */}
          {checkAuth._id === id ? (
            <button className={buttonStyle}>View archive</button>
          ) : (
            <button className={buttonStyle} >Message</button>
          )}
          {/* for third button  */}
          {checkAuth._id === id ? (
            <button className={buttonStyle}>Add tools</button>
          ) : (
            <button className={buttonStyle}>
              <BiUserPlus className='h-4 w-4' />
            </button>
          )}
          {/* three dots same for everyone  */}
          <div className='cursor-pointer'>
            <BsThreeDots className='h-5 w-5' />
          </div>
        </div>
        <div className='flex text-sm gap-14'>
          <p>
            <span className='font-bold text-base'>{userPostData?.length}</span>{' '}
            Post
          </p>
          <p>
            <span className='font-bold text-base'>
              {userData?.followers?.length}
            </span>{' '}
            <SeeFollowerFollowingUser el={userData?.followers as LikeType[]} text={"Followers" as string} />
          </p>
          <p>
            <span className='font-bold text-base'>
              {userData?.followings?.length}
            </span>{' '}
            <SeeFollowerFollowingUser el={userData?.followings as LikeType[]} text={'Following' as string} />
          </p>
        </div>
        <p className='text-sm'>{userData?.name}</p>
        <p className='text-sm'>Hard word is a key of success...</p>
      </div>
    </header>
  );
}

export default memo(HeaderFile)
