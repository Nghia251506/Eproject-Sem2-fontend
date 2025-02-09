import DetailService from './DetailService';
import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';

const initialState = {
    details: [],
    detail: {
        product_id: "",
        attribute_id: "",
        val: "",
        supplier_id: ""
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}

export const createDetail = createAsyncThunk (
    "detail/createDetail",
    async(detailData, thunkAPI) => {
        try{
            return await DetailService.CreateProductDetail(detailData);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const getDetailByProductId = createAsyncThunk (
    "detail/getDetailByProductId",
    async(productId, thunkAPI) => {
        try{
            return await DetailService.getDetail(productId);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const resetStateDetail = createAction("detail/reset-state");

export const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(createDetail.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(createDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
           .addCase(createDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
           .addCase(getDetailByProductId.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(getDetailByProductId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.details = action.payload;
            })
            .addCase(resetStateDetail, () => initialState);
    }
});

export default detailSlice.reducer;