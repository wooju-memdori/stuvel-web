import React from 'react';
import Icon from '@ant-design/icons';

const LinkShareSvg = () => (
  <svg
    width="4.375em"
    height="4.375em"
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="35" cy="35" r="35" fill="#480094" />
    <path
      d="M26.4106 53.8245C23.95 55.5897 20.4998 55.3668 18.2888 53.1558L17.2546 52.1217C14.794 49.6611 14.794 45.6759 17.2546 43.2153L23.1477 37.3223C25.6083 34.8617 29.5934 34.8617 32.054 37.3223L33.0882 38.3565C35.3349 40.6031 35.531 44.1336 33.6677 46.5942"
      stroke="white"
      strokeWidth="2.67459"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38.366 33.0875L37.3318 32.0534C34.8712 29.5927 34.8712 25.6076 37.3318 23.147L43.2248 17.254C45.6854 14.7934 49.6706 14.7934 52.1312 17.254L53.1653 18.2882C55.626 20.7488 55.626 24.7339 53.1653 27.1945L47.2723 33.0875C44.8117 35.5392 40.8266 35.5392 38.366 33.0875Z"
      stroke="white"
      strokeWidth="2.67459"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40.6388 29.9315L29.9404 40.6299"
      stroke="white"
      strokeWidth="2.67459"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.1823 52.9776C31.6545 52.9776 32.8479 51.7841 32.8479 50.3119C32.8479 48.8397 31.6545 47.6462 30.1823 47.6462C28.7101 47.6462 27.5166 48.8397 27.5166 50.3119C27.5166 51.7841 28.7101 52.9776 30.1823 52.9776Z"
      fill="#FB95FD"
    />
  </svg>
);

const ExitSvg = () => (
  <svg
    width="4.375em"
    height="4.375em"
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="35" cy="35" r="35" fill="#AD2929" />
    <path
      d="M32.6019 19.5964C33.9871 19.5964 35.1101 18.4735 35.1101 17.0883C35.1101 15.703 33.9871 14.5801 32.6019 14.5801C31.2167 14.5801 30.0938 15.703 30.0938 17.0883C30.0938 18.4735 31.2167 19.5964 32.6019 19.5964Z"
      fill="#FB95FD"
    />
    <path
      d="M39.3361 17.0883H48.2145C50.9004 17.0883 53.0742 19.2621 53.0742 21.9479V47.7246C53.0742 50.4105 50.9004 52.5843 48.2145 52.5843H31.6494"
      stroke="white"
      strokeWidth="3.72654"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5243 23.8323L13.0657 33.2811C12.2348 34.3342 12.3218 35.8511 13.2686 36.8075L22.6498 46.1791"
      stroke="white"
      strokeWidth="3.72654"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.7627 34.9996H42.1579"
      stroke="white"
      strokeWidth="3.72654"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.7277 29.4839V39.8989L12.1289 34.1504L16.7277 29.4839Z"
      fill="white"
    />
  </svg>
);

/*eslint-disable */
export const LinkShareIcon = (props) => (
  <Icon component={LinkShareSvg} {...props} />
);
export const ExitIcon = (props) => <Icon component={ExitSvg} {...props} />;
