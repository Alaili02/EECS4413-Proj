import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type OptionT = "isCartOpen" | "isUserOpen";
type OptionsStateT = {[option in OptionT]: boolean};
const initialState:OptionsStateT = {
    "isCartOpen": false,
    "isUserOpen": false
}


const OptionsSlice = createSlice({
    "name": "options",
    initialState,
    reducers: {
        toggleCart: (state) => {
            if (!state.isCartOpen && state.isUserOpen) state.isUserOpen = !state.isUserOpen;
            state.isCartOpen = !state.isCartOpen;
        },
        toggleUser: (state) => {
            if (!state.isUserOpen && state.isCartOpen) state.isCartOpen = !state.isCartOpen;
            state.isUserOpen = !state.isUserOpen;
        }
    }
});

export const selectIsCartOpen = (state: RootState) => {return state.options.isCartOpen;};
export const selectIsUserOpen = (state: RootState) => {return state.options.isUserOpen;};

export const { toggleCart, toggleUser } = OptionsSlice.actions;
export default OptionsSlice.reducer;