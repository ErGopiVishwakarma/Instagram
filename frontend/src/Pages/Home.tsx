import React, { useEffect } from 'react';
import Following from '../Components/Home/Following';
import Post from '../Components/Home/Post';
import Likeshare from '../Components/Home/Likeshare';
import Comment from '../Components/Home/Comment';
import SuggestedProfile from '../Components/Home/SuggestedProfile';
import LgSidebar from '../Components/sidebar/LgSidebar';
import MdSidebar from '../Components/sidebar/MdSidebar';
import { useSelector } from 'react-redux';
import HomeSearch from '../Components/Home/HomeSearch';
import SmSidebar from '../Components/sidebar/SmSidebar';

const Home = () => {
  const ab = useSelector((store) => console.log(store));

  return (
    <div className='w-full h-[100vh] flex  '>
      <div>
        <HomeSearch />
      </div>
      {/* left side bar code  */}
      <div className='hidden md:hidden lg:block'>
        <LgSidebar />
      </div>
      <div className='hidden lg:hidden md:block'>
        <MdSidebar />
      </div>
      {/* main div code of post  */}
      <div className='w-full overflow-auto flex py-10 md:py-8 sm:py-14'>
        <div className='w-full md:w-full lg:w-[65%]'>
          <div className='w-[100%]'>
            <Following />
            <div className='w-full md:w-[70%] lg:w-[70%] m-auto pb-10 px-2'>
              <Post />
              <div className='px-2'>
                <Likeshare />
                <Comment />
              </div>
            </div>
          </div>
        </div>
        {/* right side bar code  */}
        <div className='w-[35%] px-8 hidden md:hidden lg:block'>
          <SuggestedProfile />
        </div>
      </div>
      <SmSidebar />
    </div>
  );
};

export default Home;
