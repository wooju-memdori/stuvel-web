/* eslint-disable */
import React from 'react';
import { List, Input } from 'antd';
import styled from 'styled-components';
import { SmallerCloseButtonIcon } from '../common/Icon';

const testUsers = ['태희', '희진', '해린', '해리'];

const TextContainer = ({ users }) => (
  <div>
    <PaddingDiv>
      <Input />
    </PaddingDiv>
    <List
      itemLayout="horizontal"
      dataSource={testUsers}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta title={user} style={{ fontSize: '1.143rem' }} />
          <SmallerCloseButtonIcon style={{ marginRight: '1rem' }} />
        </List.Item>
      )}
    />
  </div>
);

export default TextContainer;

const PaddingDiv = styled.div`
  padding: 0.5rem;
`;
