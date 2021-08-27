import React from 'react';
import { Button, Col } from 'antd';

const HomePage = () => {
  return (
    <Col span={4}>
      <Button href="/room" type="primary" shape="round" centered="true">
        랜덤으로 출발하기
      </Button>
    </Col>
  );
};

export default HomePage;
