import React from 'react';
import { List, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { arrayOf } from 'prop-types';

import 'antd/dist/antd.css';

export default function UserList({ list }) {
  return (
    <List
      itemLayoot="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Badge dot={item.roomId}>
                <Avatar src={item.image} icon={<UserOutlined />} />
              </Badge>
            }
            title={item.nickname}
            description={
              item.roomId ? `${item.roomId} 행성에서 공부중` : '오프라인'
            }
          />
        </List.Item>
      )}
    />
  );
}

UserList.propTypes = {
  list: arrayOf(Object).isRequired,
};
