import React from 'react'
import imageurl from '../../Images/userimage.png';
import { Avatar } from '@material-tailwind/react';

interface HoverDetail {
    showPopup:boolean;
    setShowPopup:React.Dispatch<React.SetStateAction<boolean>>
}

const HoverDetailPopup = ({showPopup,setShowPopup}:HoverDetail) => {
  return (
    <div
    className={`h-[350px] w-[350px]  bg-white  flex-col gap-3 transition-all duration-2000 ease-in-out delay-500 ${
      showPopup ? ' opacity-100 flex ' : 'opacity-0 hidden '
    } rounded-md`} style={{boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}}
    onMouseOver={() => setShowPopup(true)}
    onMouseOut={() => setShowPopup(false)}>
    <div className='flex items-center gap-3 p-4'>
      <Avatar src={imageurl} className='h-14 w-14 ' />
      <div>
        <p className='text-sm'>gpi vishaksdfkads</p>
        <p className='text-xs text-[rgb(115, 115, 115)]'>
          kadkdfkdfk
        </p>
      </div>
    </div>
    <div className=' grid-cols-3 grid'>
      <div className=' flex flex-col gap-2 justify-center items-center'>
        <p className=' text-xs font-bold'>1234</p>
        <p className=' text-xs'>gopisingh</p>
      </div>
      <div className=' flex flex-col gap-2 justify-center items-center'>
        <p className=' text-xs font-bold'>2222</p>
        <p className=' text-xs'>gopisingh</p>
      </div>
      <div className=' flex flex-col gap-2 justify-center items-center'>
        <p className=' text-xs font-bold'>7</p>
        <p className=' text-xs'>gopisingh</p>
      </div>
    </div>
    <div className='grid-cols-3 grid gap-1'>
      <img
        src='http://localhost:8080/1696378152909_image.jpg'
        className=' h-full w-full'
      />
      <img
        src='http://localhost:8080/1696388527263_image.jpg'
        className=' h-full w-full'
      />
      <img
        src='http://localhost:8080/1696378152909_image.jpg'
        className=' h-full w-full'
      />
    </div>
    <div className='flex justify-between px-10'>
      <button className=' px-4 py-1 bg-blue-300'>Message</button>
      <button className=' px-4 py-1 bg-blue-300'>following</button>
    </div>
  </div>
  )
}

export default HoverDetailPopup