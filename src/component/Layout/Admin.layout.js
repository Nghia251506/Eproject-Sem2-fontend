import React, { useState } from 'react';
import _admin from '../Asset/css/_navigation.module.css'
import {Outlet, useNavigate} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import { FaListAlt, FaToggleOff, FaToggleOn, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Button, Layout, Menu, theme } from 'antd';
import {ToastContainer} from 'react-toastify'
const { Header, Sider, Content } = Layout;
const Admin = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          className={_admin.sider}
          items={[
            {
              key: '',
              icon: <AiFillDashboard className="fs-4"/>,
              label: 'Dashboard',
            },
            {
              key: '',
              icon: <UserOutlined className="fs-4"/>,
              label: 'User',
              children:[
                {
                  key: "customers",
                  icon: <FontAwesomeIcon icon={faUsers} className="fs-4"/>,
                  label: 'Custommer',
                },
                {
                  key: "employees",
                  icon: <UserOutlined className="fs-4"/>,
                  label: 'Employee',
                },
                
              ]
            },
            
            {
              key: 'catalog',
              icon: <FaListAlt className="fs-4"/>,
              label: 'Overview',
              children:[
                {
                  key: 'list-product',
                  icon: <AiFillProduct className="fs-4"/>,
                  label: 'Danh sách sản phẩm',
                },
                {
                  key: 'add-product',
                  icon: <IoMdAddCircle className="fs-4"/>,
                  label: 'Thêm sản phẩm',
                },
                {
                  key: "add-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Thêm thương hiệu",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Danh sách thương hiệu ",
                },
                {
                  key: "add-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Thêm loại sản phẩm",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Danh sách loại sản phẩm",
                },
              ]
            },
            {
              key: 'order',
              icon: <MdOutlineFavoriteBorder className="fs-4"/>,
              label: 'Order',
            },
            {
              key: 'bill',
              icon: <FaMoneyBillTransfer className="fs-4"/>,
              label: 'Bill',
              children:[
                {
                    key:'list-bill',
                    icon: <RiBillFill className="fs-4"/>,
                    label:'Danh sách hoá đơn',
                },
                {
                    key:'add-bill',
                    icon:<FaRegMoneyBillAlt className="fs-4"/>,
                    label:'Tạo mới hoá đơn',
                },
              ]
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <FaToggleOff /> : <FaToggleOn />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;