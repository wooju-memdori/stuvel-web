import React from 'react';
import { useRecoilValue } from 'recoil';
import { Tabs, Input } from 'antd';
import SocialList from './SocialList';

import { followersState, followingsState } from '../../state/follow';

const { TabPane } = Tabs;
const { Search } = Input;

export default function Social() {
  const followers = useRecoilValue(followersState);
  const followings = useRecoilValue(followingsState);
  const onSearch = (value) => console.log(value);

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{ marginBottom: '1rem' }}
      />
      {followers && followings && (
        <Tabs>
          <TabPane tab={`팔로워(${followers.length}명)`} key="1">
            <SocialList list={followers} />
          </TabPane>
          <TabPane tab={`팔로잉(${followings.length}명)`} key="2">
            <SocialList list={followings} />
          </TabPane>
          <TabPane tab="나와 비행한 여행자" key="3">
            Coming Soon
          </TabPane>
        </Tabs>
      )}
    </>
  );
}
