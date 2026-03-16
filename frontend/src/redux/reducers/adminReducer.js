import {
    ADMIN_LIST_USERS_REQUEST,
    ADMIN_LIST_USERS_SUCCESS,
    ADMIN_LIST_USERS_FAILURE,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_FAILURE,
    ADMIN_APPROVE_APPLICATION_REQUEST,
    ADMIN_APPROVE_APPLICATION_SUCCESS,
    ADMIN_APPROVE_APPLICATION_FAILURE,
    ADMIN_DECLINE_APPLICATION_REQUEST,
    ADMIN_DECLINE_APPLICATION_SUCCESS,
    ADMIN_DECLINE_APPLICATION_FAILURE,
    CHAT_SEND_MESSAGE_REQUEST,
    CHAT_SEND_MESSAGE_SUCCESS,
    CHAT_SEND_MESSAGE_FAILURE,
} from '../constants/adminConstants';

const initialState = {
    users: [],
    applications: [],
    chatMessages: [],
    loading: false,
    error: null,
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LIST_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case ADMIN_LIST_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case ADMIN_LIST_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADMIN_DELETE_USER_REQUEST:
        case ADMIN_DELETE_USER_SUCCESS:
        case ADMIN_DELETE_USER_FAILURE:
            return state;

        case ADMIN_APPROVE_APPLICATION_REQUEST:
        case ADMIN_APPROVE_APPLICATION_SUCCESS:
        case ADMIN_APPROVE_APPLICATION_FAILURE:
            return state;

        case ADMIN_DECLINE_APPLICATION_REQUEST:
        case ADMIN_DECLINE_APPLICATION_SUCCESS:
        case ADMIN_DECLINE_APPLICATION_FAILURE:
            return state;

        case CHAT_SEND_MESSAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case CHAT_SEND_MESSAGE_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                chatMessages: [...state.chatMessages, action.payload]
            };
        case CHAT_SEND_MESSAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
