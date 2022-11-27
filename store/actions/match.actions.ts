import { Dispatch } from 'redux';
import { SERVER_REQUEST, USER_LIST, USER_MATCHES, CONVERSATIONS } from '../../config';
import { UserList, LIST_USER, USER_MATCH, User, USER_CHAT, USER_CONVERSATION } from '../type';

export const getUserList = (payload:UserList) => async (dispatch: Dispatch) =>  {
    const response = await SERVER_REQUEST(USER_LIST, 'post', payload);
    dispatch({ type: LIST_USER, payload: response.data });
}

export const getUserMatches = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(USER_MATCHES, 'get');
    dispatch({ type: USER_MATCH, payload: response.data });

}

export const dispatchUserDetailToChat = (payload: User) => async (dispatch: Dispatch) => {
    dispatch({type: USER_CHAT, payload})
}

export const getConversations = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(CONVERSATIONS, 'get');
    console.log(response);
    dispatch({type: USER_CONVERSATION, payload: response.data})
}
