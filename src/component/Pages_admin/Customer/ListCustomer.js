import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../features/Customer/customerSlice";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên người dùng",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "SĐT",
    dataIndex: "phone",
  },
  {
    title: "Ngày sinh",
    dataIndex: "birth_day",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: customerstate[i].customer_name,
        address: customerstate[i].address,
        phone: customerstate[i].phone,
        birth_day: customerstate[i].birth_day
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Danh sách người dùng</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;