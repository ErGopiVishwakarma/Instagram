import { Reducer } from 'redux';
import { Action, Initial } from '../Types/reducerType';
import {
  ADDPOST,
  ALLCHATS,
  ALLMESSAGE,
  ALLUSER,
  AUTH,
  AUTHUSER,
  DELETEPOST,
  GETALLPOST,
  LIKEPOST,
  UPDATEMESSAGE,
  UPDATEUSER,
} from './actionType';
import { Stored } from '../Types/fromLocalStorage';

const storedData = localStorage.getItem('xx12insta@123auth1t3ork0en');
const authData: Stored = storedData ? JSON.parse(storedData) : false;

const initial: Initial = {
  auth: authData.auth,
  localStorageData: authData,
  authUser: {},
  chats: [],
  user: [],
  post: [],
  message: [],
};

export const reducer: Reducer<Initial, Action> = (
  state = initial,
  { type, payload }: Action,
) => {
  switch (type) {
    case AUTH:
      const authValue = typeof payload === 'boolean' ? payload : state.auth;
      return { ...state, auth: authValue };
    case AUTHUSER:
      return { ...state, authUser: payload };
    case ALLUSER:
      return { ...state, user: payload };
    case ALLCHATS:
      return { ...state, chats: payload };
    case ALLMESSAGE:
      return { ...state, message: payload };
    case UPDATEMESSAGE:
      return { ...state, message: [...state.message, payload] };
    case GETALLPOST:
      return { ...state, post: payload };
    case ADDPOST:
      return { ...state, post: [payload,...state.post] };
    case LIKEPOST:
      let filterData = state.post?.map((el) =>
        el._id !== payload._id ? el : payload,
      );
      return { ...state, post: [...filterData] };
    case DELETEPOST:
      let deletedData = state.post?.filter((el) => el._id !== payload._id);
      return { ...state, post: [...deletedData] };
    case UPDATEUSER:
      let updatedUserData = state.user?.map((el) =>
        el._id !== payload._id ? el : payload,
      );
      return  {...state, user:[...updatedUserData]}
    default:
      return { ...state };
  }
};
