import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

import { SearchIcon } from './Icons';

const { Search } = Input;

export default function Social() {
  const onSearch = (value) => console.log(value);

  return (
    <StyledSearch
      placeholder="사용자 입력"
      allowClear
      onSearch={onSearch}
      enterButton={<SearchIcon />}
      style={{
        marginBottom: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        color: 'rgba(255, 255, 255, 0.5)',
      }}
    />
  );
}
const StyledSearch = styled(Search)`
  .ant-input-wrapper {
    border: 1px solid white;
    border-radius: 8px;
  }
  .ant-input-affix-wrapper {
    height: 2.6rem;
    border: 0;
  }
  .ant-input-group-addon {
    background-color: transparent;
    border: 0;
  }
  .ant-input-search-button {
    background-color: transparent;
    border: 0;
    padding: 0.8rem;
  }
`;
