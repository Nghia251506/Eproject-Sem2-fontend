import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../DataEntry/Modal/CustomModal";
import { toast } from "react-toastify";

const ListProduct = () => {
  // Cấu hình cột
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Mã Sản Phẩm",
    dataIndex: "code",
  },
  {
    title: "Tên Sản Phẩm",
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
    title: "Thương Hiệu",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
  },
  {
    title: "Loại Sản Phẩm",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
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
    title: "Hành Động",
    dataIndex: "action",
  },
];
  const [openDetailModal, setOpenDetailModal] = useState(false); // Modal chi tiết sản phẩm
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal xác nhận xóa sản phẩm
  const [productID, setProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu thông tin sản phẩm được chọn
  // const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Kiểm soát trạng thái mở modal chi tiết


  const truncateText = (text, maxLength) => {
    // Kiểm tra xem text có phải là chuỗi và chiều dài của nó có vượt quá maxLength không
    return typeof text === 'string' && text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products) || [];
  const loading = useSelector((state) => state.product.loading);

  const data1 = productState?.map((product, index) => ({
    key: index + 1,
    code: product?.code || "N/A",
    name: product?.name || "N/A",
    brand: product?.brand_name || "N/A", // Lấy tên thương hiệu
    category: product?.category_name || "N/A", // Lấy tên loại sản phẩm
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

  if (loading) {
    return toast.loading("Đang tải danh sách sản phẩm");
  }

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
        performAction={() => console.log()}
>
  {selectedProduct ? (
    <div>
      <p><strong>Mã Sản Phẩm:</strong> {selectedProduct.code}</p>
      <p><strong>Tên Sản Phẩm:</strong> {selectedProduct.name}</p>
      <p><strong>Thương Hiệu:</strong> {selectedProduct.brand}</p>
      <p><strong>Loại Sản Phẩm:</strong> {selectedProduct.category}</p>
      <p><strong>Tồn Kho:</strong> {selectedProduct.quantity}</p>
      <p><strong>Giá:</strong> {Number(selectedProduct.price).toLocaleString("vi-VN")} VND</p>
      {/* Ô input để thêm thông tin */}
      {/* <Input.TextArea placeholder="Nhập thông tin chi tiết..." rows={4} /> */}
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
