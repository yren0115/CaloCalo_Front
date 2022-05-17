const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
        '/api/': {
            target: 'http://appalb-calocalo-579011708.ap-northeast-1.elb.amazonaws.com:8000'
        }
    }
}
})