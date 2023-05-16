import {
    createAsyncThunk,
    createSelector,
    createSlice,
  } from '@reduxjs/toolkit';

import { publicRequest } from '../requestMethod';
import { 
    failureReducer,
    loadingReducer,
    Status,  
} from '../../utils/utils';
import { SUCCESS } from '../../constants/statusCode';
import axiosClient from '../axiosClient';

export const register = createAsyncThunk(
    'auth/register',
    async ({fullName, email, password, phone}, thunkApi) => {
        try {
            const {data} = await axiosClient.post( "auth/register" ,{fullName, email, password, phone})
            if(data.code !== SUCCESS)
                throw new Error(data.message)
            const {token,...user} = data.result
            return {token, user};
        }
        catch(error) {
            return thunkApi.rejectWithValue({message : error.message});
        }

    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        try{
            const {data} = await axiosClient.post("auth/login", {email, password})
            if(data.code !== SUCCESS)
                throw new Error(data.message)
            const {token,...user} = data.result
            return {token, user};

        }
        catch(error){
            // console.log(error.response.data);
            console.log(error);
            return thunkApi.rejectWithValue({message : error.message});
        } 
    }
)

const initialState = {
    status: Status.IDLE,

}
function successReducer(state, action) {
    localStorage.setItem("token", action.payload.token)
    state.status = Status.SUCCESS;
    state.token = action.payload.token;
    state.user = action.payload.user;
    delete state.error
  }
  
const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            logout: () => {
                localStorage.removeItem('token')
                return initialState
            },
            setToken(state, action){
                state.token = action.payload;
            },
            getInfo: (state, action) => {
                state.user = action.payload;
            }
        },
        extraReducers(builder){
            builder.addCase(login.pending,loadingReducer)

            builder
                .addCase(login.fulfilled, successReducer)
                .addCase(register.fulfilled, successReducer)
            builder
                .addCase(login.rejected, failureReducer)
                .addCase(register.rejected, failureReducer)
        }
    }
)


export const { setToken, logout, getInfo } = authSlice.actions;
const selectAuthSlice = (state) => state.auth;
export const selectUser = (state) => selectAuthSlice(state).user;

export const selectErrors = (state) => selectAuthSlice(state).error;

export const selectIsLoading = (state) =>
  selectAuthSlice(state).status === Status.LOADING;

export const selectIsAuthenticated = createSelector(
    (state) => selectAuthSlice(state).token,
    selectUser,
    (token, user) => Boolean(token && user)
  );
  
export default authSlice.reducer;
  