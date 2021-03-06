const { FallOutlined } = require('@ant-design/icons');
const CracoLessPlugin = require('craco-less');
const { withTheme } = require('styled-components');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // theme 컬러
              '@primary-color': '#D300FF',
              '@info-color': '@primary-color',
              '@success-color': '@green-6',
              '@processing-color': '@blue-6',
              '@error-color': '@red-5',
              '@highlight-color': '#D300FF',
              '@warning-color': '@gold-6',
              '@normal-color': '#D300FF',
              '@text-color': '#fff',
              '@text-color-secondary': 'fade(@white, 60%)',
              '@component-background': 'rgba(0, 0, 0, 0)',
              '@border-radius-base': '0.571em',
              '@btn-font-weight': '700',
              '@checkbox-size': '1.2em',
              '@layout-body-background':
                'linear-gradient(to bottom, #170428 0%, #1C013F 100%)',
              '@heading-color': '#fff',
              '@border-color-base': '#fff',
              '@btn-default-bg': 'rgba(255, 255, 255, 0.1)',
              '@btn-default-border': '#D300FF',
              '@btn-border-width': '0.15em',
              '@layout-footer-background': 'rgba(0, 0, 0, 0)',
              '@popover-arrow-width': '0',
              '@popover-bg': '#7D54B5',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
