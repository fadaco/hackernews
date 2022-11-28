export type User = {
    _id?: string
    email?: string
    full_name?: string
    phone_number?: string
    otp?: string
    interests?: string[]
    sports?: string[]
    percentage_completed?: number
    age?: number
    date_of_birth?: string
    describe_yourself?: string
    drinking?: string
    education?: string
    height?: string
    identify_as?: string
    images?: Image[]
    intention?: string
    interested?: string
    smoking?: string
    workout?: string
    about_me?: string
    socket_id?: string
    subscription?: string
    
}

export type Image = {
    image?: string,
    default?: boolean,
    _id?: string
}

export type SetUpUserProfile = {
    type: string,
    name: any,
}

export type ActionType = {
    type: string
    payload: any
}

export type UserList = {
    latitude: string
    longitude: string
}

export type Message = {
    _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: any
}

export type USERCONVERSATIONLIST = {
    full_name: string,
    image: Image[],
    user_chats: CONVERSATIONCHAT[],
    _id: string
}

export type CONVERSATIONCHAT = {
    content: string
    fullname: string
    id: string
    imageur: string
    sender: string
    receiver: string
    time_sent: string
    messageType:string
}

export const CREATE_USER = 'CREATE_USER';
export const AUTH_USER = 'AUTH_USER';
export const OPT_USER = 'OTP_USER';
export const CATEGORY_TYPE = 'CATEGORY_TYPE';
export const USER_DETAIL = 'USER_DETAIL';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const SET_LOGIN_IN = 'SET_LOGIN_IN';
export const SET_USER_TABLE = 'SET_USER_TABLE';
export const SET_USER_VALUE = 'SET_USER_VALUE';

export const LIST_USER = 'LIST_USER';
export const USER_MATCH = 'USER_MATCH';
export const USER_CHAT = 'USER_CHAT';
export const USER_MESSAGE = 'USER_MESSAGE';
export const USER_CONVERSATION = 'USER_CONVERSATION';
export const USER_LIKES = 'USER_LIKES';