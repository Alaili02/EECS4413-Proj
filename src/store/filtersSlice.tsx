import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type filterT =  numberFilterT | stringFilterT;
export type numberFilterT = "Price" | "Rating";
export type stringFilterT = "Type" | "Brand";
export type filtersStateT = {
    "Type": {
        "id": string
        "value": string
    }
    "Brand": {
        "id": string
        "value": string
    },
    "Price": {
        "min": number,
        "max": number
    },
    "Rating": {
        "min": number,
        "max": number
    },
};
const initialState:filtersStateT = {
    "Type": {
        "id": "-1",
        "value": "All"
    },
    "Brand": {
        "id": "-1",
        "value": "All"
    },
    "Price": {
        "min": 0,
        "max": 10000
    },
    "Rating": {
        "min": 0,
        "max": 10
    },
}

// type filterBasePayload = {"filter": filterT}
type stringFilterPayload = {"filter": stringFilterT, "value": string, 'id': string}
type numberFilterPayload = {"filter": numberFilterT, "value": {"min": number, "max": number}}

const filtersSlice = createSlice({
    "name": "filters",
    initialState,
    reducers: {
        setStringFilter: (state, action: PayloadAction<stringFilterPayload>) => {
            const {filter, id, value} = action.payload;
            if (filter == "Brand") state['Type'] = ({
                "id": "-1",
                "value": "All"
            }); else if (filter == "Type") state['Brand'] = ({
                "id": "-1",
                "value": "All"
            });
            state[filter] = {
                id, value
            }
        },
        setNumberFilter: (state, action: PayloadAction<numberFilterPayload>) => {
            const {filter, value} = action.payload;
            state[filter] = value;
        }
    }
});

const selectTypeFilter = (state: RootState) => {return state.filters.Type;};
const selectBrandFilter = (state: RootState) => {return state.filters.Brand;};
const selectPriceFilter = (state: RootState) => {return state.filters.Price;};
const selectRatingFilter = (state: RootState) => {return state.filters.Rating;};
export const selectAllFilters = (state: RootState) => {return state.filters;};
export const selectStringFilter = (state: RootState, filter: stringFilterT):string => {return state.filters[filter].value;};

export const { setStringFilter, setNumberFilter } = filtersSlice.actions;
export default filtersSlice.reducer;