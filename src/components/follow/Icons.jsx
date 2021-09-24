import React from 'react';
import Icon from '@ant-design/icons';
import { PlusSvg, ChatSmallSvg } from './Svgs';

/*eslint-disable */

export const PlusIcon = (props) => <Icon component={PlusSvg} {...props} />;

export const ChatSmallIcon = (props) => (
  <Icon component={ChatSmallSvg} {...props} />
);
