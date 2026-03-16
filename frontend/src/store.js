import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { serviceReducer } from './redux/reducers/serviceReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        service: serviceReducer,
    },
});

export default store;
