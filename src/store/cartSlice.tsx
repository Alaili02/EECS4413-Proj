import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductT } from "./apiSlice";
import { RootState } from "./store";

export type cartProductT = ProductT & {"Quantity": number};
export type cartStateT = {[id: string]: cartProductT};
const initialState:cartStateT = {}

const cartSlice = createSlice({
    "name": "cart",
    initialState,
    reducers: {
        addToCartStore: (state, action:PayloadAction<cartProductT>) => {
            const prod = action.payload;
            state[prod.id] = prod;
        }
    }
});

export const selectCartStore = (state: RootState):cartStateT => {return state.cart;};

export const { addToCartStore } = cartSlice.actions;
export default cartSlice.reducer;