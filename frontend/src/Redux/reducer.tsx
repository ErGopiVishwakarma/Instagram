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
  FOLLOW,
  GETALLPOST,
  LIKEPOST,
  UPDATEMESSAGE,
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
      return { ...state, post: [...state.post, payload] };
    case LIKEPOST:
      let filterData = state.post?.map((el) =>
        el._id !== payload._id ? el : payload,
      );
      console.log(payload, filterData);
      return { ...state, post: [...filterData] };
    case DELETEPOST:
      let deletedData = state.post?.filter((el) => el._id !== payload._id);
      console.log(payload, deletedData);
      return { ...state, post: [...deletedData] };
    case FOLLOW:
      let followData = state.user?.map((el) =>
        el._id === payload[0]._id
          ? payload[0]
          : el._id === payload[1]._id
          ? payload[1]
          : el,
      );
      return { ...state, user: [...followData] };
    default:
      return { ...state };
  }
};
