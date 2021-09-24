import React from 'react';
import { List } from 'antd';
import { arrayOf } from 'prop-types';
import 'antd/dist/antd.css';

import UserItem from './UserItem';

export default function UserList({ list }) {
  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => <UserItem item={item} />}
    />
  );
}

UserList.propTypes = {
  list: arrayOf(Object).isRequired,
};
