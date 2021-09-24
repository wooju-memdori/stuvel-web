import React from 'react';
import { List, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { number, shape, string, bool, func } from 'prop-types';

import axios from '../../utils/axios';

export default function SocialPopover({ item, userListRefresh }) {
  const onClickUnfollow = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        userListRefresh(id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Popover
      style={{ borderRadius: 0 }}
      placement="bottomRight"
      content={
        <List split={false} size="small">
          {item.roomId && <List.Item>비행 따라가기</List.Item>}
          {item.following && (
            <List.Item
              onClick={onClickUnfollow(item.id)}
              style={{ cursor: 'pointer' }}
            >
              언팔로우
            </List.Item>
          )}
          <List.Item>차단</List.Item>
          <List.Item>신고</List.Item>
          <List.Item>초대</List.Item>
        </List>
      }
      trigger="click"
    >
      <EllipsisOutlined style={{ fontSize: '2.5em' }} />
    </Popover>
  );
}

SocialPopover.propTypes = {
  item: shape({
    id: number,
    nickname: string,
    image: string,
    roomId: string,
    following: bool,
  }).isRequired,
  userListRefresh: func.isRequired,
};
