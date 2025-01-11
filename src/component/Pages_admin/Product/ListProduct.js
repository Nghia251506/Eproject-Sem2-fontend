import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../../DataEntry/Modal/CustomModal";
import { toast } from "react-toastify";

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
  const data1 = productState.map((product, index) => ({
    key: index + 1,
    code: product.code,
    name: product.name,
    brand: product.brand_name, // Lấy tên thương hiệu
    category: product.category_name, // Lấy tên loại sản phẩm
    quantity: product.quantity,
    price: product.price,
    action: (
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
    ),
  }));

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    toast.success("Sản phẩm đã được xóa thành công!");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
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
