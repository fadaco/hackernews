import { LIST_USER, ActionType, USER_MATCH, USER_CHAT, USER_MESSAGE, USER_CONVERSATION, USER_LIKES } from "../type";

const INIT_VALUES = {
    matches: [],
    userList: [],
    user_matches: [],
    user_chat: {},
    user_message: [],
    conversation_list: [],
    user_likes: []
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
        case USER_MESSAGE:
            return {
                ...state,
                user_message: [...state.user_message, {
                    _id: Math.floor(Math.random() * 10000),
                    text: action.payload.text,
                    createdAt: new Date(),
                    user: {
                      _id: action.payload.senderId,
                    }}]
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
            console.log(action.payload)
            return {
                ...state,
                userList: [...action.payload]
            }
            default:
                return state;
    }
}

export default MatchReducer;