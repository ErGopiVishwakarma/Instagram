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
import { Initial } from '../Types/reducerType';

const Home = () => {
  // const ab = useSelector((store) => console.log(store));
  // const posts = useSelector((store:Initial)=>store.post)

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
      <div className='w-full overflow-auto flex py-10 md:py-8 '>
        <div className='w-full md:w-full lg:w-[65%]'>
          <div className='w-[100%]'>
            <Following />
            {/* all post come here  */}
             <Post />
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
