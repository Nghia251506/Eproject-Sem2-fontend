import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/authSlice";
// import customerReducer from "../features/customers/customerSlice";
import productReducer from "../component/features/product/productSlice";
import brandReducer from "./features/Band/brandSlice";
import categoryReducer from "./features/Category/categorySlice";
// import colorReducer from "../features/color/colorSlice";
// import enquiryReducer from "../features/enquiry/enquirySlice";
// import uploadReducer from "../features/upload/uploadSlice";
// import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    // color: colorReducer,
    // enquiry: enquiryReducer,
    // upload: uploadReducer,
    // coupon: couponReducer,
  },
});