import { CREATE_USER, ActionType, AUTH_USER, SET_USER_VALUE, SET_LOGIN_IN, SET_USER_TABLE, OPEN_ACTION_SHEET} from '../type';

const INIT_VALUES = {
    data: {
        email: '',
        full_name: ''
    },
    isLoggedIn: 0,
    status: null,
    message: '',
    actionSheet: false

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
            return {
                ...state,
                user: {
                    ...state.data,
                    email: action.payload.Email,
                    full_name: action.payload.NAME,
                }
            }
        default:
            return state;
    }
}

export default UserReducer;