import axiosInstance from '../../axiosInstance';
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

export const listAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_LIST_USERS_REQUEST });
        const { data } = await axiosInstance.get('/api/v1/users/admin/users/');
        dispatch({ type: ADMIN_LIST_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADMIN_LIST_USERS_FAILURE,
            payload: error.response?.data || 'Failed to fetch users',
        });
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_USER_REQUEST });
        await axiosInstance.delete(`/api/v1/users/admin/users/${userId}/`);
        dispatch({ type: ADMIN_DELETE_USER_SUCCESS });
        dispatch(listAllUsers());
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_USER_FAILURE,
            payload: error.response?.data || 'Failed to delete user',
        });
    }
};

export const approveApplication = (appId) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_APPROVE_APPLICATION_REQUEST });
        await axiosInstance.post(`/api/v1/applications/${appId}/approve/`);
        dispatch({ type: ADMIN_APPROVE_APPLICATION_SUCCESS });
        dispatch(listApplications());
    } catch (error) {
        dispatch({
            type: ADMIN_APPROVE_APPLICATION_FAILURE,
            payload: error.response?.data || 'Failed to approve application',
        });
    }
};

export const declineApplication = (appId, reason) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DECLINE_APPLICATION_REQUEST });
        await axiosInstance.post(`/api/v1/applications/${appId}/decline/`, {
            decline_reason: reason,
        });
        dispatch({ type: ADMIN_DECLINE_APPLICATION_SUCCESS });
        dispatch(listApplications());
    } catch (error) {
        dispatch({
            type: ADMIN_DECLINE_APPLICATION_FAILURE,
            payload: error.response?.data || 'Failed to decline application',
        });
    }
};

export const listApplications = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('/api/v1/applications/list/');
        return data;
    } catch (error) {
        return [];
    }
};

export const sendChatMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });
        const { data } = await axiosInstance.post('/api/v1/chat/ask/', {
            message,
        });
        dispatch({
            type: CHAT_SEND_MESSAGE_SUCCESS,
            payload: { user: message, bot: data.reply },
        });
    } catch (error) {
        dispatch({
            type: CHAT_SEND_MESSAGE_FAILURE,
            payload: error.response?.data?.detail || 'Failed to send message',
        });
    }
};
