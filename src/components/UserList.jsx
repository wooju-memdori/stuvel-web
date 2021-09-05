/* eslint-disable */

import React from 'react';
import { List, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { arrayOf } from 'prop-types';
import styled from 'styled-components';

import 'antd/dist/antd.css';

export default function UserList({ list }) {
  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            style={{ color: 'white' }}
            avatar={
              <>
                <Badge
                  dot
                  offset={[-7, 45]}
                  style={{
                    width: '0.9em',
                    height: '0.9em',
                    background: '#FB95FD',
                    zIndex: 2,
                  }}
                >
                  <StyledAvatar src={item.image} icon={<UserOutlined />} />
                </Badge>
              </>
            }
            title={item.nickname}
            description={
              item.roomId ? `${item.roomId} 행성에서 공부중` : '오프라인'
            }
          >
            <div>안녕</div>
          </List.Item.Meta>
        </List.Item>
      )}
    />
  );
}

const StyledAvatar = styled(Avatar)`
  & {
    width: 3em;
    height: 3em;
    border: 3px solid #d300ff;
    position: relative;
    padding: 4px;
  }
  &:after {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid #290054;
    border-radius: 30px;
  }
`;

UserList.propTypes = {
  list: arrayOf(Object).isRequired,
};
