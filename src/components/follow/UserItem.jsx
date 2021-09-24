import React from 'react';
import { List, Popover } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { number, shape, string, bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';

import axios from '../../utils/axios';
import { forceUserListUpdate } from '../../state/follow';

import UserProfile from './UserProfile';
import { ChatSmallIcon, PlusIcon } from '../common/Icon';

export default function UserListItem({ item }) {
  const userListUpdate = useSetRecoilState(forceUserListUpdate);
  const forceUpdate = () => userListUpdate((n) => n + 1);

  const onClickFollow = (id) => () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        forceUpdate();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onClickUnfollow = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        forceUpdate(id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <List.Item>
      <UserProfile item={item} />
      <PlusIcon
        style={{ marginRight: '1em' }}
        onClick={onClickFollow(item.id)}
      />
      <ChatSmallIcon style={{ marginRight: '0.8em' }} />
      <Popover
        style={{ borderRadius: 0 }}
        placement="bottomRight"
        content={
          <List split={false} size="small">
            {item.roomId && <List.Item>비행 따라가기</List.Item>}
            <List.Item
              onClick={onClickUnfollow(item.id)}
              style={{ cursor: 'pointer' }}
            >
              언팔로우
            </List.Item>
            <List.Item>차단</List.Item>
            <List.Item>신고</List.Item>
            <List.Item>초대</List.Item>
          </List>
        }
        trigger="click"
      >
        <EllipsisOutlined style={{ fontSize: '2.5em' }} />
      </Popover>
    </List.Item>
  );
}

UserListItem.propTypes = {
  item: shape({
    id: number,
    nickname: string,
    image: string,
    roomId: string,
    following: bool,
  }).isRequired,
};
