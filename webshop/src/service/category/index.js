import { createSlice } from '@reduxjs/toolkit';

const initialState = []
const CategorySlice = createSlice({
    initialState,
    name : "category-slice",
    reducers: {
        setCategory(state, action){
            return state = action.payload
        }
    }
})
export const { setCategory } = CategorySlice.actions;
export default CategorySlice.reducer