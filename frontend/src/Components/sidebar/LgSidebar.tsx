import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from '@material-tailwind/react';
import { BsSearch } from 'react-icons/bs';
import { GoVideo } from 'react-icons/go';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { MdOutlineExplore } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { FiMenu } from 'react-icons/fi';
import { BiSolidHome, BiSolidShoppingBagAlt } from 'react-icons/bi';
import { IconType } from 'react-icons/lib/esm/iconBase';
import SearchDrawer from './SearchDrawer';
import { NavLink } from 'react-router-dom';
import Create from '../../Pages/Creates';
import { useSelector } from 'react-redux';
import { AuthUser, Initial } from '../../Types/reducerType';
import imageurl from '../../Images/userPic.jpg'
import LogOut from '../../Pages/LogOut';

export default function LgSidebar() {
  const checkAuth = useSelector((store: Initial) => store.authUser as AuthUser);

  return (
    <Card className='h-[calc(100vh)] w-full max-w-[15.5rem] rounded-none py-4 px-2 shadow-xl shadow-blue-gray-900/5 border-r border-gray-400 sticky top-0 '>
      <div className='mb-2 p-4'>
        <Typography variant='h4' color='blue-gray'>
          Myinsta
        </Typography>
      </div>
      <List className='gap-2'>
        <NavLink to='/'>
          <ListItem>
            <ListItemPrefix>
              <BiSolidHome className='h-6 w-6' />
            </ListItemPrefix>
            Home
          </ListItem>
        </NavLink>
        <SearchDrawer>
          <ListItem>
            <ListItemPrefix>
              <BsSearch className='h-6 w-6' />
            </ListItemPrefix>
            Search
          </ListItem>
        </SearchDrawer>
        <ListItem>
          <ListItemPrefix>
            <MdOutlineExplore className='h-6 w-6' />
          </ListItemPrefix>
          Explore
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <GoVideo className='h-6 w-6' />
          </ListItemPrefix>
          Reels
        </ListItem>
        <NavLink to='/message'>
          <ListItem>
            <ListItemPrefix>
              <PiTelegramLogoBold className='h-6 w-6' />
            </ListItemPrefix>
            Message
          </ListItem>
        </NavLink>
        <ListItem>
          <ListItemPrefix>
            <AiOutlineHeart className='h-6 w-6' />
          </ListItemPrefix>
          Notification
        </ListItem>
        <Create>
          <ListItem>
            <ListItemPrefix>
              <GrAddCircle className='h-6 w-6' />
            </ListItemPrefix>
            Create
          </ListItem>
        </Create>
        <NavLink to={`/profile/${checkAuth._id}`}>
          <ListItem>
            <ListItemPrefix>
              <Avatar
                className='h-6 w-6'
                src={checkAuth?.profile?`${process.env.REACT_APP_URL}/${checkAuth?.profile}` : imageurl }
              />
            </ListItemPrefix>
            Profile
          </ListItem>
        </NavLink>
       <LogOut>
       <ListItem>
          <ListItemPrefix>
            <FiMenu className='h-6 w-6' />
          </ListItemPrefix>
          Logout
        </ListItem>
       </LogOut>
      </List>
    </Card>
  );
}
