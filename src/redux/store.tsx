import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import postReducer from './post/postSlice'
import userSlice from './user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch