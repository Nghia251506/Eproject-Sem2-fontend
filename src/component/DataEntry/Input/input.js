import React from 'react';
import { Input, Space } from 'antd';
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const INPUT = () => (
  <Space direction="vertical">
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Tìm kiếm"
      size="large"
      onSearch={onSearch}
    />
    
  </Space>
  );
  export default INPUT;

