import { createSlice } from "@reduxjs/toolkit";
const productViewModalSlice = createSlice({
    name: "productModal",
    initialState: {
        product: null
    },
    reducers: {
        addProductModal: (state, action) => {
            state.product = action.payload
        },
        removeProductModal: (state) => {
            state.product = null
        }
    }
})
export const {addProductModal, removeProductModal} = productViewModalSlice.actions
export default productViewModalSlice.reducer
