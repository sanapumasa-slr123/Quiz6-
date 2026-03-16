import axiosInstance from '../../axiosInstance';
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

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axiosInstance.post('/api/v1/users/login/', {
            email,
            password,
        });

        const userInfo = {
            token: data.access,
            refreshToken: data.refresh,
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            merchant_id: data.user.merchant_id,
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response?.data?.detail || 'Login failed',
        });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await axiosInstance.post(
            '/api/v1/users/register/',
            userData
        );

        const userInfo = {
            token: data.access,
            refreshToken: data.refresh,
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            merchant_id: data.user.merchant_id,
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        dispatch({ type: USER_REGISTER_SUCCESS, payload: userInfo });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: error.response?.data || 'Registration failed',
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });
        const { data } = await axiosInstance.get('/api/v1/users/profile/');
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAILURE,
            payload: error.response?.data || 'Failed to fetch profile',
        });
    }
};
