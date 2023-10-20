import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from '@material-tailwind/react';
import Posts from './PanalSection/Posts';
import { BsCamera } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import { PostType } from '../../Types/otherType';

const ProfilePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('post');

  const [userData, setUserData] = useState<AuthUser>();
  const [post, setPost] = useState<PostType[] | []>([]);
  const { id } = useParams();
  const allUser = useSelector((store: Initial) => store.user as AuthUser[]);
  const allPost = useSelector((store: Initial) => store.post as PostType[]);
  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);

  useEffect(() => {
    let userDetail = allUser.find((el, ind) => el._id == id);
    let postDetail = allPost.filter((el: any , ind) => el?.postedBy?._id == id);
    setPost(postDetail);
    setUserData(userDetail);
  }, [id, allPost, allUser]);

  return (
    <Tabs value={activeTab} animate={'none'}>
      <TabsHeader
        className='rounded-none border-t border-blue-gray-100 bg-transparent gap-8 p-0 flex justify-center tracking-wider'
        indicatorProps={{
          className:
            'bg-transparent border-t-[1px] border-gray-900 shadow-none rounded-none',
        }}>
        <Tab
          key={'post'}
          value={'post'}
          onClick={() => setActiveTab('post')}
          className={` py-4 w-auto ${
            activeTab === 'post' ? 'text-gray-900' : ''
          }`}>
          <p className='text-xs'>POSTS</p>
        </Tab>

        <Tab
          key={'reels'}
          value={'reels'}
          onClick={() => setActiveTab('reels')}
          className={` px-3 py-4 w-auto ${
            activeTab === 'reels' ? 'text-gray-900' : ''
          }`}>
          <p className='text-xs'>REELS</p>
        </Tab>

        {checkAuth?._id === id ? (
          <Tab
            key={'saved'}
            value={'saved'}
            onClick={() => setActiveTab('saved')}
            className={` px-3 py-4 w-auto ${
              activeTab === 'saved' ? 'text-gray-900' : ''
            }`}>
            <p className='text-xs'>SAVED</p>
          </Tab>
        ) : (
          ''
        )}

        <Tab
          key={'tagged'}
          value={'tagged'}
          onClick={() => setActiveTab('tagged')}
          className={` px-3 py-4 w-auto ${
            activeTab === 'tagged' ? 'text-gray-900' : ''
          }`}>
          <p className='text-xs'>TAGGED</p>
        </Tab>
      </TabsHeader>
      <TabsBody className=' tracking-wider relative z-0'>
        {/* here is the first panel  */}
        <TabPanel key={'post'} value={'post'} className='px-0'>
          {loading ? (
            <div className='py-5 flex justify-center items-center'>
              <Spinner className='h-8 w-8' />
            </div>
          ) : post?.length > 0 ? (
            <div className='grid grid-cols-3 gap-1'>
              {post?.map((el, ind) => {
                return <Posts el={el} key={ind} />;
              })}
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-1 pt-3'>
              <div className='border-[1px] border-solid border-black h-16 w-16 flex justify-center items-center rounded-full'>
                <BsCamera className='h-9 w-9' />
              </div>
              <p className='text-[20px] text-black font-bold'>No post yet.</p>
            </div>
          )}

          {/* bottom part here  */}
          <div className='text-xs flex flex-col justify-center items-center gap-3 pt-[30px] cursor-pointer'>
            <p className='' style={{ wordSpacing: '8px' }}>
              Meta About Blog Jobs Help API Privacy Terms Locations Instagram
              Lite Threads Contact Uploading & Non-Users Meta Verified
            </p>
            <p className='' style={{ wordSpacing: '10px' }}>
              English © 2023 Instagram from Meta
            </p>
          </div>
        </TabPanel>
        {/* second panel  */}
        <TabPanel key={'reels'} value={'reels'} className='px-0'>
          {loading ? (
            <div className='py-5 flex justify-center items-center'>
              <Spinner className='h-8 w-8' />
            </div>
          ) : post?.length > 0 ? (
            <div className='grid grid-cols-4 gap-1'>
              {post?.map((el, ind) => {
                return <Posts el={el} key={ind} />;
              })}
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center gap-1 pt-3'>
              <div className='border-[1px] border-solid border-black h-16 w-16 flex justify-center items-center rounded-full'>
                <BsCamera className='h-9 w-9' />
              </div>
              <p className='text-[20px] text-black font-bold'>No post yet.</p>
            </div>
          )}

          {/* bottom part here  */}
          <div className='text-xs flex flex-col justify-center items-center gap-3 pt-[30px] cursor-pointer'>
            <p className='' style={{ wordSpacing: '8px' }}>
              Meta About Blog Jobs Help API Privacy Terms Locations Instagram
              Lite Threads Contact Uploading & Non-Users Meta Verified
            </p>
            <p className='' style={{ wordSpacing: '10px' }}>
              English © 2023 Instagram from Meta
            </p>
          </div>
        </TabPanel>
        {/* third panel  */}
        {checkAuth?._id === id ? (
          <TabPanel key={'saved'} value={'saved'} className='px-0'>
            {loading ? (
              <div className='py-5 flex justify-center items-center'>
                <Spinner className='h-8 w-8' />
              </div>
            ) : post?.length > 0 ? (
              <div className='grid grid-cols-3 gap-1'>
                {post?.map((el, ind) => {
                  return <Posts el={el} key={ind} />;
                })}
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center gap-1 pt-3'>
                <div className='border-[1px] border-solid border-black h-16 w-16 flex justify-center items-center rounded-full'>
                  <BsCamera className='h-9 w-9' />
                </div>
                <p className='text-[20px] text-black font-bold'>No post yet.</p>
              </div>
            )}

            {/* bottom part here  */}
            <div className='text-xs flex flex-col justify-center items-center gap-3 pt-[30px] cursor-pointer'>
              <p className='' style={{ wordSpacing: '8px' }}>
                Meta About Blog Jobs Help API Privacy Terms Locations Instagram
                Lite Threads Contact Uploading & Non-Users Meta Verified
              </p>
              <p className='' style={{ wordSpacing: '10px' }}>
                English © 2023 Instagram from Meta
              </p>
            </div>
          </TabPanel>
        ) : (
          ''
        )}
        {/* forth panel  */}
        <TabPanel key={'tagged'} value={'tagged'} className='px-0'>
          <div className='flex flex-col justify-center items-center gap-1 py-6'>
            <div className='border-[1px] border-solid border-black h-16 w-16 flex justify-center items-center rounded-full'>
              <BsCamera className='h-9 w-9' />
            </div>
            <p className='text-[20px] text-black font-bold'>No post yet.</p>
          </div>

          {/* bottom part here  */}
          <div className='text-xs flex flex-col justify-center items-center gap-3 pt-[30px] cursor-pointer'>
            <p className='' style={{ wordSpacing: '8px' }}>
              Meta About Blog Jobs Help API Privacy Terms Locations Instagram
              Lite Threads Contact Uploading & Non-Users Meta Verified
            </p>
            <p className='' style={{ wordSpacing: '10px' }}>
              English © 2023 Instagram from Meta
            </p>
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

export default ProfilePost;
