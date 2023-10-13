import React, { useEffect } from 'react';
import AllRoute from './Routes/AllRoute';
import { useDispatch, useSelector } from 'react-redux';
import { Initial } from './Types/reducerType';
import { authUserdata, authVerifiedFun, getAllChat, getAllPost, getAllUser } from './Redux/action';




function App() {
  const dispatch = useDispatch();
  const data = useSelector((store:Initial)=>store.localStorageData)
  // verifying auth user
  window.addEventListener('load', authVerifiedFun(dispatch));

  //geting auth user data
  window.addEventListener('load',authUserdata(data.id,data.token,dispatch))

  // getting all user 
  window.addEventListener('load',getAllUser(data.token,dispatch))

  // get all chat 
  window.addEventListener('load',getAllChat(data.token,dispatch))

  //get all post 
  window.addEventListener('load',getAllPost(data.token,dispatch))
  
  const a = useSelector((store:Initial)=>console.log(store))

  return (
    <div className='relative'>
      <AllRoute />
      {/* <ProfileMenu /> */}

    </div>
  );
}

export default App;
