import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

// Khởi tạo trạng thái ban đầu
const initialState = {
  products: [], // Danh sách sản phẩm
  product: { // Thay vì chỉ có mảng `products`, bạn cần chứa thông tin sản phẩm riêng biệt
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    brand_id: '',
    image_url: ''
  }, // Chi tiết sản phẩm
  isLoading: false, // Trạng thái đang tải
  isError: false, // Có lỗi xảy ra
  isSuccess: false, // Hành động thành công
  message: "", // Thông báo lỗi hoặc thành công
};

// Thunk để lấy danh sách sản phẩm
export const getProducts = createAsyncThunk(
  "api/list-product",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để thêm sản phẩm mới
export const createProduct = createAsyncThunk(
  "product/add-product",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để lấy thông tin chi tiết sản phẩm
export const getAProduct = createAsyncThunk(
  "product/detail",
  async (id, thunkAPI) => {
    try {
      const result = await productService.getProduct(id);
      // console.log(result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const ClientProducts = createAsyncThunk(
  "product/list-product",
  async(_,thunkAPI) => {
    try {
      const result = await productService.fetchProducts();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const ClientProductDetail = createAsyncThunk(
  "product/productdetail",
  async(id,name, thunkAPI) => {
    try{
      const result = await productService.ProductDetail(name,id);
      return result;
    }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const CreateProductDetail = createAsyncThunk(
  "product/add-detail",
  async (productData, thunkAPI) => {
    try {
      const result = await productService.CreateProductDetail(productData);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const GetDetail = createAsyncThunk(
  "getDetail",
  async (productid, thunkAPI) => {
    try {
      return await productService.getDetail(productid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "getProductByCategory",
  async (category_id, thunkAPI) => {
    try{
      return await productService.getProductByCategory(category_id);
    }catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
  
  }
}
);

// Thunk để xóa sản phẩm
export const deleteAProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để cập nhật sản phẩm
export const updateAProduct = createAsyncThunk(
  "product/update",
  async ({id,productData}, thunkAPI) => {
    try {
      const result =  await productService.updateProduct(id,productData);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductByCode = createAsyncThunk(
  "product/getProductByCode",
  async (code, thunkAPI) => {
    try {
      const result = await productService.getProductByCode(code);
      return result;
    }catch (error){
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Action để reset trạng thái
export const resetState = createAction("product/reset-state");

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý getProducts
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý createProduct
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý createProductDetail
      .addCase(CreateProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(CreateProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý getDetail
      .addCase(GetDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(GetDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý getProductByCategory
      

      // Xử lý getAProduct
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        // console.log('Product from getAProduct:', action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // Xử lý state Detail
      .addCase(ClientProductDetail.pending, (state) =>{
        state.isLoading = true;
      })

      .addCase(ClientProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })

      .addCase(ClientProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý Client list product
      .addCase(ClientProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ClientProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(ClientProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý updateAProduct

      .addCase(getProductByCategory.pending, (state) =>{
        state.isLoading = true;
      })

      .addCase(getProductByCategory.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })

      .addCase(getProductByCategory.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý getProductByCode
      .addCase(getProductByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Thêm sản phẩm vào danh sách
      })
      .addCase(getProductByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Xử lý deleteAProduct
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý updateAProduct
      .addCase(updateAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      
        if (state.products && action.payload?.id) {
          state.products = state.products.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        } else {
          console.error("Không tìm thấy sản phẩm hoặc payload không hợp lệ.");
        }
      })
      
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Xử lý resetState
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
