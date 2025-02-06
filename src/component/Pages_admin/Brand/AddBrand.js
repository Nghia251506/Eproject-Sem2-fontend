import { React, useEffect } from "react";
import CustomInput from "../../DataEntry/Input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrand,
  getABrand,
  resetStateBrand,
  updateABrand,
} from "../../features/Band/brandSlice";
import form from '../../Asset/css/Form.module.css'

let schema = yup.object().shape({
  title: yup.string().required("*Tên thương hiệu là bắt buộc"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetStateBrand());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm thương hiệu thành công!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Cập nhật thương hiệu thành công!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetStateBrand());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetStateBrand());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title text-center">
        {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
      </h3>
      <div className="container">
        <form action="" onSubmit={formik.handleSubmit} className={form.form_add}>
          <CustomInput
            type="text"
            name="title"
            onChg={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            placeholder="Nhập tên thương hiệu"
            id="brand"
            className="form-control py-3 mb-3"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Cập nhật" : "Thêm"} thương hiệu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;