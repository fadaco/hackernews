import { Dispatch } from 'redux';
import { SERVER_REQUEST, USER_LIST, USER_MATCHES, CONVERSATIONS, LIKES } from '../../config';
import { UserList, LIST_USER, USER_MATCH, User, USER_CHAT, USER_CONVERSATION, USER_LIKES} from '../type';

export const getUserList = (payload:UserList) => async (dispatch: Dispatch) =>  {
    const response = await SERVER_REQUEST(USER_LIST, 'post', payload);
    console.log(response);
    const { userList } = response.data;
    dispatch({ type: LIST_USER, payload: userList });
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
    dispatch({type: USER_CONVERSATION, payload: response.data})
}

export const getLikes = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(LIKES, 'get');
        dispatch({ type: USER_LIKES, payload: response.data })
}
