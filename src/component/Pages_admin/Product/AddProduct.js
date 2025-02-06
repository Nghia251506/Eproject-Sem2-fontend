import { React, useEffect, useState } from "react";
import CustomInput from "../../DataEntry/Input/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/Band/brandSlice";
import { ListCategories } from "../../features/Category/categorySlice";
import _input from '../../Asset/css/_input.module.css'
import { createProduct, getAProduct, updateAProduct } from "../../features/product/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];

  const [formValues, setFormValues] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    brand_id: "",
    image_url: "",
  });

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.category.categories);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(ListCategories());

    if (getProductId) {
      dispatch(getAProduct(getProductId));
    }
  }, [dispatch, getProductId]);
  // console.log(getProductId);
  useEffect(() => {
    // Kiểm tra nếu product.result tồn tại và là một mảng
    const productData = product?.[0] || {}; // Lấy phần tử đầu tiên hoặc để trống nếu không có phần tử
    if(Object.keys(productData).length > 0){
      setFormValues({
        id: productData.id || "",
        code: productData.code || "",
        name: productData.name || "",
        description: productData.description || "",
        price: productData.price || "",
        quantity: productData.quantity || "",
        category_id: productData.category_id || "",
        brand_id: productData.brand_id || "",
        image_url: productData.image_url || "",
      });
    }
      
      console.log(formValues);
  }, [product]);
  
  
  useEffect(() => {
    console.log('Current formValues:', formValues);
  }, [formValues]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,  // Cập nhật giá trị của trường tương ứng
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Kiểm tra nếu giá trị quan trọng nào đó bị thiếu
    if (!formValues.name || !formValues.price || !formValues.quantity) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    if (getProductId) {
      // console.log(data);
      dispatch(updateAProduct({id:getProductId, productData:formValues}));
      console.log("Dữ liệu gửi đi backend: ", formValues);
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      dispatch(createProduct(formValues));
      toast.success("Thêm sản phẩm thành công!");
    }
  
    setTimeout(() => {
      navigate("/admin/list-product");
    }, 2000);
  };
  

  return (
    <div>
      <h3 className="mb-4 title">
        {getProductId ? "Cập nhật" : "Thêm"} sản phẩm
      </h3>
      <form onSubmit={handleSubmit} className="d-flex gap-3 flex-column">
      <span>Mã sản phẩm</span>
        <CustomInput
          type="text"
          name="code"
          value={formValues.code}
          onChg={handleInputChange}
          readOnly = {true}
        />
        <span>Tên sản phẩm</span>
        <CustomInput
          type="text"
          placeholder="Nhập tên sản phẩm"
          name="name"
          value={formValues.name}
          onChg={handleInputChange}
          className="form-control py-3 mb-3"
        />
        <span>Mô tả sản phẩm</span>
        <CustomInput
          type="text"
          name="description"
          value={formValues.description}
          onChg={handleInputChange}
          className="form-control py-3 mb-3"
        />
        <span>Giá sản phẩm</span>
        <CustomInput
          type="number"
          placeholder="Nhập giá sản phẩm"
          name="price"
          value={formValues.price}
          onChg={handleInputChange}
          className="form-control py-3 mb-3"
        />
        <span>Số lượng sản phẩm</span>
        <CustomInput
          type="number"
          placeholder="Nhập số lượng sản phẩm"
          name="quantity"
          value={formValues.quantity}
          onChg={handleInputChange}
          className="form-control py-3 mb-3"
        />
        <span>Thể loại sản phẩm</span>
        <select
          name="category_id"
          value={formValues.category_id}
          onChange={handleInputChange}
          className="form-control py-3 mb-3"
        >
          <option value="">Chọn loại sản phẩm</option>
          {catState.map((i) => (
            <option key={i.id} value={i.id}>
              {i.category_name}
            </option>
          ))}
        </select>
        <span>Hãng sản phẩm</span>
        <select
          name="brand_id"
          value={formValues.brand_id}
          onChange={handleInputChange}
          className="form-control py-3 mb-3"
        >
          <option value="">Chọn thương hiệu</option>
          {brandState.map((i) => (
            <option key={i.id} value={i.id}>
              {i.brand_name}
            </option>
          ))}
        </select>
        <span>Link hình ảnh sản phẩm</span>
        <CustomInput
          type="text"
          placeholder="URL hình ảnh"
          name="image_url"
          value={formValues.image_url}
          onChg={handleInputChange}
          className="form-control py-3 mb-3"
        />

        <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
          {getProductId ? "Cập nhật" : "Thêm"} sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
