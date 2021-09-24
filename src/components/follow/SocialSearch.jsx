import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default function Social() {
  const onSearch = (value) => console.log(value);

  return (
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{ marginBottom: '1rem' }}
    />
  );
}
