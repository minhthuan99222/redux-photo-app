import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/Auth/userSlice';
import photoReducer from '../features/Photo/photoSlice';

const rootReducer = {
    photos: photoReducer,
    user: userReducer,
}
const store = configureStore({
    reducer: rootReducer,

})

export default store;