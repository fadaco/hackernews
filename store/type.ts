export type TopStory = {
    title: string
    type: string
    url: string
    by: string
    score: string
    time: string
}

export type UserData = {
    user: User,
    isLoggedIn: boolean
    db?: any
}

export type User = {
    email: string
    full_name: string
    password: string
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

export const SET_LOGIN_IN = 'SET_LOGIN_IN';
export const SET_USER_TABLE = 'SET_USER_TABLE';
export const SET_USER_VALUE = 'SET_USER_VALUE';