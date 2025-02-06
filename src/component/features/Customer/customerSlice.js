import customerService from "./customerService";
import {createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit"

const initialState = {
    customers: [],
    customer:{
        customer_name: '',
        address: '',
        phone: '',
        birth_day: '',
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}

export const getCustomers = createAsyncThunk(
    'api/list-customer', 
    async (_, thunkAPI) => {
        try {
            const data = await customerService.getCustomers();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
});

export const createCustomer = createAsyncThunk(
    'customer/add-customer', 
    async (customerData, thunkAPI) => {
        try {
            const data = await customerService.createCustomer(customerData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

export const resetStateCustomer = createAction("customer/reset-state");

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(getCustomers.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(getCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.customers = action.payload;
            })
           .addCase(getCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
           .addCase(createCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = "Thêm mới thành công";
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(resetStateCustomer, () => initialState);
    }
});

export default customerSlice.reducer;