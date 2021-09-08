import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';

const TextContainer = ({ users }) => (
  <StyledTextContainer>
    {users ? (
      <div>
        <ActiveContainer>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta title={user.name} />
              </List.Item>
            )}
          />
        </ActiveContainer>
      </div>
    ) : null}
  </StyledTextContainer>
);

export default TextContainer;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  height: 60%;
  justify-content: space-between;
`;

const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50%;
`;
