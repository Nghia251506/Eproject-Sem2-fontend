import React, { useState } from 'react';
import _admin from '../Asset/css/_navigation.module.css'
import _icon from '../Asset/css/_icon.module.css'
import {useNavigate} from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const Admin = () => {
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
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          className={_admin.sider}
          items={[
            {
              key: '',
              icon: <UserOutlined />,
              label: 'User',
              children:[
                {
                  key: "customers",
                  icon: <FontAwesomeIcon icon={faUsers}/>,
                  label: 'Custommer',
                },
                {
                  key: "employees",
                  icon: <UserOutlined />,
                  label: 'Employee',
                },
                
              ]
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
              children:[
                {
                  key: '31',
                  label: 'sub nav 1',
                },
                {
                  key: '32',
                  label: 'sub nav 2',
                },
                {
                  key: '33',
                  label: 'sub nav 3',
                },
                {
                  key: '34',
                  label: 'sub nav 4',
                },
                {
                  key: '35',
                  label: 'sub nav 5',
                },
                {
                  key: '36',
                  label: 'sub nav 6',
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;