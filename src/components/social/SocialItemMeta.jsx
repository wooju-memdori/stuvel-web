import React from 'react';
import { List } from 'antd';
import { number, shape, string, bool } from 'prop-types';

import SocialProfile from './SocialProfile';

export default function SocialItemMeta({ item }) {
  return (
    <List.Item.Meta
      style={{ color: 'white' }}
      avatar={<SocialProfile item={item} />}
      title={item.nickname}
      description={item.roomId ? `${item.roomId} 행성에서 공부중` : '오프라인'}
    />
  );
}

SocialItemMeta.propTypes = {
  item: shape({
    id: number,
    nickname: string,
    image: string,
    roomId: string,
    following: bool,
  }).isRequired,
};
