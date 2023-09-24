import { AuthUser } from "./reducerType";

export interface MessageType {
    sender:string;
    content:string;
    chatId:string;
    _id:string;
}

export interface ChatType {
    _id:string;
    users:AuthUser[];
    admin:AuthUser;
    latestMessage:MessageType
}