import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../DataEntry/Modal/CustomModal";
import { toast } from "react-toastify";
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

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
    render: (name) => truncateText(name, 30),
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

const ListProduct = () => {
  const [open, setOpen] = useState(false);
  const [productID, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
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
    action: product?.id ?(
      <>
        <Link
          to={`/admin/add-product/${product.id}`}
          className="fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product.id)}
        >
          <AiFillDelete />
        </button>
      </>
    ): null,
  }));

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    toast.success("Sản phẩm đã được xóa thành công!");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  if(loading){
    return toast.loading("Đang tải danh sách sản phẩm");
  }

  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} pagination={{ pageSize: 5 }}/>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProduct(productID)}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default ListProduct;
