export type TopStory = {
    title: string
    type: string
    url: string
    by: string
    score: string
    time: string
}

export type UserData = {
    data: User,
    status: any
    message?: string
    isLoggedIn: boolean
}

export type User = {
    _id?: string,
    email?: string
    full_name?: string
    phone_number?: string
    otp?:string
}

export type Story = {
    top_story: TopStory[]
    stories_ids: number[]
    skip: number
    limit: number
}

export type ActionType = {
    type: string
    payload: any
}

export const STORY_ID = 'STORY_ID';
export const TOP_STORIES = 'TOP_STORIES';
export const PAGINATE = 'PAGINATE';

export const CREATE_USER = 'CREATE_USER';
export const AUTH_USER = 'AUTH_USER';
export const OPT_USER = 'OTP_USER';
export const CATEGORY_TYPE = 'CATEGORY_TYPE';

export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const SET_LOGIN_IN = 'SET_LOGIN_IN';
export const SET_USER_TABLE = 'SET_USER_TABLE';
export const SET_USER_VALUE = 'SET_USER_VALUE';