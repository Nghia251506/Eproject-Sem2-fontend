import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACategory,
  getCategories,
  resetState,
} from "../../features/Category/categorySlice";
import CustomModal from "../../DataEntry/Modal/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "category_name",
    sorter: (a, b) => a.category_name.length - b.category_name.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const categoryState = useSelector((state) => state.category || {});

  const showModal = (id) => {
    setOpen(true);
    setcategoryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);
  console.log("-----");
  const categories = categoryState.categories || [];
  console.log(categories);
  // console.log('Category State:', categoryState.Categories); // Kiểm tra giá trị
  const data1 = [];
  // categoryState.map((category, index) =>({
  //   key: index + 1,
  //   category_name: category.category_name,
  //   action: (
  //     <>
  //       <Link
  //         to={`/admin/category/${category._id}`}
  //         className="fs-3 text-danger"
  //       >
  //         <BiEdit />
  //       </Link>
  //       <button
  //         className="ms-3 fs-3 text-danger bg-transparent border-0"
  //         onClick={() => showModal(category._id)}
  //       >
  //         <AiFillDelete />
  //       </button>
  //     </>
  //   ),
  // }));
  for (let i = 0; i < categories.length; i++) {
    data1.push({
      key: i + 1,
      name: categories[i].category_name,
      action: (
        <>
          <Link
            to={`/admin/brand/${categories[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categories[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteACategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách loại sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(categoryId);
        }}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default Categorylist;