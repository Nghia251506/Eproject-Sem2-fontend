import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import _navigation from '../Asset/css/_navigation.module.css'
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
const BottomLeft = () => (
    <Dropdown
    menu={{
      items,
    }}
    placement="bottomLeft"
    arrow
  >
    <Space className={_navigation.bottomleft}> 
      <MenuOutlined /> Danh mục
    </Space>
  </Dropdown>
);
{/* <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
        arrow
      >
        <Button>bottom</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
      >
        <Button>bottomRight</Button>
      </Dropdown>
    </Space>
    < wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="topLeft"
        arrow
      >
        <Button>topLeft</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="top"
        arrow
      >
        <Button>top</Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="topRight"
        arrow
      >
        <Button>topRight</Button>
      </Dropdown> */}
export {BottomLeft};