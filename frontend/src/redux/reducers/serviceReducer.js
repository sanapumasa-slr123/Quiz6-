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
    APPLICATION_SUBMIT_REQUEST,
    APPLICATION_SUBMIT_SUCCESS,
    APPLICATION_SUBMIT_FAILURE,
    APPLICATION_LIST_REQUEST,
    APPLICATION_LIST_SUCCESS,
    APPLICATION_LIST_FAILURE,
} from '../constants/serviceConstants';

const initialState = {
    services: [],
    service: null,
    loading: false,
    error: null,
    applicationStatus: null,
    applications: [],
};

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVICE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case SERVICE_LIST_SUCCESS:
            return { ...state, loading: false, services: action.payload };
        case SERVICE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SERVICE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case SERVICE_DETAIL_SUCCESS:
            return { ...state, loading: false, service: action.payload };
        case SERVICE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SERVICE_CREATE_REQUEST:
            return { ...state, loading: true, error: null };
        case SERVICE_CREATE_SUCCESS:
            return { ...state, loading: false, services: [...state.services, action.payload] };
        case SERVICE_CREATE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case APPLICATION_SUBMIT_REQUEST:
            return { ...state, loading: true, error: null };
        case APPLICATION_SUBMIT_SUCCESS:
            return { ...state, loading: false, applicationStatus: action.payload };
        case APPLICATION_SUBMIT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case APPLICATION_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case APPLICATION_LIST_SUCCESS:
            return { ...state, loading: false, applications: action.payload };
        case APPLICATION_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
