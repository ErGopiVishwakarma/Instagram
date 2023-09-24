import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { AuthUser } from '../Types/reducerType';
import { MessageType } from '../Types/otherType';

export interface ContextType {
  selectedChat: AuthUser | string;
  setSelectedChat: Dispatch<SetStateAction<'' | AuthUser>>;
  chats: AuthUser[];
  setChats: Dispatch<SetStateAction<AuthUser[]>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

type Children = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: Children) => {
  const [selectedChat, setSelectedChat] = useState<AuthUser | ''>('');
  const [chats, setChats] = useState<AuthUser[]>([]);

  return (
    <Context.Provider
      value={{ selectedChat, setSelectedChat, chats, setChats}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
