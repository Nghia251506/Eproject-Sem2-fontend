import billService from './billService';
import productService from './productService';
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// Thunk: Lấy danh sách hóa đơn
export const fetchBills = createAsyncThunk('bills/fetchBills', async (_, thunkAPI) => {
    try {
        return await billService.getBills();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Lỗi khi tải hóa đơn');
    }
});

// Thunk: Thêm hóa đơn mới
export const createBill = createAsyncThunk('bills/createBill', async (billData, thunkAPI) => {
    try {
        return await billService.createBill(billData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Lỗi khi tạo hóa đơn');
    }
});
const initialState= {
    bills: [],
    loading: false,
    error: null,
    success: false,
}
// Slice
const billSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        resetStatus(state) {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Xử lý fetchBills
        builder.addCase(fetchBills.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBills.fulfilled, (state, action) => {
            state.loading = false;
            state.bills = action.payload;
        });
        builder.addCase(fetchBills.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Xử lý createBill
        builder.addCase(createBill.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createBill.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.bills.push(action.payload.result); // Cập nhật danh sách hóa đơn
        });
        builder.addCase(createBill.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(resetStatus, () => initialState);
    },
});

export const { resetStatus } = billSlice.actions;

export default billSlice.reducer;
