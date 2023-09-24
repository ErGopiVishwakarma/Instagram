import React, { ReactNode, useState, useContext } from 'react';
import { Dialog, DialogBody, Avatar } from '@material-tailwind/react';
import { Node } from 'typescript';
import { GrClose } from 'react-icons/gr';
import { AuthUser, Initial } from '../../Types/reducerType';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import SearchSkelton from '../skelton/SearchSkelton';
import { Context, ContextType } from '../../Routes/ContextProvider';

interface Children {
  children: ReactNode;
}

export default function NewChatSearchModal({ children }: Children) {
const {selectedChat,setSelectedChat, chats, setChats} = useContext(Context) as ContextType
  const [loading, setLoading] = useState<boolean>(false);
  const [chatLoading, setChatLoading] = useState<boolean>(false)
  const [searchData, setSearchData] = useState<AuthUser[]>([]);
  const token: string = useSelector(
    (store: Initial) => store.localStorageData.token,
  );

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);
  toast('hellow');
  
// search user code
  const handleSearch = async (searchValue: string) => {
    <Toaster position='top-center' reverseOrder={false} />;
    if (!searchData) {
      alert('fields are required');
      return;
    }
    try {
      setLoading(true);
      const data = await fetch(
        `http://localhost:8080/user/search?search=${searchValue}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      ).then((res) => res.json());
      setSearchData(data);
      setLoading(false);
    } catch (error) {
      alert(error);
      return;
    }
  };

  // create new chat code
  const createNewChat = async(userId:string) =>{
    try {
      setChatLoading(true)
      let userObj={
          userId
      }
      const data = await fetch(`http://localhost:8080/chat`, {
          method: 'POST',
          headers: {
              "Content-Type":'application/json',
              authorization: `Bearer ${token}`
          },
          body:JSON.stringify(userObj)
      }).then(res => res.json())

      if(!chats?.find((element:AuthUser)=>element._id === data._id)) setChats([data,...chats])
      setChatLoading(false)
      setSelectedChat(data)
      handleOpen()            
      
   } catch (error) {
     alert('something went wrong')
      return;
   }
  }


  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog open={open} handler={handleOpen} className='text-black'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h3 className='text-lg'>New message</h3>
          <div onClick={handleOpen} className=' cursor-pointer'>
            <GrClose />
          </div>
        </div>
        <DialogBody className='p-0'>
          <div className='flex flex-col gap-3 text-black'>
            <div
              className='flex gap-6 items-center justify-center flex-row h-10 px-5'
              style={{
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
              }}>
              <h4 className='text-black text-base text-center font-bold'>
                To:
              </h4>
              <input
                className={
                  'focus:outline-0 rounded-md text-sm pl-2 w-full text-black'
                }
                placeholder='search'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className=' h-64 overflow-y-auto'>
              {searchData.length > 0 ? (
                loading ? (
                  <SearchSkelton />
                ) : (
                  searchData?.map((el, ind) => {
                    return (
                      <div className='flex flex-row gap-2 px-5 py-3 items-center hover:bg-gray-400 cursor-pointer' onClick={()=>createNewChat(el._id)} key={ind}>
                        <Avatar
                          src={el.profile}
                          className=' h-11 w-11'
                          alt={el.name}
                        />
                        <div className='flex flex-col'>
                          <p className='text-sm font-bold'>{el.name}</p>
                          <p className='text-sm'>{el.username}</p>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p className='p-5'>No search result.</p>
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
