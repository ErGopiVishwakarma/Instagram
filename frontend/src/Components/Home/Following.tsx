import { Avatar } from '@material-tailwind/react';
import React from 'react';
import { family } from '../../Styles/fonts';
import '../../Styles/following .css';
import { useRef, useState } from 'react';
const items = [1, 2, 3, 4, 5, 6, 7, 8,9,10,1,1,1,1,1,1,1,1,,1,1,1,1,1]; // Sample items
const Following = () => {
  const container: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = items.length;
    let visibleItems = 8;
  
    const scrollCarousel = (direction: any) => {
      visibleItems = Math.min(totalItems, 8)
      if(totalItems <= visibleItems) return
      const newIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        totalItems - visibleItems,
      );
      setCurrentIndex(newIndex);
      visibleItems = totalItems-visibleItems
    }

  return (
    <div
      ref={container}
      className='gap-4 mx-10 overflow-x-auto max-w-[100%] box-border relative customCss hidden md:flex lg:flex'
      style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className='carousel-container'>
      <div className='carousel-wrapper'>
        <div
          className='carousel flex'
          style={{ transform: `translateX(${-currentIndex * 110}px)` }}>
          {items.map((item, index) => (
            <div className='flex gap-2 items-center flex-col'>
              <div className='w-16'>
                <Avatar
                  src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                  className='h-16 w-16 border-solid border-2 border-red-400'
                />
              </div>
              <p className=' text-xs'>gopihii...</p>
            </div>
          ))}
        </div>
      </div>
      <button className='prev-button' onClick={() => scrollCarousel(-1)}>
        Left
      </button>
      <button className='next-button' onClick={() => scrollCarousel(1)}>
        Right
      </button>
     </div>
    </div>
  );
};

export default Following;

