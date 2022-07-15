const path = require("path");

module.exports = async ({ config, mode }) => {
  const rules = config.module.rules
  rules.push({ 		test: /\.(sass|scss)$/, 		use: ['style-loader', 'css-loader', 'sass-loader'], 	} );
  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    },
    module: {
      rules
    }
  };
};
