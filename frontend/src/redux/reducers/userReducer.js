import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
} from '../constants/userConstants';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
    profile: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case USER_REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload };
        case USER_REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case USER_LOGOUT:
            return { ...state, userInfo: null };

        case USER_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case USER_PROFILE_SUCCESS:
            return { ...state, loading: false, profile: action.payload };
        case USER_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
