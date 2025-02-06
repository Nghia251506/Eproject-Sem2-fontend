import React, { useEffect } from "react";
import CustomInput from "../../DataEntry/Input/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/Auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email phải hợp lệ")
    .required("*Nhập email"),
  password: yup.string().required("*Nhập mật khẩu"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Đăng nhập</h3>
        <p className="text-center">Đăng nhập vào tài khoản của bạn để tiếp tục
        .</p>
        <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Địa chỉ email"
            id="email"
            name="email"
            onChg={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
            className="form-control py-3 mb-3"
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            placeholder="Mật khẩu"
            id="pass"
            name="password"
            onChg={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            className="form-control py-3 mb-3"
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <a href="http://localhost:3000/forgotpassword" className="">
              Quên mật khẩu?
            </a>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;