// import {React, useState, useEffect} from 'react';
// import '../../Asset/css/_grid.css'
// import CustomInput from '../../DataEntry/Input/CustomInput';
// import _bill from '../../Asset/css/_bill.module.css'
// import { Table } from "antd";
// import { IoMdAddCircle } from "react-icons/io";
// const columns = [
//     {
//       title: "STT",
//       dataIndex: "key",
//     },
//     {
//       title: "Mã Sản Phẩm",
//       dataIndex: "code",
//     },
//     {
//       title: "Tên Sản Phẩm",
//       dataIndex: "name",
//       sorter: (a, b) => a.name.length - b.name.length,
//     },
//     {
//       title: "Tồn kho",
//       dataIndex: "quantity",
//     },
//     {
//       title: "Giá (VND)",
//       dataIndex: "price",
//       sorter: (a, b) => a.price - b.price,
//       render: (price) => Number(price).toLocaleString("vi-VN"),
//     },
//     {
//       title: "Hành Động",
//       dataIndex: "action",
//     },
//   ];
// function AddBill(){
//     return(
//         <div>
//             <div className="col-12 d-flex gap-4">
//                 <div className="col-6">
//                     <div>
//                         <form action="addproductinbill" onSubmit="#">
//                             <div className="d-flex">
//                                 <div>
//                                     <CustomInput
//                                         type="text"
//                                         name="product"
//                                         placeholder="Nhập mã sản phẩm"
//                                         onChg=""
//                                         value=""
//                                         className={_bill.input_add_product}
//                                     />
//                                 </div>
//                                 <div>
//                                     <button type="submit" className={_bill.btn_add_product}><IoMdAddCircle className="fs-4"/></button>
//                                 </div>
//                             </div>
//                             <Table columns={columns}/>
//                         </form>
//                     </div>
//                 </div>
//                 <div className="col-6">
//                     <form className={_bill.form}>
//                         <div className="d-flex">
//                             <div>
//                                 <CustomInput
//                                     type="text"
//                                     name="product"
//                                     placeholder="Nhập tên/số điện thoại khách hàng"
//                                     onChg=""
//                                     value=""
//                                     className={_bill.input_add_product}
//                                 />
//                             </div>
//                             <div>
//                                 <button type="submit" className={_bill.btn_add_product}><IoMdAddCircle className="fs-4"/></button>
//                             </div>
//                         </div>
//                         <div className="customer_list">

//                         </div>
//                             <h4 className="">Khách hàng: </h4>
//                             <h4>Tính Tiền</h4>
//                             <div>
//                                 <span>Tiền hàng: </span>
//                             </div>
//                             <div className="d-flex align-items-center">
//                                 <span>Giảm giá (%): </span>
//                                 <CustomInput
//                                     type="number"
//                                     value=""
//                                     onChange=""
//                                     className=""
//                                     />
//                             </div>
//                             <div>
//                                 <span>Số tiền khách trả: </span>
//                                 <span> VND</span>
//                             </div>
//                             <div>
//                                 <span>Tổng tiền: </span>
//                                 <span> VND</span>
//                             </div>
//                             <div>
//                                 <label>
//                                 <CustomInput type="radio" name="payment" value="cash" defaultChecked />
//                                 Tiền mặt
//                                 </label>
//                                 <label>
//                                 <CustomInput type="radio" name="payment" value="qr" />
//                                 QR Momo
//                                 </label>
//                             </div>
//                             <div>
//                             <button type="submit" onClick="">
//                                 Thanh toán
//                             </button>
//                             </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddBill;

import React, { useState } from "react";
import "../../Asset/css/_grid.css";
import CustomInput from "../../DataEntry/Input/CustomInput";
import _bill from "../../Asset/css/_bill.module.css";
import { Table, Modal, Button } from "antd";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCode } from "../../features/product/productSlice";
// const handleRemoveProduct = (key) => {
//     // Xóa sản phẩm khỏi danh sách
//     dispatch({ type: "product/removeProduct", payload: key });
//   };
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
    // render: (_, record) => (
    //   <button
    //     onClick={() => handleRemoveProduct(record.key)}
    //     className={_bill.btn_remove_product}
    //   >
    //     Xóa
    //   </button>
    // ),
  },
];

function AddBill() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const customer = useSelector((state) => state.product.customer);

  const [productCode, setProductCode] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    dispatch(getProductByCode(productCode));
    setProductCode("");
  };

//   const handleSearchCustomer = async (e) => {
//     e.preventDefault();
//     dispatch(fetchCustomerByQuery(customerQuery));
//     setCustomerQuery("");
//   };

//   const handleAddCustomer = async () => {
//     dispatch(addCustomer(newCustomer));
//     setShowModal(false);
//     setNewCustomer({ name: "", phone: "" });
//   };

  

  return (
    <div>
      <div className="col-12 d-flex gap-4">
        {/* Cột tìm sản phẩm */}
        <div className="col-6">
          <form onSubmit={handleSearchProduct}>
            <div className="d-flex">
              <CustomInput
                type="text"
                name="product"
                placeholder="Nhập mã sản phẩm"
                value={productCode}
                onChg={(e) => setProductCode(e.target.value)}
                className={_bill.input_add_product}
              />
              <button type="submit" className={_bill.btn_add_product}>
                <IoMdAddCircle className="fs-4" />
              </button>
            </div>
          </form>
          <Table columns={columns} dataSource={products} />
        </div>

        {/* Cột tìm khách hàng */}
        <div className="col-6">
          <form onSubmit="">
            <div className="d-flex">
              <CustomInput
                type="text"
                name="customer"
                placeholder="Nhập tên/số điện thoại khách hàng"
                value={customerQuery}
                onChg={(e) => setCustomerQuery(e.target.value)}
                className={_bill.input_add_product}
              />
              <button type="submit" className={_bill.btn_add_product}>
                <IoMdAddCircle className="fs-4" />
              </button>
            </div>
          </form>
          <div>
            {customer ? (
              <h4>Khách hàng: {customer.name}</h4>
            ) : (
              <Button onClick={() => setShowModal(true)}>Thêm khách hàng</Button>
            )}
          </div>

          {/* Modal thêm khách hàng */}
          <Modal
            title="Thêm Khách Hàng"
            visible={showModal}
            onCancel={() => setShowModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowModal(false)}>
                Hủy
              </Button>,
              <Button key="submit" type="primary" >
                Thêm
              </Button>,
            ]}
          >
            <CustomInput
              type="text"
              placeholder="Tên khách hàng"
              value={newCustomer.name}
              onChg={(e) =>
                setNewCustomer((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <CustomInput
              type="text"
              placeholder="Số điện thoại"
              value={newCustomer.phone}
              onChg={(e) =>
                setNewCustomer((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AddBill;
