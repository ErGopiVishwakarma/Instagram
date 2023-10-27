import React, { useEffect } from 'react';
import Following from '../Components/Home/Following';
import Post from '../Components/Home/Post';
import SuggestedProfile from '../Components/Home/SuggestedProfile';
import LgSidebar from '../Components/sidebar/LgSidebar';
import MdSidebar from '../Components/sidebar/MdSidebar';
import { useSelector } from 'react-redux';
import SmSidebar from '../Components/sidebar/SmSidebar';
import { Initial } from '../Types/reducerType';
import { PostType } from '../Types/otherType';
import HomeSearch from '../Components/Home/HomeSearch';
import { Spinner } from '@material-tailwind/react';

const Home = () => {
  const posts = useSelector((store: Initial) => store.post);

  return (
    <div className='w-full h-[100vh] flex relative '>
      <div>
        {/* search for base screen */}
        <HomeSearch />
      </div>
      {/* left side bar code  */}
      <div className={`hidden md:hidden lg:block relative z-50  w-[15.5rem] ${posts?.length > 0 ? 'opacity-100' : 'opacity-10'}`}>
        <div className='hidden md:hidden lg:block'>
          <LgSidebar />
        </div>
      </div>
      <div className={`hidden lg:hidden md:block relative z-50 ${posts?.length > 0 ? 'opacity-100' : 'opacity-10'}`}>
        <MdSidebar />
      </div>
      {/* main div code of post  */}
      <div className='w-full overflow-auto flex py-12 md:py-8 lg:py-8 '>
        <div className='w-full md:w-full lg:w-[65%]'>
          <div className='w-[100%]'>
            {/* <Following /> */}
            {/* all post come here  */}
            {posts?.length > 0 ? (
              <div className='flex flex-col gap-2 pt-5 md:pt-0 lg:pt-0 pb-12 '>
                {posts.length > 0 ? (
                  posts.map((el, ind) => {
                    return <Post el={el as PostType} key={ind} />;
                  })
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div className=' w-full h-[100vh] flex justify-center items-center'>
                <div className=' flex flex-col gap-1 justify-center items-center'>
                  <Spinner className=' h-32 w-32 text-pink-400' />
                  <p>Loading...</p>
                  <p>If take more time please Refresh page once.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* right side bar code  */}
        <div className='w-[35%] pr-14 pl-10 hidden md:hidden lg:block py-2 '>
          <SuggestedProfile />
        </div>
      </div>
      <SmSidebar />
    </div>
  );
};

export default Home;
