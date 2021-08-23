import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Modal, Tabs } from 'antd';
import UserList from './UserList';

import {
  isModalVisibleState,
  followersState,
  followingsState,
} from '../state/atom';

const { TabPane } = Tabs;

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
      {followers.state === 'hasValue' && followings.state === 'hasValue' && (
        <Tabs type="card">
          <TabPane tab={`팔로워(${followers.contents.length}명)`} key="1">
            <UserList list={followers.contents} />
          </TabPane>
          <TabPane tab={`팔로잉(${followings.contents.length}명)`} key="2">
            <UserList list={followings.contents} />
          </TabPane>
          <TabPane tab="나와 비행한 여행자" key="3">
            개발 중입니다~
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
}
