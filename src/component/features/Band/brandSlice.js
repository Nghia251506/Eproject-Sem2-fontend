import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import brandService from "./brandService";

// Thunk để lấy danh sách thương hiệu
export const getBrands = createAsyncThunk(
  "brand/list-brand",
  async (_, thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để thêm thương hiệu mới
export const createBrand = createAsyncThunk(
  "brand/add",
  async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để lấy thông tin chi tiết thương hiệu
export const getABrand = createAsyncThunk(
  "brand/detail",
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrandById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để xóa thương hiệu
export const deleteABrand = createAsyncThunk(
  "brand/delete",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để cập nhật thương hiệu
export const updateABrand = createAsyncThunk(
  "brand/update",
  async (brandData, thunkAPI) => {
    try {
      return await brandService.updateBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action để reset trạng thái
export const resetState = createAction("brand/reset-state");

// Khởi tạo trạng thái ban đầu
const initialState = {
  brands: [], // Danh sách thương hiệu
  brand: null, // Chi tiết thương hiệu
  isLoading: false, // Trạng thái đang tải
  isError: false, // Có l��i xảy ra
  isSuccess: false, // Hành đ��ng thành công
  message: "", // Thông báo l��i hoặc thành công
};

const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      // Xử lý getBrands
     .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.brands = action.payload;
      })
     .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
     .addCase(resetState, (state) => {
        Object.assign(state, initialState);
      })
      //Xu ly create brand
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createBrand.rejected,(state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      //Xu ly getABrand
      .addCase(getABrand.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled,(state,action) =>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brand = action.payload;
      })
      .addCase(getABrand.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteABrand.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(deleteABrand.fulfilled,(state, action) =>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteABrand.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xu ly updateABrand
      .addCase(updateABrand.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(updateABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
     })
     .addCase(updateABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
     })

     //Xu ly resetStat
     .addCase(resetState, ()=> initialState);
  },
});

export default brandSlice.reducer;