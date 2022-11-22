import {UserData, OPT_USER, ActionType, AUTH_USER, CLEAR_USER_DATA, CATEGORY_TYPE} from '../type';

const INIT_VALUES: UserData = {
    data: {
        email: '',
        full_name: '',
        _id: '',
    },
    message: '',
    status: null
}

const OnBoardingReducer = (state = INIT_VALUES, action: ActionType) => {
    switch(action.type) {
        case AUTH_USER:
            return {
                ...state,
                user: { ...state.data, ...action.payload.data },
                message: action.payload.message,
                status: action.payload.status
            }
        case OPT_USER: 
            return {
                ...state,
                message: action.payload.message,
                status: action.payload.status
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                message: '',
                status: null
            }
        default:
            return state;
    }
}

export default OnBoardingReducer;