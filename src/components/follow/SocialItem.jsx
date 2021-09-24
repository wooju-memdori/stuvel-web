import React from 'react';
import { List } from 'antd';
import { number, shape, string, bool } from 'prop-types';
import { useSetRecoilState } from 'recoil';

import axios from '../../utils/axios';
import { forceUserListUpdate } from '../../state/follow';

import SocialProfile from './SocialProfile';
import SocialPopover from './SocialPopover';
import { ChatSmallIcon, PlusIcon } from '../common/Icon';

export default function SocialItem({ item }) {
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
      <SocialProfile item={item} />
      <PlusIcon
        style={{ marginRight: '1em' }}
        onClick={onClickFollow(item.id)}
      />
      <ChatSmallIcon style={{ marginRight: '0.8em' }} />
      <SocialPopover item={item} userListRefresh={userListRefresh} />
    </List.Item>
  );
}

SocialItem.propTypes = {
  item: shape({
    id: number,
    nickname: string,
    image: string,
    roomId: string,
    following: bool,
  }).isRequired,
};
