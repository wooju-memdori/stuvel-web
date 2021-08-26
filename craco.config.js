const CracoLessPlugin = require('craco-less');

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
              '@component-background': 'rgba(0, 0, 0, 0)',
              '@border-radius-base': '0.571em',
              '@btn-font-weight': '700',
              '@checkbox-size': '1.2em',
              '@btn-font-size-lg': '1.286em',
              '@btn-font-size-sm': '1.286em',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
