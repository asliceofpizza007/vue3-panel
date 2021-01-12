module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3-panel' : '/',
  devServer: {
    port: 9000
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
      alias: {
        '@as': '@/assets',
        '@c': '@/components',
        '@v': '@/views',
        '@img': '@/assets/img',
        '@scss': '@/assets/scss'
      }
    }
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@scss/mixins.scss";'
      }
    }
  }

}
