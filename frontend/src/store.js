import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { serviceReducer } from './redux/reducers/serviceReducer';
import { orderReducer } from './redux/reducers/orderReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        service: serviceReducer,
        order: orderReducer,
    },
});

export default store;
