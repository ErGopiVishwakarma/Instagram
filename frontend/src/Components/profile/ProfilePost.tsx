import React, { useState } from 'react';
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

let arr = [
  'https://i.pinimg.com/222x/cb/da/61/cbda61d1d510f2379cb3880b6c59044a.jpg',
  'https://i.pinimg.com/222x/cb/da/61/cbda61d1d510f2379cb3880b6c59044a.jpg',
  'https://i.pinimg.com/222x/cb/da/61/cbda61d1d510f2379cb3880b6c59044a.jpg',
];

const ProfilePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('post');
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

        <Tab
          key={'saved'}
          value={'saved'}
          onClick={() => setActiveTab('saved')}
          className={` px-3 py-4 w-auto ${
            activeTab === 'saved' ? 'text-gray-900' : ''
          }`}>
          <p className='text-xs'>SAVED</p>
        </Tab>

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
      <TabsBody className=' tracking-wider'>
        <TabPanel key={'post'} value={'post'} className='px-0'>
          {loading ? (
            <div className='py-5 flex justify-center items-center'>
              <Spinner className='h-8 w-8' />
            </div>
          ) : arr.length > 0 ? (
            <div className='grid grid-cols-3 gap-1'>
              {arr.map((el: string, ind) => {
                return <Posts el={el} />;
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

        <TabPanel key={'reels'} value={'reels'} className='px-0'>
          {loading ? (
            <div className='py-5 flex justify-center items-center'>
              <Spinner className='h-8 w-8' />
            </div>
          ) : arr.length > 0 ? (
            <div className='grid grid-cols-3 gap-1'>
              {arr.map((el: string, ind) => {
                return <Posts el={el} />;
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

        <TabPanel key={'saved'} value={'saved'} className='px-0'>
          {loading ? (
            <div className='py-5 flex justify-center items-center'>
              <Spinner className='h-8 w-8' />
            </div>
          ) : arr.length > 0 ? (
            <div className='grid grid-cols-3 gap-1'>
              {arr.map((el: string, ind) => {
                return <Posts el={el} />;
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
