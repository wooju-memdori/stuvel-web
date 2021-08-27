import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Home from '../components/Home';
import Room from '../components/Room';
import RoomContainer from './RoomContainer';
import Navigation from '../components/Navigation';
import { collapsedState } from '../state/atom';

const IndexContainer = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCollapse={onCollapse} collapsed={collapsed} />
      <Layout className="site-layout">
        <Layout.Content>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/room/" component={RoomContainer} exact />
            <Route path="/room/:id" component={Room} exact />
          </Switch>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default IndexContainer;
