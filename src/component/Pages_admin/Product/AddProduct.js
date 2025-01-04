import { React, useEffect, useState } from "react";
import CustomInput from "../../DataEntry/Input/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/Band/brandSlice";
import { ListCategories } from "../../features/Category/categorySlice";
import _input from '../../Asset/css/_input.module.css'
import { createProduct, resetState, getAProduct, updateAProduct } from "../../features/product/productSlice";

// Validation schema
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
  const { product} = useSelector((state) => state.product);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3]; // Lấy ID sản phẩm từ URL

  const {
    isSuccess,
    isError,
    createdProduct,
    updateProduct,
  } = product;

  useEffect(() => {
    dispatch(getBrands());
    dispatch(ListCategories());
  }, [dispatch]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId)); // Lấy thông tin sản phẩm theo ID
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  useEffect(() => {
    console.log('Product data: ', getProductId);
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

  useEffect(() => {
    if (!product && getProductId) {
      return <div>Loading...</div>; // Hoặc có thể return một spinner loading
    }
  },[]);

  // Khởi tạo formik và đổ giá trị vào form
  const formik = useFormik({
    enableReinitialize: true,  // Đảm bảo form được khởi tạo lại khi có dữ liệu mới
    initialValues: {
      id: product.id || "",
      code: product.code || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      quantity: product.quantity || "",
      category_id: product.category_id || "",
      brand_id: product.brand_id || "",
      image_url: product.image_url || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));  // Cập nhật sản phẩm
        dispatch(resetState());
      } else {
        dispatch(createProduct(values));  // Thêm sản phẩm mới
        formik.resetForm();
        setImages([]);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    console.log('Product data: ', product); // Kiểm tra dữ liệu trả về
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId !== undefined ? "Cập nhật" : "Thêm"} sản phẩm
      </h3>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <CustomInput
          type="hidden"
          placeholder="Nhập tên sản phẩm"
          name="id"
          value={formik.values.id} // Đổ giá trị từ formik vào
          className="py-3 mb-3"
        />
        <span>Mã sản phẩm</span>
        <CustomInput
          type="text"
          name="code"
          onChg={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code} // Đổ giá trị từ formik vào
          className="py-3 mb-3"
          readonly 
        />
        <span>Tên sản phẩm</span>
        <CustomInput
          type="text"
          placeholder="Nhập tên sản phẩm"
          name="name"
          onChg={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name} // Đổ giá trị từ formik vào
          className="py-3 mb-3"
        />
        <div className={_input.error}>{formik.touched.name && formik.errors.name}</div>

        <ReactQuill
          theme="snow"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description} // Đổ giá trị từ formik vào
          className="form-control py-3 mb-3"
        />
        <div className={_input.error}>
          {formik.touched.description && formik.errors.description}
        </div>

        <CustomInput
          type="number"
          placeholder="Nhập giá sản phẩm"
          name="price"
          onChg={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price} // Đổ giá trị từ formik vào
          className="form-control py-3 mb-3"
        />
        <div className={_input.error}>{formik.touched.price && formik.errors.price}</div>

        <CustomInput
          type="number"
          placeholder="Nhập số lượng sản phẩm"
          name="quantity"
          onChg={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity} // Đổ giá trị từ formik vào
        />
        <div className={_input.error}>
          {formik.touched.quantity && formik.errors.quantity}
        </div>

        <select
          name="category_id"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category_id} // Đổ giá trị từ formik vào
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
          {formik.touched.category_id && formik.errors.category_id}
        </div>

        <select
          name="brand_id"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.brand_id} // Đổ giá trị từ formik vào
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
          {formik.touched.brand_id && formik.errors.brand_id}
        </div>

        <CustomInput
          type="text"
          placeholder="URL hình ảnh"
          name="image_url"
          onChg={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image_url} // Đổ giá trị từ formik vào
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
