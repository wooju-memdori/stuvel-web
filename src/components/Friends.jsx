import React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { Modal, Tabs, Input } from 'antd';
import UserList from './UserList';

import {
  isModalVisibleState,
  followersState,
  followingsState,
} from '../state/atom';

const { TabPane } = Tabs;
const { Search } = Input;

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

  const onSearch = (value) => console.log(value);

  return (
    <Modal
      title="Followers"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ backgroundColor: '#290054' }}
    >
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ marginBottom: '1rem' }}
      />
      {followers.state === 'hasValue' && followings.state === 'hasValue' && (
        <Tabs tabBarStyle={{ color: 'white' }}>
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
