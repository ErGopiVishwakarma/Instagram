import React from 'react';

const SearchSkelton = () => {
  let arr = new Array(5).fill(0);
  return (
    <div className=' flex flex-col gap-5'>
      {arr.map((el,ind) => {
        return (
          <div className='flex' key={ind}>
            <div className='flex-shrink-0'>
              <span className='w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700'></span>
            </div>

            <div className='ml-4 mt-2 w-full'>
              <h3
                className='h-4 bg-gray-200 rounded-md dark:bg-gray-700'
                style={{ width: '40%' }}></h3>
              <ul className='mt-2 space-y-3'>
                <li className='w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700'></li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSkelton;
