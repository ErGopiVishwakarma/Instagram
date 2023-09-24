import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { AuthUser} from '../Types/reducerType';
import { ALLCHATS, ALLMESSAGE, ALLUSER, AUTH, AUTHUSER } from './actionType';
import { Stored } from '../Types/fromLocalStorage';
import { ChatType, MessageType } from '../Types/otherType';

interface DispatchType {
  type: string;
  payload: boolean;
}

// verifying auth user function here
export const authVerifiedFun = (dispatch: Dispatch<DispatchType>) => () => {
  var storedVerifiedAuthData: Stored | string;
  let storedAuthData = localStorage.getItem('xx12insta@123auth1t3ork0en');
  if (storedAuthData) {
    storedVerifiedAuthData = JSON.parse(storedAuthData);
  } else {
    return;
  }
  if (storedVerifiedAuthData) {
    dispatch({ type: AUTH, payload: true });
  }
  if (
    typeof storedVerifiedAuthData === 'object' &&
    storedVerifiedAuthData.expireIn < Date.now()
  ) {
    localStorage.removeItem('xx12insta@123auth1t3ork0en');
    window.location.reload();
  }
};

// getting the data of auth user
interface UserDispatchType {
  type: string;
  payload: AuthUser;
}

export const authUserdata =
  (id: string,token:string, dispatch: Dispatch<UserDispatchType>) => async () => {
  
      fetch(`http://localhost:8080/user/getuser/${id}`,{
        method:"GET",
        headers:{
          'Content-Type':"applicatoin/json",
          'Authorization':`Bearer ${token}`
        }
      }).then(ress=>ress.json()).then(
        (res: AxiosResponse<ChatType>) => {
          const chatsData:any = res;
          console.log('hii',res)
          dispatch({ type: AUTHUSER, payload: chatsData });
        }
      ).catch((err:any)=>console.log(err))
  };


//   login for getting all available user 
interface AllUserDispatchType {
    type: string;
    payload: AuthUser[];
  }

export const getAllUser =
  (token:string,dispatch: Dispatch<AllUserDispatchType>) => async () => {
  
      fetch(`http://localhost:8080/user/getalluser`,{
        method:"GET",
        headers:{
          'Content-Type':"applicatoin/json",
          'Authorization':`Bearer ${token}`
        }
      }).then(ress=>ress.json()).then(
        (res: AxiosResponse<ChatType>) => {
          const chatsData:any = res;
          dispatch({ type: ALLUSER, payload: chatsData });
        }
      ).catch((err:any)=>console.log(err))
  };


  // gettting all data of chats 
  interface AllChatDispatchType {
    type: string;
    payload: ChatType[];
  }

export const getAllChat =
  (token:string,dispatch: Dispatch<AllChatDispatchType>) => async () => {
  
    fetch(`http://localhost:8080/chat/allchat`,{
      method:"GET",
      headers:{
        'Content-Type':"applicatoin/json",
        'Authorization':`Bearer ${token}`
      }
    }).then(ress=>ress.json()).then(
      (res: AxiosResponse<ChatType>) => {
        const chatsData:any = res;
        dispatch({ type: ALLCHATS, payload: chatsData });
      }
    ).catch((err:any)=>console.log(err))
  };



  // getting all messages 

  interface AllMessageDispatchType {
    type: string;
    payload: MessageType[];
  }

  export const getAllMessages =
  (token:string,chatId:string,dispatch: Dispatch<AllMessageDispatchType>) => {

    if(!chatId) {
      dispatch({ type: ALLMESSAGE, payload: [] }); 
      return 
    }
  
    fetch(`http://localhost:8080/message/message/${chatId}`,{
      method:"GET",
      headers:{
        'Content-Type':"applicatoin/json",
        'Authorization':`Bearer ${token}`
      }
    }).then(ress=>ress.json()).then(
      (res: AxiosResponse<MessageType>) => {
        const messageData:any = res;
        // console.log(res)
        dispatch({ type: ALLMESSAGE, payload: messageData });
      }
    ).catch((err:any)=>console.log(err))
  };