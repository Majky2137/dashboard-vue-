const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: 'https://pro-api.coinmarketcap.com/'
  },
  transpileDependencies: true,
  lintOnSave: false
});

