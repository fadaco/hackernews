import { Dispatch } from 'redux';
import {SERVER_REQUEST, VERIFY_OTP, EMAIL_AND_PHONE_LOGIN, CATEGORY} from '../../config';
import { AUTH_USER, User, CLEAR_USER_DATA, OPT_USER, SET_LOGIN_IN } from '../type';

export const loggedInWithEmailAndPhoneNumber = (payload: User) => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(EMAIL_AND_PHONE_LOGIN, 'post', payload);
    dispatch({type: AUTH_USER, payload: response})
}

export const clearUserObject = () => async (dispatch: Dispatch) => {
    dispatch({type: CLEAR_USER_DATA})
}

export const verifyOtp = (payload: User) => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(VERIFY_OTP, 'post', payload);
    console.log(response)
    dispatch({type: OPT_USER, payload: response})
}

export const getCategory = async (name: string)  => {
   return await SERVER_REQUEST(CATEGORY(name), 'get');
}
 
export const goToDashboard = (value: boolean) =>async (dispatch: Dispatch) => {
    dispatch({type: SET_LOGIN_IN, payload: value})

}