import { Avatar, Input, ListItem } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { BsHeart, BsInstagram } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useSelector } from 'react-redux';
import imageurl from '../../Images/userPic.jpg';

const HomeSearch = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const data = useSelector((store: Initial) => store.localStorageData);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<AuthUser[] | []>([]);

  function debounce(func: (text: string) => void, delay: number) {
    let timer: any;
    return function (str: string) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(str);
      }, delay);
    };
  }

  const fetchFunction = async (text: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/search?search=${text}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        },
      ).then((res) => res.json());
      setSearchData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  let debounceSearch = debounce(fetchFunction, 500);

  useEffect(() => {
    debounceSearch(searchText);
  }, [searchText]);

  return (
    <div className='w-full flex md:hidden lg:hidden justify-evenly absolute top-0 z-10 items-center border-b border-gray-400 bg-white mb-3 py-[6px]'>
      <NavLink to='/'>
        <ListItem className='flex justify-center'>
          <BsInstagram className='h-6 w-6' />
        </ListItem>
      </NavLink>
      <div className='w-full'>
        <input
          className='w-full h-9 text-base pl-3 bg-gray-300 border-none focus:outline-none rounded-lg'
          placeholder='search and press enter'
          onFocus={() => setSearchVisible(true)}
          onBlur={() => setSearchVisible(false)}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div
        className={`bg-white mt-[60px] absolute top-0 z-50 min-h-12 w-full rounded-lg ${
          searchVisible ? 'block' : 'hidden'
        }`}
        style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        {searchData.length > 0 ? (
          searchData?.map((el) => {
            return (
              <NavLink to={`/profile/${el?._id}`}>
                <div className='flex items-center gap-3 cursor-pointer w-full hover:bg-blue-gray-200 px-6 py-2 rounded-md'>
                  <Avatar
                    src={el?.profile ? `${process.env.REACT_APP_URL}/${el?.profile}` : imageurl}
                    className='h-11 w-11 '
                  />
                  <div>
                    <p className='text-sm'>{el?.name}</p>
                    <p className='text-xs text-[rgb(115, 115, 115)]'>
                      {el?.username}
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })
        ) : (
          <p className=' text-center'>no recent search</p>
        )}
      </div>
      <NavLink to=''>
        <ListItem className='flex justify-center'>
          <BsHeart className='h-6 w-6' />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default HomeSearch;
