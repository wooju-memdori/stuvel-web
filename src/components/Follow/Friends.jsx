import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { Tabs, Input } from 'antd';
import UserList from './UserList';

import { followersState, followingsState } from '../../state/atom';

const { TabPane } = Tabs;
const { Search } = Input;

export default function Friends() {
  const followers = useRecoilValueLoadable(followersState());
  const followings = useRecoilValueLoadable(followingsState());
  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ marginBottom: '1rem' }}
      />
      {followers.state === 'hasValue' && followings.state === 'hasValue' && (
        <Tabs>
          <TabPane tab={`팔로워(${followers.contents.length}명)`} key="1">
            <UserList list={followers.contents} />
          </TabPane>
          <TabPane tab={`팔로잉(${followings.contents.length}명)`} key="2">
            <UserList list={followings.contents} />
          </TabPane>
          <TabPane tab="나와 비행한 여행자" key="3">
            Coming Soon
          </TabPane>
        </Tabs>
      )}
    </>
  );
}
