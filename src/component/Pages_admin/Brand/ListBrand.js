import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetStateBrand,
} from "../../features/Band/brandSlice";
import CustomModal from "../../DataEntry/Modal/CustomModal";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "brand_name",
    sorter: (a, b) => a.brand_name.length - b.brand_name.length,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateBrand());
    dispatch(getBrands());
  }, [dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  // console.log(brandState);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      brand_name: brandState[i].brand_name,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Thương hiệu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Bạn có chắc chắn muốn xóa?"
      />
    </div>
  );
};

export default Brandlist;