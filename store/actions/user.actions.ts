import { SET_LOGIN_IN, SET_USER_TABLE, SET_USER_VALUE, OPEN_ACTION_SHEET } from '../type';
import { Dispatch } from 'redux';


export const setLoginValue = (value: number) => async (dispatch: Dispatch) => {
     dispatch({type: SET_LOGIN_IN, payload: value})
}

export const setUserTable = (data: any) => async (dispatch: Dispatch) => {
     dispatch({type: SET_USER_TABLE, payload: data})
}

export const setUserValue = (data: any) => async (dispatch: Dispatch) => {
     dispatch({type: SET_USER_VALUE, payload: data})
}

export const openActionSheetModal = (value: boolean) => (dispatch: Dispatch) => {
     dispatch({ type: OPEN_ACTION_SHEET, payload: value })
}

