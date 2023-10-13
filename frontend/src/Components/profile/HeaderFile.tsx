import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HeaderFile() {
  return (
    <header className='flex gap-[100px] tracking-wider' style={{ fontFamily: 'sans-serif' }}>
      <div>
        <img
          src='https://i.pinimg.com/736x/98/1f/05/981f0513df876d4235b7ad3aa0c58817.jpg'
          className=' h-[152px] w-[152px] rounded-full'
        />
      </div>
      <div className='flex flex-col gap-[15px]'>
        <div className='flex gap-4 items-center pb-2'>
          <p className='text-[20px]'>gopi_v777</p>
          <button className='px-4 py-1 bg-gray-200 rounded-md text-sm cursor-pointer'>
            Edit profile
          </button>
          <button className='px-4 py-1 bg-gray-200 rounded-md text-sm cursor-not-allowed'>
            View archive
          </button>
          <button className='px-4 py-1 bg-gray-200 rounded-md text-sm cursor-not-allowed'>
            Add tools
          </button>
          <FiSearch />
        </div>
        <div className='flex text-sm gap-14'>
          <p><span className='font-bold text-base'>8</span> post</p>
          <p><span className='font-bold text-base'>58</span> Followers</p>
          <p><span className='font-bold text-base'>81</span> Following</p>
        </div>
        <p className='text-sm'>Gopi Vishwakarma</p>
        <p className='text-sm'>struggle</p>
        <p className='text-sm'>https://www.instagram.com/p/CkncHIopiD7/</p>
      </div>
    </header>
  );
}
