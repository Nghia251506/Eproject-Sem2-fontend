import attributeService from "./AttributeService";
import {createAsyncThunk, createSlice, createAction} from '@reduxjs/toolkit'

const initialState = {
    attributes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}

export const getAttributes = createAsyncThunk(
    'api/list-attribute', 
    async (_, thunkAPI) => {
        try{
            const data = await attributeService.getAttributes();
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const resetStateAttribute = createAction("attribute/reset-state")

export const attributeSlice = createSlice({
    name: 'attribute',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(getAttributes.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(getAttributes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.attributes = action.payload;
            })
           .addCase(getAttributes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
           .addCase(resetStateAttribute, () => initialState);
    }
});

export default attributeSlice.reducer;