import {User, OPT_USER, ActionType, CLEAR_USER_DATA, CATEGORY_TYPE, USER_DETAIL} from '../type';

const INIT_VALUES: User = {
    _id: '',
    email: '',
    full_name: '',
    phone_number: '',
    interests: [],
    sports: [],
    percentage_completed: 0,
    age: 0,
    date_of_birth: '',
    describe_yourself: '',
    drinking: '',
    education: '',
    height: '',
    identify_as: '',
    images: [],
    intention: '',
    interested: '',
    smoking: '',
    workout: '',
    about_me: '',
    subscription: '',
    address: '',
    user_address: '',
    is_block: false,
    swipe_count: 0,
    last_swipe_count_date: '',
    deviceId:''
}

const OnBoardingReducer = (state = INIT_VALUES, action: ActionType) => {
    switch(action.type) {
        case USER_DETAIL:
            return {
                ...state,
                ...action.payload
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