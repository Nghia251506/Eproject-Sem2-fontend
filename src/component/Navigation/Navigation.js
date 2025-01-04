import React,{useEffect} from 'react';
import { Button, Dropdown, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import _navigation from '../Asset/css/_navigation.module.css'
import {ClientListCategories, resetStateCategory} from '../features/Category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const BottomLeft = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStateCategory());
    dispatch(ClientListCategories());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category.categories);

  const menuItems = categoryState.map((category) => ({
    key: category._id,
    label: <a href={`/${category.category_name}`}>{category.category_name}</a>,
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      placement="bottomLeft"
      arrow
    >
      <Space className="bottomleft">
        <MenuOutlined /> Danh mục
      </Space>
    </Dropdown>
  );
};
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