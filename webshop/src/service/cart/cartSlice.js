import {
    createAsyncThunk,
    createSelector,
    createSlice,
  } from '@reduxjs/toolkit';
import agent from '../agent';
import { SUCCESS } from '../../constants/statusCode';
export const addTocart = createAsyncThunk(
  'cart/addTocart',
  async ({productId, quantity, size, price, name, img, percentReduce}, thunkApi) => {
    try{
        const data = await agent.Cart.addToCart(productId, quantity, size, price, name, img, percentReduce);
        if(data.code !== SUCCESS)
          throw new Error(data.message)
        return data.result
    }catch(error){
      return thunkApi.rejectWithValue({message : error.message});
    }
  }
)
export const getToCart = createAsyncThunk(
  'cart/getToCart',
  async (token, thunkApi) => {
    try{
      const data = await agent.Cart.getToCart();
      if(data.code !== SUCCESS)
        throw new Error(data.message)
      return data.result
    }catch(error){
      return thunkApi.rejectWithValue({message : error.message});
    }
  }
)
export const updateToCartById = createAsyncThunk(
  'cart/updateToCartById',
  async ({productId, type, size},thunkApi) => {
    try{
      const data = await agent.Cart.updateCartByUser(productId, type, size);
      if(data.code !== SUCCESS)
        throw new Error(data.message)
      return data.result
    }catch(error){
      return thunkApi.rejectWithValue({message : error.message});
    }
  }
)
const initialState = {
  products: [],
  quantity: 0,
  total: 0
}
function successReducer(state, action) {
  state.products = action.payload.products
  state.quantity = action.payload.products.length
  state.total = action.payload.total
  delete state.error
}

const cartSlice = createSlice(
  {
    name: 'cart',
    initialState,
    reducers: {
      remove: () => initialState
    },
    extraReducers(builder){
      builder.addCase(addTocart.fulfilled, successReducer)
      builder.addCase(addTocart.rejected, (state, action) => {
        state.error = action.payload
      })
      builder.addCase(getToCart.fulfilled, successReducer)
      builder.addCase(updateToCartById.fulfilled, successReducer)
      builder.addCase(getToCart.rejected, (state, action) => {
        state.error = action.payload
      })
      builder.addCase(updateToCartById.rejected, (state, action) => {
        state.error = action.payload
      })
    }
  }
)
export const {remove } = cartSlice.actions;
export default cartSlice.reducer