import React from 'react';
import { List } from 'antd';
import { arrayOf } from 'prop-types';
import 'antd/dist/antd.css';

import SocialItem from './SocialItem';

export default function SocialList({ list }) {
  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => <SocialItem item={item} />}
    />
  );
}

SocialList.propTypes = {
  list: arrayOf(Object).isRequired,
};
