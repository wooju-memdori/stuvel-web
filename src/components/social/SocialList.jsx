import React from 'react';
import { List } from 'antd';
import { arrayOf } from 'prop-types';
import { useRecoilValue } from 'recoil';

import SocialItem from './SocialItem';
import { searchKeywordState } from '../../state/follow';

export default function SocialList({ list }) {
  const searchKeyword = useRecoilValue(searchKeywordState);

  const filteredList = list.filter(
    (item) =>
      !searchKeyword ||
      item.nickname.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={filteredList}
      renderItem={(item) => <SocialItem item={item} />}
    />
  );
}

SocialList.propTypes = {
  list: arrayOf(Object).isRequired,
};
