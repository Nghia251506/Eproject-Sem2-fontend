import { React, useEffect, useState } from "react";
import CustomInput from "../../DataEntry/Input/CustomInput";
import ReactQuill from "react-quill"
import { useLocation, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/Band/brandSlice";
import { ListCategories } from "../../features/Category/categorySlice";
import _input from '../../Asset/css/_input.module.css'
// import { Select } from "antd";
// import Dropzone from "react-dropzone";
import { createProduct, resetState, getAProduct, updateAProduct } from "../../features/product/productSlice";

let schema = yup.object().shape({
  name: yup.string().required("*Nhập tên sản phẩm"),
  description: yup.string().required("*Nhập mô tả sản phẩm"),
  price: yup.number().required("*Nhập giá sản phẩm"),
  quantity: yup.number().required("*Nhập số lượng sản phẩm"),
  category_id: yup.string().required("*Chọn loại sản phẩm"),
  brand_id: yup.string().required("*Chọn thương hiệu sản phẩm"),
  image_url: yup.string().url("*Nhập URL hình ảnh hợp lệ"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.category.categories);
  const newProduct = useSelector((state) => state.product);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];

  const {
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productCategory,
    productBrand,
    productImage,
    isSuccess,
    isError,
    createdProduct,
    updateProduct,
  } = newProduct;

  useEffect(() => {
    dispatch(getBrands());
    dispatch(ListCategories());
  }, [dispatch]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Thêm sản phẩm thành công!");
    }
    if (isError) {
      toast.error("Đã có lỗi xảy ra!");
    }
    if (isSuccess && updateProduct) {
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/list-product");
    }
  }, [isSuccess, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productName || "",
      description: productDescription || "",
      price: productPrice || "",
      quantity: productQuantity || "",
      category_name: productCategory || "",
      brand_name: productBrand || "",
      image_url: productImage || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
      </h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
      <span>Tên sản phẩm</span>
        <CustomInput
          type="text"
          placeholder="Nhập tên sản phẩm"
          name="name"
          onChg={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          values={formik.values.name}
          className="form-control py-3 mb-3"
        />
        <div className={_input.error}>{formik.touched.name && formik.errors.name}</div>
        <ReactQuill
          theme="snow"
          name="description"
          onChange={formik.handleChange("description")}
          values={formik.values.description}
          className="form-control py-3 mb-3"
        />
        <div className={_input.error}>
          {formik.touched.description && formik.errors.description}
        </div>
        <CustomInput
          type="number"
          placeholder="Nhập giá sản phẩm"
          name="price"
          onChg={formik.handleChange("price")}
          onBlur={formik.handleBlur("price")}
          values={formik.values.price}
          className="form-control py-3 mb-3"
        />
        <div className={_input.error}>{formik.touched.price && formik.errors.price}</div>
        <CustomInput
          type="number"
          placeholder="Nhập số lượng sản phẩm"
          name="quantity"
          onChng={formik.handleChange("quantity")}
          onBlr={formik.handleBlur("quantity")}
          values={formik.values.quantity}
        />
        <div className={_input.error}>
          {formik.touched.quantity && formik.errors.quantity}
        </div>
        <select
          name="category_name"
          onChange={formik.handleChange("category_name")}
          onBlur={formik.handleBlur("category_name")}
          value={formik.values.category_name}
          className="form-control py-3 mb-3"
        >
          <option value="">Chọn loại sản phẩm</option>
          {catState.map((i) => (
            <option key={i.id} value={i.id}>
              {i.category_name}
            </option>
          ))}
        </select>
        <div className={_input.error}>
          {formik.touched.category_name && formik.errors.category_name}
        </div>
        <select
          name="brand_id"
          onChange={formik.handleChange("brand_id")}
          onBlur={formik.handleBlur("brand_id")}
          value={formik.values.brand_id}
          className="form-control py-3 mb-3"
        >
          <option value="">Chọn thương hiệu</option>
          {brandState.map((i) => (
            <option key={i.id} value={i.id}>
              {i.brand_name}
            </option>
          ))}
        </select>
        <div className="error">
          {formik.touched.brand_name && formik.errors.brand_name}
        </div>
        <CustomInput
          type="text"
          placeholder="URL hình ảnh"
          name="image_url"
          onChng={formik.handleChange("image_url")}
          onBlr={formik.handleBlur("image_url")}
          val={formik.values.image_url}
          className="form-control py-3 mb-3"
        />
        <div className="error">
          {formik.touched.image_url && formik.errors.image_url}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getProductId !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
