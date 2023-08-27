import { Dispatch } from 'redux';
import { SERVER_REQUEST, USER_LIST, USER_FILTER_LIST, USER_MATCHES, CONVERSATIONS, LIKES, BLOCK_USER, UNMATCH_USER, SAVE_PUSH_NOTIFICATION_TOKEN, UPGRADE_SUBSCRIPTION_PLAN } from '../../config';
import { UserList, LIST_USER, USER_MATCH, User, USER_CHAT, USER_CONVERSATION, USER_LIKES, RELOAD_ALL_PAGE, CLEAR_USER_CHAT, UPGRADE_PLAN, LOADING } from '../type';

export const getUserList = (payload: UserList) => async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const response = await SERVER_REQUEST(USER_LIST, 'post', payload);
    const { userList } = response.data;
    dispatch({ type: LIST_USER, payload: userList });
    dispatch({ type: LOADING, payload: false });
}

export const filterUserMatch = (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const response = await SERVER_REQUEST(USER_FILTER_LIST, 'post', payload);
    const { userList } = response.data;
    dispatch({ type: LIST_USER, payload: userList });
    dispatch({ type: LOADING, payload: false });
}

export const getUserMatches = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(USER_MATCHES, 'get');
    dispatch({ type: USER_MATCH, payload: response.data });
}

export const clearChatField = () => async (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_USER_CHAT });
}

export const dispatchUserDetailToChat = (payload: User) => async (dispatch: Dispatch) => {
    dispatch({type: USER_CHAT, payload})
}

export const reloadPage = () => async (dispatch: Dispatch) => {
    dispatch({type: RELOAD_ALL_PAGE})
}

export const getConversations = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(CONVERSATIONS, 'get');
    dispatch({type: USER_CONVERSATION, payload: response.data})
}

export const getLikes = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(LIKES, 'get');
        dispatch({ type: USER_LIKES, payload: response.data })
}

export const blockUser = async (id: string) => {
    const response = await SERVER_REQUEST(BLOCK_USER(id), 'get');
    return response;
}

export const unMatchUser = async (id: string) => {
    const response = await SERVER_REQUEST(UNMATCH_USER(id), 'get');
    return response;
}

export const saveNotificationToken = async (data: any) => {
    const response = await SERVER_REQUEST(SAVE_PUSH_NOTIFICATION_TOKEN, 'post', data);
    return response;
}

export const upgradeSubscriptionPlan = async (data: any) => {
    const response = await SERVER_REQUEST(UPGRADE_SUBSCRIPTION_PLAN, 'post', data);
    return response;
}

