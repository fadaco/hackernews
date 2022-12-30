import { Dispatch } from 'redux';
import {SERVER_REQUEST, UPLOAD_IMAGE_PROFILE, UPLOAD_IMAGE, VERIFY_OTP, EMAIL_AND_PHONE_LOGIN, RESEND_OTP, SETUP_PROFILE, USER, DELETE_IMAGE, DELETE_ACCOUNT} from '../../config';
import { USER_DETAIL, User, CLEAR_USER_DATA, SET_LOGIN_IN, SetUpUserProfile, USER_MESSAGE } from '../type';

export const loggedInWithEmailAndPhoneNumber = async (payload: User) => {
    const response = await SERVER_REQUEST(EMAIL_AND_PHONE_LOGIN, 'post', payload);
    return response;
}

export const dispatchUserDetailToStore = (payload: User) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_DETAIL, payload: payload })
}
    
export const dispatchChatToStore = (payload: any) => async (dispatch: Dispatch) => {
    dispatch({ type: USER_MESSAGE, payload: payload })

}


export const clearUserObject = () => async (dispatch: Dispatch) => {
    dispatch({type: CLEAR_USER_DATA})
}

export const verifyOtp = async (payload: User) => {
    const response = await SERVER_REQUEST(VERIFY_OTP, 'post', payload);
    return response;
}

export const reSendOtp = async (payload: User) => {
    const response = await SERVER_REQUEST(RESEND_OTP, 'post', payload);
    return response;
}

export const setUpProfile = async (payload: SetUpUserProfile) => {
    const response = await SERVER_REQUEST(SETUP_PROFILE, 'post', payload);
    return response;
}

export const deleteImage = async (name:string) => {
    const response = await SERVER_REQUEST(DELETE_IMAGE, 'post', {
        name
    });
    return response;
}



export const uploadImage = async (payload: SetUpUserProfile) => {
    const response = await UPLOAD_IMAGE(UPLOAD_IMAGE_PROFILE, 'post', payload);
    return response;
}
 
export const goToDashboard = (value: number) =>async (dispatch: Dispatch) => {
    dispatch({type: SET_LOGIN_IN, payload: value})

}

export const getUser = () => async (dispatch: Dispatch) => {
    const response = await SERVER_REQUEST(USER, 'get');
    const { data } = response;
    dispatch({type: USER_DETAIL, payload: data})
}

export const deleteAccount = async () => {
    const response = await SERVER_REQUEST(DELETE_ACCOUNT, 'get');
    console.log(response)
    return response;
}