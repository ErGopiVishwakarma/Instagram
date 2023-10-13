import { AuthUser } from './reducerType';

export interface MessageType {
  sender: string;
  content: string;
  chatId: string;
  _id: string;
}

export interface ChatType {
  _id: string;
  users: AuthUser[];
  admin: AuthUser;
  latestMessage: MessageType;
}

export interface LikeType {
  name: string;
  username: string;
  profile: string;
  _id: string;
}

export interface CommentType {
  text: string;
  likes: [string] | [];
  commentedBy:
    | [
        {
          name: string;
          username: string;
          profile: string;
          _id: string;
        },
      ]
    | [];
}

export interface PostType {
  _id: string;
  postUrl: string;
  size: number;
  highlights: string;
  postedBy: AuthUser | {};
  likes: LikeType[] | [];
  views: [string] | [];
  comments: CommentType[] | [];
  createdAt: string;
}
