import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import productReducer from "../component/features/product/productSlice";
import brandReducer from "./features/Band/brandSlice";
import categoryReducer from "./features/Category/categorySlice";
import customerReducer from "./features/Customer/customerSlice";
import attributeReducer from "./features/Attribute/AttributeSlice";
import productDetailReducer from "./features/product/DetailSlice";
// import enquiryReducer from "../features/enquiry/enquirySlice";
// import uploadReducer from "../features/upload/uploadSlice";
// import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    customer: customerReducer,
    attribute: attributeReducer,
    detail: productDetailReducer,
    // enquiry: enquiryReducer,
    // upload: uploadReducer,
    // coupon: couponReducer,
  },
});