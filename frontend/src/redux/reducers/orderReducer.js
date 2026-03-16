import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAILURE,
} from '../constants/orderConstants';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    orderCreated: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true, error: null };
        case ORDER_CREATE_SUCCESS:
            return { ...state, loading: false, orderCreated: true };
        case ORDER_CREATE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ORDER_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case ORDER_HISTORY_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case ORDER_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
