import React, { ReactNode, useEffect, useState } from 'react';
import { Drawer } from '@material-tailwind/react';
import {
  Card,
  Typography,
  List,
  ListItem,
  Avatar,
} from '@material-tailwind/react';
import { BsSearch, BsInstagram } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { MdBlindsClosed, MdOutlineExplore } from 'react-icons/md';
import { AiOutlineClose, AiOutlineHeart } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { FiDelete, FiMenu } from 'react-icons/fi';
import { BiSolidHome, BiSolidShoppingBagAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import { NavLink } from 'react-router-dom';
import imageurl from '../../Images/userPic.jpg';

interface Children {
  children: ReactNode;
}

export default function SearchDrawer({ children }: Children) {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
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
    <React.Fragment>
      <span onClick={openDrawer}>{children}</span>
      <Drawer
        open={open}
        overlay={false}
        onClose={closeDrawer}
        className={`flex transition-all w-[450px]  ${
          open
            ? 'duration-1000 ease-in-out transform translate-x-0'
            : 'duration-600 ease-in-out transform -translate-x-full'
        }`}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
          zIndex: 9999,
        }}
        size={450}>
        <Card className='h-[calc(100vh)] max-w-[4.5rem] rounded-none py-4 px-2 border-solid border-1 border-r border-gray-300 box-border align-middle '>
          <div className='mb-2 p-4 flex justify-center'>
            <Typography variant='h5' color='blue-gray'>
              <BsInstagram className='h-6 w-6' />
            </Typography>
          </div>
          <List className='box-border min-w-0 w-full h-full p-0 align-middle gap-1 relative'>
            <ListItem className='flex justify-center'>
              <BiSolidHome className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center' onClick={closeDrawer}>
              <BsSearch className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <MdOutlineExplore className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <GoVideo className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <PiTelegramLogoBold className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <AiOutlineHeart className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <GrAddCircle className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center'>
              <Avatar className='h-6 w-6' />
            </ListItem>
            <ListItem className='flex justify-center absolute bottom-0'>
              <FiMenu className='h-6 w-6' />
            </ListItem>
          </List>
        </Card>
        <div
          className=' w-[378px] box-border bg-white rounded-lg border-1 border-b border-gray-300'
          style={{ zIndex: 9999 }}>
          <div className='border-1 border-b border-gray-300  flex flex-col gap-8 p-5'>
            <h1 className='font-bold text-2xl'>Search</h1>
            <div className=''>
              <input
                className='w-full hover:outline-none focus:border-none border-none outline-none  hover:border-none rounded-md pl-4 placeholder:text-gray-800 text-black bg-brown-50 h-10'
                placeholder='search...'
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full h-[calc(100vh - 150px)] flex flex-col p-3  '>
            {searchData.length > 0 ? (
              searchData?.map((el) => {
                return (

                    <NavLink to={`/profile/${el._id}`}>
                      <div className='flex items-center gap-3 cursor-pointer w-full hover:bg-blue-gray-200 px-6 py-2 rounded-md'>
                        <Avatar
                          src={el?.profile ? el?.profile : imageurl}
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
              <p>no recent search</p>
            )}
            {/* <p>no recent search</p> */}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
