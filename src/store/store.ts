import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';
import optionReducer from './optionsSlice';
import cartReducer from './cartSlice';
import { apiSlice } from './apiSlice';
import { authSlice } from './authSlice';


export const store = configureStore({
  reducer: {
    filters: filterReducer,
    options: optionReducer,
    cart: cartReducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
