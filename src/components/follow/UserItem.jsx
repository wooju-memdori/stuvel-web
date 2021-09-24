import React from 'react';
import { List } from 'antd';
import { number, shape, string, bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';

import axios from '../../utils/axios';
import { forceUserListUpdate } from '../../state/follow';

import UserProfile from './UserProfile';
import UserPopover from './UserPopover';
import { ChatSmallIcon, PlusIcon } from '../common/Icon';

export default function UserListItem({ item }) {
  const userListUpdate = useSetRecoilState(forceUserListUpdate);
  const userListRefresh = () => userListUpdate((n) => n + 1);

  const onClickFollow = (id) => () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        userListRefresh();
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
      <UserPopover item={item} userListRefresh={userListRefresh} />
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
