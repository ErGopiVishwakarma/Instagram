
import { Avatar } from '@material-tailwind/react';
import React, { useRef, useState, useEffect } from 'react';
import { BiChevronLeftCircle } from 'react-icons/bi';
import { IoIosArrowDropright } from 'react-icons/io';
import { family } from '../../Styles/fonts';

const items = [1, 2, 3, 4, 5, 6, 7, 8,1,1,1,1]; // Sample items

const Following = () => {
  const container = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const totalItems = items.length;
  const visibleItems = 8;

  useEffect(() => {
    if (totalItems <= visibleItems) {
      setShowLeftButton(false);
      setShowRightButton(false);
    } else if (currentIndex === 0) {
      setShowLeftButton(false);
      setShowRightButton(true);
    } else if (currentIndex === totalItems - visibleItems) {
      setShowLeftButton(true);
      setShowRightButton(false);
    } else {
      setShowLeftButton(true);
      setShowRightButton(true);
    }
  }, [currentIndex, totalItems, visibleItems]);

  const scrollCarousel = (direction: number) => {
    const newIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      totalItems - visibleItems
    );
    setCurrentIndex(newIndex);
  };

  return (
    <div
      ref={container}
      className='gap-4 mx-12 sm:mx-12 md:mx-20 lg:mx-12 mb-9 overflow-x-hidden max-w-[100%] box-border relative customCss hidden md:flex lg:flex'
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className='carousel-container'>
        <div className='carousel-wrapper'>
          <div
            className='carousel flex gap-[17px]'
            style={{ transform: `translateX(${-currentIndex * 110}px)` }}
          >
            {items.map((item, index) => (
              <div className='flex gap-1 items-center flex-col' key={index}>
                <div className='w-16'>
                  <Avatar
                    src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
                    className='h-16 w-16 border-solid border-[3px] border-red-400 p-[2px]'
                  />
                </div>
                <p className='text-xs'>gopihii...</p>
              </div>
            ))}
          </div>
        </div>
        {showLeftButton && (
          <button
            className='prev-button absolute left-3 top-[30%] bg-cyan-400 text-xl rounded-lg'
            onClick={() => scrollCarousel(-1)}
          >
            <BiChevronLeftCircle />
          </button>
        )}
        {showRightButton && (
          <button
            className='next-button absolute right-3 top-[30%] bg-cyan-400 text-xl rounded-lg'
            onClick={() => scrollCarousel(1)}
          >
            <IoIosArrowDropright />
          </button>
        )}
      </div>
    </div>
  );
};

export default Following;






















// import { Avatar } from '@material-tailwind/react';
// import React from 'react';
// import { family } from '../../Styles/fonts';
// import '../../Styles/following .css';
// import { useRef, useState } from 'react';
// import { BiChevronLeftCircle } from 'react-icons/bi';
// import { IoIosArrowDropright } from 'react-icons/io'
// const items = [1, 2, 3, 4, 5, 6, 7, 8,9,10]; // Sample items
// const Following = () => {
//   const container: React.RefObject<HTMLDivElement> =
//     useRef<HTMLDivElement>(null);

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const totalItems = items.length;
//     let visibleItems = 8;
  
//     const scrollCarousel = (direction: any) => {
//       visibleItems = Math.min(totalItems, 8)
//       if(totalItems <= visibleItems) return
//       const newIndex = Math.min(
//         Math.max(currentIndex + direction, 0),
//         totalItems - visibleItems,
//       );
//       setCurrentIndex(newIndex);
//       visibleItems = totalItems-visibleItems
//     }

//   return (
//     <div
//       ref={container}
//       className='gap-4 mx-10 overflow-x-auto max-w-[100%] box-border relative customCss hidden md:flex lg:flex'
//       style={{ fontFamily: 'Poppins, sans-serif' }}>
//       <div className='carousel-container'>
//       <div className='carousel-wrapper'>
//         <div
//           className='carousel flex gap-3'
//           style={{ transform: `translateX(${-currentIndex * 110}px)` }}>
//           {items.map((item, index) => (
//             <div className='flex gap-1 items-center flex-col'>
//               <div className='w-16 '>
//                 <Avatar
//                   src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
//                   className='h-16 w-16 border-solid border-[3px] border-red-400 p-[2px]'
//                 />
//               </div>
//               <p className=' text-xs'>gopihii...</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button className='prev-button absolute left-3 top-[30%] bg-white text-xl rounded-lg' onClick={() => scrollCarousel(-1)}>
//         <BiChevronLeftCircle />
//       </button>
//       <button className='next-button absolute right-3 top-[30%] bg-white text-xl rounded-lg' onClick={() => scrollCarousel(1)}>
//        <IoIosArrowDropright />
//       </button>
//      </div>
//     </div>
//   );
// };

// export default Following;

