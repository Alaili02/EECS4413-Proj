import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAdmin: false },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        logOut: (state) => {
            state.token = null;
            state.isAdmin = false;
        },
    }
});

export const { setCredentials, setIsAdmin, logOut } = authSlice.actions;
export const selectCurrentToken = (state:RootState) => state.auth.token;
export const selectIsAdmin = (state:RootState) => state.auth.isAdmin;