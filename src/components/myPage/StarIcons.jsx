import React from 'react';
import PropTypes from 'prop-types';
import { StarFilledIcon, StarIcon } from '../common/Icon';

const StarIcons = ({ mobumScore }) => {
  return {
    5: (
      <>
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
      </>
    ),
    4: (
      <>
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
        <StarIcon />
      </>
    ),
    3: (
      <>
        <StarFilledIcon />
        <StarFilledIcon />
        <StarFilledIcon />
        <StarIcon />
        <StarIcon />
      </>
    ),
    2: (
      <>
        <StarFilledIcon />
        <StarFilledIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    ),
    1: (
      <>
        <StarFilledIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </>
    ),
  }[mobumScore];
};

StarIcons.propTypes = {
  mobumScore: PropTypes.number.isRequired,
};

export default StarIcons;
