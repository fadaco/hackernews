import { LIST_USER, ActionType, USER_MATCH, OPEN_ACTION_SHEET, OPEN_USER_PROFILE, USER_CHAT, USER_MESSAGE, USER_CONVERSATION, USER_LIKES, RELOAD_ALL_PAGE, CLEAR_USER_CHAT } from "../type";

const INIT_VALUES = {
    matches: [],
    userList: [],
    user_matches: [],
    user_chat: {},
    user_message: [],
    conversation_list: [],
    user_likes: [],
    actionSheet: false,
    profileModal: false,
    reload: false,
    user_send_message: {
        _id: ''
    }
}

const MatchReducer = (state = INIT_VALUES, action: ActionType) => {
    switch (action.type) {
        case USER_MATCH:
            return {
                ...state,
                user_matches: [...action.payload]
            }
        case USER_CHAT:
            return {
                ...state,
                user_chat: {...action.payload}
            }
        case RELOAD_ALL_PAGE:
            return {
                ...state,
                reload: !state.reload
            }
        case CLEAR_USER_CHAT:
            return {
                ...state,
                user_send_message: {
                    _id: ''
                }
            }
        case OPEN_ACTION_SHEET:
                return {
                    ...state,
                   actionSheet: action.payload
                }
        case OPEN_USER_PROFILE:
            return {
                ...state,
               profileModal: action.payload
            }
        case USER_MESSAGE:
            return {
                ...state,
                user_message: [...state.user_message, action.payload],
                user_send_message: action.payload
            }
        case USER_LIKES:
            return {
                ...state,
                user_likes: [...action.payload]
            }
        case USER_CONVERSATION:
            return {
                ...state,
                conversation_list: [...action.payload]
            }
        case LIST_USER:
            return {
                ...state,
                userList: [...action.payload]
            }
            default:
                return state;
    }
}

export default MatchReducer;