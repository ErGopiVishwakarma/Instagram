import { Stored } from './fromLocalStorage';
import { ChatType, PostType } from './otherType';

type Message = {};
export type AuthUser = {
  _id: string;
  name: string;
  username: string;
  followers: string[];
  followings: string[];
  profile: string;
  number: string;
};
export interface Initial {
  auth: boolean;
  localStorageData: Stored;
  authUser: AuthUser | {};
  chats:ChatType[] | [];
  user: AuthUser[] | [];
  post: PostType[] | [];
  message: [];
}

export interface Action {
  type: String;
  payload: any;
}
