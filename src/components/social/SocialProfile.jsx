import React from 'react';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { number, shape, string, bool } from 'prop-types';
import styled from 'styled-components';

export default function SocialProfile({ item }) {
  return (
    <Badge
      dot
      offset={[-7, 45]}
      style={{
        width: '0.9em',
        height: '0.9em',
        background: '#FB95FD',
        zIndex: 2,
      }}
    >
      <StyledAvatar src={item.image} icon={<UserOutlined />} />
    </Badge>
  );
}

const StyledAvatar = styled(Avatar)`
  & {
    width: 3em;
    height: 3em;
    border: 3px solid #d300ff;
    position: relative;
    padding: 4px;
  }
  &:after {
    content: ' ';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 4px solid #290054;
    border-radius: 30px;
  }
`;

SocialProfile.propTypes = {
  item: shape({
    id: number,
    nickname: string,
    image: string,
    roomId: string,
    following: bool,
  }).isRequired,
};
