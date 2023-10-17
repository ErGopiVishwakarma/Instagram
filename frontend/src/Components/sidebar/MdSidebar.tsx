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
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { FiMenu } from 'react-icons/fi';
import { BiSolidHome, BiSolidShoppingBagAlt } from 'react-icons/bi';
import { IconType } from 'react-icons/lib/esm/iconBase';
import { NavLink } from 'react-router-dom';
import imgUrl from '../../Images/userimage.png';
import Create from '../../Pages/Creates';
import SearchDrawer from './SearchDrawer';
import { useSelector } from 'react-redux';
import { Initial } from '../../Types/reducerType';

export default function MdSidebar() {

  const checkAuth: any = useSelector((store: Initial) => store.authUser);

  return (
    <Card className='h-[calc(100vh)] max-w-[4.5rem] rounded-none py-4 px-2 border-solid border-1 border-r border-gray-500 box-border align-middle'>
      <div className='mb-2 p-4 flex justify-center'>
        <Typography variant='h5' color='blue-gray'>
          <BsInstagram className='h-6 w-6' />
        </Typography>
      </div>
      <List className='box-border min-w-0 w-full h-full p-0 align-middle gap-1 relative '>
        <NavLink to='/'>
          <ListItem className='flex justify-center'>
            <BiSolidHome className='h-6 w-6' />
          </ListItem>
        </NavLink>
        <SearchDrawer>
          <ListItem className='flex justify-center'>
            <BsSearch className='h-6 w-6' />
          </ListItem>
        </SearchDrawer>
        <ListItem className='flex justify-center'>
          <MdOutlineExplore className='h-6 w-6' />
        </ListItem>
        <ListItem className='flex justify-center'>
          <GoVideo className='h-6 w-6' />
        </ListItem>
        <NavLink to='/message'>
          <ListItem className='flex justify-center'>
            <PiTelegramLogoBold className='h-6 w-6' />
          </ListItem>
        </NavLink>
        <ListItem className='flex justify-center'>
          <AiOutlineHeart className='h-6 w-6' />
        </ListItem>
        <Create>
          <ListItem className='flex justify-center'>
            <GrAddCircle className='h-6 w-6' />
          </ListItem>
        </Create>
        <NavLink to={`/profile/${checkAuth._id}`}>
          <ListItem className='flex justify-center'>
            <Avatar className='h-6 w-6' src={imgUrl} />
          </ListItem>
        </NavLink>
        <ListItem className='flex justify-center absolute bottom-0'>
          <FiMenu className='h-6 w-6' />
        </ListItem>
      </List>
    </Card>
  );
}
