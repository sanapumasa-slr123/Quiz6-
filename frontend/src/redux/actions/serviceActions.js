import axiosInstance from '../../axiosInstance';
import {
    SERVICE_LIST_REQUEST,
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAILURE,
    SERVICE_DETAIL_REQUEST,
    SERVICE_DETAIL_SUCCESS,
    SERVICE_DETAIL_FAILURE,
    SERVICE_CREATE_REQUEST,
    SERVICE_CREATE_SUCCESS,
    SERVICE_CREATE_FAILURE,
    SERVICE_UPDATE_REQUEST,
    SERVICE_UPDATE_SUCCESS,
    SERVICE_UPDATE_FAILURE,
    SERVICE_DELETE_REQUEST,
    SERVICE_DELETE_SUCCESS,
    SERVICE_DELETE_FAILURE,
    APPLICATION_SUBMIT_REQUEST,
    APPLICATION_SUBMIT_SUCCESS,
    APPLICATION_SUBMIT_FAILURE,
    APPLICATION_LIST_REQUEST,
    APPLICATION_LIST_SUCCESS,
    APPLICATION_LIST_FAILURE,
} from '../constants/serviceConstants';

export const listServices = () => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_LIST_REQUEST });
        const { data } = await axiosInstance.get('/api/v1/services/list/');
        dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICE_LIST_FAILURE,
            payload: error.response?.data || 'Failed to fetch services',
        });
    }
};

export const getServiceDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_DETAIL_REQUEST });
        const { data } = await axiosInstance.get(`/api/v1/services/${id}/`);
        dispatch({ type: SERVICE_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICE_DETAIL_FAILURE,
            payload: error.response?.data || 'Failed to fetch service',
        });
    }
};

export const createService = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_CREATE_REQUEST });
        const { data } = await axiosInstance.post(
            '/api/v1/services/manage/',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        dispatch({ type: SERVICE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SERVICE_CREATE_FAILURE,
            payload: error.response?.data || 'Failed to create service',
        });
    }
};

export const submitApplication = () => async (dispatch) => {
    try {
        dispatch({ type: APPLICATION_SUBMIT_REQUEST });
        const { data } = await axiosInstance.post('/api/v1/applications/apply/');
        dispatch({ type: APPLICATION_SUBMIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: APPLICATION_SUBMIT_FAILURE,
            payload: error.response?.data?.detail || 'Failed to submit application',
        });
    }
};

export const listApplications = () => async (dispatch) => {
    try {
        dispatch({ type: APPLICATION_LIST_REQUEST });
        const { data } = await axiosInstance.get('/api/v1/applications/list/');
        dispatch({ type: APPLICATION_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: APPLICATION_LIST_FAILURE,
            payload: error.response?.data || 'Failed to fetch applications',
        });
    }
};

export const updateService = (id, formData) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_UPDATE_REQUEST });
        const { data } = await axiosInstance.put(
            `/api/v1/services/manage/${id}/`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data });
        dispatch(listServices());
    } catch (error) {
        dispatch({
            type: SERVICE_UPDATE_FAILURE,
            payload: error.response?.data || 'Failed to update service',
        });
    }
};

export const deleteService = (id) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_DELETE_REQUEST });
        await axiosInstance.delete(`/api/v1/services/manage/${id}/`);
        dispatch({ type: SERVICE_DELETE_SUCCESS, payload: id });
        dispatch(listServices());
    } catch (error) {
        dispatch({
            type: SERVICE_DELETE_FAILURE,
            payload: error.response?.data || 'Failed to delete service',
        });
    }
};
