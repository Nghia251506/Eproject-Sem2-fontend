import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../../features/product/productSlice";
import {resetStateDetail, createDetail}from "../../features/product/DetailSlice";
import {getAttributes, resetStateAttribute} from "../../features/Attribute/AttributeSlice"
import { Link } from "react-router-dom";
import CustomModal from "../../DataEntry/Modal/CustomModal";
import CustomInput from  "../../DataEntry/Input/CustomInput"
import { toast } from "react-toastify";

const ListProduct = () => {
  // Cấu hình cột
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã sản shẩm",
    dataIndex: "code",
  },
  {
    title: "Tên sản shẩm",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    render: (name, record) => (
      <span
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => showDetailModal(record)} // Mở modal hiển thị chi tiết sản phẩm
      >
        {truncateText(name, 30)}
      </span>
    ),
  },
  {
    title: "Tồn kho",
    dataIndex: "quantity",
  },
  {
    title: "Giá (VND)",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
    render: (price) => Number(price).toLocaleString("vi-VN"),
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_at",
  },
  {
    title: "Hành Động",
    dataIndex: "action",
  },
];
  const [openDetailModal, setOpenDetailModal] = useState(false); // Modal chi tiết sản phẩm
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal xác nhận xóa sản phẩm
  const [productID, setProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu thông tin sản phẩm được chọn
  // const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Kiểm soát trạng thái mở modal chi tiết
  const attributeState = useSelector((state) => state.attribute.attributes); 
  // const [attributes, setAttributes] = useState([{ id: "", value: "" }]);
  const [selectedSupplier, setSelectedSupplier] = useState(""); 
  const [suppliers, setSuppliers] = useState([]); // Danh sách supplier lấy từ DB
  // const [attributeOptions, setAttributeOptions] = useState([]); // Danh sách attribute từ DB
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products) || [];
  const {detail} = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.product.loading);


  const [formValues, setFormValues] = useState([{
    product_id: "",
    attribute_id: "",
    val: "",
    suppilier_id: ""
  }]);


  // Thêm attribute mới vào danh sách
const addAttribute = () => {
  setFormValues([...formValues, {attribute_id: ""}]);
};

// Xóa attribute khỏi danh sách
const removeAttribute = (index) => {
  setFormValues(formValues.filter((_, i) => i !== index));
};

// Cập nhật attribute khi chọn từ dropdown
const handleAttributeChange = (index, field, value) => {
  const updatedAttributes = [...formValues];
  updatedAttributes[index][field] = value;
  setFormValues(updatedAttributes);
};

// Thêm giá trị values cho attribute
const handleValueChange = (e) => {
  const {name, value} = e.target;
  setFormValues((formValues)=>({
    ...formValues,
    [name]: value, // Cập nhật giá trị của trường tương ứng
  }));
};



// Cập nhật supplier được chọn
const handleSupplierChange = (e) => {
  setSelectedSupplier(e.target.value);
};

// Xử lý gửi form
const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch(createDetail(formValues));
  toast.success("Thêm chi tiết sản phẩm thành công!");
};

// Thêm supplier mới
const addSupplier = () => {
  const newSupplier = prompt("Nhập tên nhà cung cấp mới:");
  if (newSupplier) {
    setSuppliers([...suppliers, newSupplier]);
    setSelectedSupplier(newSupplier);
  }
};

  const truncateText = (text, maxLength) => {
    // Kiểm tra xem text có phải là chuỗi và chiều dài của nó có vượt quá maxLength không
    return typeof text === 'string' && text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };
  const data1 = productState?.map((product, index) => ({
    key: index + 1,
    code: product?.code || "N/A",
    name: product?.name || "N/A",
    created_at: product?.created_at || "N/A", // Lấy tên loại sản phẩm
    quantity: product?.quantity || 0,
    price: product?.price || 0,
    action: product?.id ? (
      <>
        <Link
          to={`/admin/add-product/${product.id}`}
          className="fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showDeleteModal(product.id)} // Xác nhận xóa sản phẩm
        >
          <AiFillDelete />
        </button>
      </>
    ) : null,
  }));

  const showDetailModal = (product) => {
    setSelectedProduct(product); // Lưu thông tin sản phẩm được chọn
    setOpenDetailModal(true); // Mở modal
  };
  
  const hideDetailModal = () => {
    setOpenDetailModal(false); // Đóng modal
    setSelectedProduct(null); // Xóa thông tin sản phẩm
  };
  

  const showDeleteModal = (id) => {
    setProductId(id); // Lưu ID sản phẩm cần xóa
    setOpenDeleteModal(true); // Mở modal xác nhận xóa
  };

  const hideDeleteModal = () => {
    setOpenDeleteModal(false); // Đóng modal xác nhận xóa
  };

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpenDeleteModal(false);
    toast.success("Sản phẩm đã được xóa thành công!");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
// useEffect
 const CreateDetailProduct = () => {
  const detailData = detail?.[0] || {};
    if(Object.keys(detailData).length > 0){
      setFormValues(detailData.attributes.map((attr) => ({
        product_id: detailData.id,
        attribute_id: detailData.attribute_id,
        val: attr.val,
        supplier_id: detailData.supplier_id
      })));
      setSelectedSupplier(detailData.supplier_id);
      setSuppliers(detailData.suppliers);
    }
 }

  useEffect(()=>{
    dispatch(resetStateAttribute());
    dispatch(getAttributes());
  },[dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} pagination={{ pageSize: 5 }} />
      </div>

      {/* Modal chi tiết sản phẩm */}
      <CustomModal
  hideModal={hideDetailModal}
  open={openDetailModal}
  performAction = {() => CreateDetailProduct()}
  title="Thông tin chi tiết sản phẩm"
>
  {selectedProduct ? (
    <div >
      {/* Cột bên trái - Thông tin sản phẩm */}
      <div style={{ flex: "1" }}>
        <p><strong>Mã Sản Phẩm:</strong> {selectedProduct.code}</p>
        <p><strong>Tên Sản Phẩm:</strong> {selectedProduct.name}</p>
        <p><strong>Thương Hiệu:</strong> {selectedProduct.brand}</p>
        <p><strong>Loại Sản Phẩm:</strong> {selectedProduct.category}</p>
        <p><strong>Tồn Kho:</strong> {selectedProduct.quantity}</p>
        <p><strong>Giá:</strong> {Number(selectedProduct.price).toLocaleString("vi-VN")} VND</p>
      </div>

      {/* Cột bên phải - Thêm Attributes & Supplier */}
      <form onSubmit={handleSubmit}>
      <div style={{ flex: "1" }}>
        {/* Thêm Attributes */}
        <label><strong>Thêm Attributes:</strong></label>
        
          <div  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <select
              
            >
              <option value="">Chọn Attribute</option>
              {attributeState.map((attr) => (
                <option key={attr.id} value={attr.id}>{attr.name}</option>
              ))}
            </select>
            <CustomInput
              type="text"
              placeholder="Nhập giá trị"
              name="val"
              value={formValues.val}
              onChg={handleValueChange}
              style={{ flex: "3" }}
            />
            <button style={{ color: "red", border: "none", background: "none" }}>❌</button>
          </div>
        
        <button  style={{ marginTop: "5px" }}>➕ Thêm Attribute</button>
        <br></br>
        {/* Thêm Supplier */}
        <label><strong>Chọn Supplier:</strong></label>
        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
          <select value={selectedSupplier} onChange={handleSupplierChange} style={{ flex: "4" }}>
            <option value="">Chọn Supplier</option>
            {suppliers.map((sup) => (
              <option key={sup} value={sup}>{sup}</option>
            ))}
          </select>
          <button onClick={addSupplier} style={{ flex: "1" }}>➕</button>
        </div>
      </div>
      </form>
    </div>
  ) : (
    <p>Không có thông tin sản phẩm.</p>
  )}
</CustomModal>



      {/* Modal xác nhận xóa sản phẩm */}
      <CustomModal
        hideModal={hideDeleteModal}
        open={openDeleteModal}
        performAction={() => deleteProduct(productID)}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default ListProduct;
