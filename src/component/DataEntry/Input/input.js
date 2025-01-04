import React from 'react';
import { Input, Space } from 'antd';
import {TextSearch} from '../../Generral/Button'
const INPUT = () => (
  <Space.Compact
      style={{
        width: '100%',
      }}
    >
      <Input defaultValue="" placeholder='Tìm kiếm sản phẩm' />
      <TextSearch type="primary"/>
    </Space.Compact>
  );
  export {INPUT};

