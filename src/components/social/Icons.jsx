import React from 'react';
import Icon from '@ant-design/icons';
import { SearchSvg, PlusSvg, ChatSmallSvg } from './Svgs';

/*eslint-disable */

export const SearchIcon = (props) => <Icon component={SearchSvg} {...props} />;

export const PlusIcon = (props) => <Icon component={PlusSvg} {...props} />;

export const ChatSmallIcon = (props) => (
  <Icon component={ChatSmallSvg} {...props} />
);
