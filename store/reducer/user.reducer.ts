import {UserData, CREATE_USER, ActionType, AUTH_USER, SET_USER_VALUE, SET_LOGIN_IN, SET_USER_TABLE} from '../type';

const INIT_VALUES: UserData = {
    user: {
        email: '',
        password: '',
        full_name: ''
    },
    isLoggedIn: false,
    db: null
}

const UserReducer = (state = INIT_VALUES, action: ActionType) => {
    switch(action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_LOGIN_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        case SET_USER_TABLE:
            return {
                ...state,
                    db: action.payload
            }
        case SET_USER_VALUE:
            console.log(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.Email,
                    full_name: action.payload.NAME,
                }
            }
        default:
            return state;
    }
}

export default UserReducer;