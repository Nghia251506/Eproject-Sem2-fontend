import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import _button from '../Asset/css/_button.module.css'
const IconSearch = () => (
  <Flex gap="small" vertical>
  <Tooltip title="search">
        <Button type="primary" shape="circle" icon={<SearchOutlined />} className={_button.F15B39}/>
      </Tooltip>
  </Flex>
);

const TextSearch = () => (
    <Flex gap="small" vertical>
    <Button type="primary" icon={<SearchOutlined />} className={_button.F15B39}>
        Tìm kiếm
      </Button>
    </Flex>
  );
export  {IconSearch, TextSearch};