import React from 'react';
import { List, Avatar, Badge, Popover } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { arrayOf } from 'prop-types';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import 'antd/dist/antd.css';

import axios from '../../utils/axios';
import { forceUserListUpdate } from '../../state/follow';

import { ChatSmallIcon, PlusIcon } from '../common/Icon';

export default function UserList({ list }) {
  const userListUpdate = useSetRecoilState(forceUserListUpdate);
  const forceUpdate = () => userListUpdate((n) => n + 1);

  const onClickFollow = (id) => () => {
    console.log('onClickFollow');
    axios
      .post(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        forceUpdate();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onClickUnfollow = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/follow/${id}`)
      .then(() => {
        forceUpdate(id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <List
      split={false}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            style={{ color: 'white' }}
            avatar={
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
            }
            title={item.nickname}
            description={item.id === 2 ? `A-384B 행성에서 공부중` : '오프라인'}
          />
          <PlusIcon
            style={{ marginRight: '1em' }}
            onClick={onClickFollow(item.id)}
          />
          <ChatSmallIcon style={{ marginRight: '0.8em' }} />
          <Popover
            style={{ borderRadius: 0 }}
            placement="bottomRight"
            content={
              <List split={false} size="small">
                {item.roomId && <List.Item>비행 따라가기</List.Item>}
                <List.Item onClick={onClickUnfollow(item.id)}>
                  언팔로우
                </List.Item>
                <List.Item>차단</List.Item>
                <List.Item>신고</List.Item>
                <List.Item>초대</List.Item>
              </List>
            }
            trigger="click"
          >
            <EllipsisOutlined style={{ fontSize: '2.5em' }} />
          </Popover>
        </List.Item>
      )}
    />
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

UserList.propTypes = {
  list: arrayOf(Object).isRequired,
};