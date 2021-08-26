const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#D300FF',
              '@info-color': '@primary-color',
              '@success-color': '@green-6',
              '@processing-color': '@blue-6',
              '@error-color': '@red-5',
              '@highlight-color': '@D300FF',
              '@warning-color': '@gold-6',
              '@normal-color': '#D300FF',
              '@white': 'rgba(0, 0, 0, 0)',
              '@black': '#fff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
