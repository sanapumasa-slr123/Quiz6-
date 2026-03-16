import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { serviceReducer } from './redux/reducers/serviceReducer';
import { orderReducer } from './redux/reducers/orderReducer';
import { adminReducer } from './redux/reducers/adminReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        service: serviceReducer,
        order: orderReducer,
        admin: adminReducer,
    },
});

export default store;
