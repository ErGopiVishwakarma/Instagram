import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderFile from '../Components/profile/HeaderFile';
import LgSidebar from '../Components/sidebar/LgSidebar';
import MdSidebar from '../Components/sidebar/MdSidebar';
import ProfilePost from '../Components/profile/ProfilePost';
import { BsPlus } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../Types/reducerType';
import { PostType } from '../Types/otherType';
import { AxiosResponse } from 'axios';
import SmSidebar from '../Components/sidebar/SmSidebar';

export default function Profile() {
  const { id } = useParams();
  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);
  const [userData, setUserData] = useState<AuthUser>();
  const [userPostData, setUserPostData] = useState<PostType[] | []>();
  const data = useSelector((store: Initial) => store.localStorageData);
  const [againRender, setAgainRender] = useState<boolean>(false);

  const getUserProfile = (id: string | undefined, token: string) => {
    fetch(`${process.env.REACT_APP_URL}/user/userprofile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((ress) => ress.json())
      .then((res: AxiosResponse<PostType>) => {
        const userData: any = res;
        // console.log(userData)
        setUserData(userData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

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
        // console.log(postData)
        setUserPostData(postData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserProfile(id, data.token);
  }, [id,againRender]);

  useEffect(() => {
    getUserPost(id, data.token);
  }, [id]);

  return (
    <div className='w-full flex'>
      {/* left part  */}
      <div>
        <div className='hidden md:hidden lg:block z-50'>
          <LgSidebar />
        </div>
        <div className='hidden lg:hidden md:block'>
          <MdSidebar />
        </div>
      </div>
      {/* right part  */}
      <div className='w-full h-[100vh] px-[4px] md:px-4 lg:px-20 pt-10 pb-12 overflow-y-auto '>
        {/* profile part  */}
        <div className='pl-0 md:pl-4 lg:pl[70px]'>
          <HeaderFile
            userData={userData as AuthUser}
            userPostData={userPostData as PostType[]}
            setUserData={setUserData}
            setAgainRender = {setAgainRender}
          />
        </div>
        {/* add new + sign part  */}
        {checkAuth?._id === id ? (
          <div className='flex p-10 w-full'>
            <div className='flex flex-col gap-3 items-center cursor-pointer'>
              <div className='h-[80px] w-[80px] border-solid border-[1px] border-gray-400 rounded-full flex justify-center items-center bg-[#f0eeee]'>
                <BsPlus className='h-16 w-16 text-[#b7b6b6]' />
              </div>
              <p className='text-xs'>New</p>
            </div>
          </div>
        ) : (
          <div className='flex p-10 w-full'></div>
        )}
        {/* post part  */}
        <div>
          <ProfilePost />
        </div>
      </div>
      <SmSidebar />
    </div>
  );
}
