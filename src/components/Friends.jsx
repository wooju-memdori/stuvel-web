import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Modal } from 'antd';
import UserList from './UserList';

import {
  isModalVisibleState,
  followersState,
  followingsState,
} from '../state/atom';

export default function Friends() {
  const [isModalVisible, setIsModalVisible] =
    useRecoilState(isModalVisibleState);
  const followers = useRecoilValueLoadable(followersState());
  const followings = useRecoilValueLoadable(followingsState());

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Followers"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <h3>Followers</h3>
      {followers.state === 'hasValue' && <UserList list={followings} />}
      <h3>Followings</h3>
      {followings.state === 'hasValue' && <UserList list={followings} />}
    </Modal>
  );
}
