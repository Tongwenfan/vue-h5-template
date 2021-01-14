// let webpackMinZip = require('webpack_min_zip');
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Timestamp = new Date().getTime();
const flag = (process.env.NODE_ENV !== 'developemnt');
module.exports = {
  // output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
  //     filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
  //     chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
  //   },

  publicPath: flag ? './' : '', //修改绝对路径
  outputDir: flag ? "dist/mobile" : 'dist', //修改build后名称
  // assetsDir: process.env.NODE_ENV === 'production' &&'assets',
  productionSourceMap: flag ? false : true,
  css: {
    // 是否使用css分离插件
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // 换算的基数 1rem = 10px  设计图出图为750 则 1rem = 10px * 2
            // selectorBlackList: ['van'], // 忽略转换正则匹配项
            // 默认转换 1rem = 20px ，只需要写px 自动转换。
            // 750设计图的时候 所有px 在开发时候 / 2
            propList: ['*']
          })
        ]
      }
    }
  },
  configureWebpack: config => {


    if (flag) {
      // 为生产环境修改配置...
      config.output.chunkFilename = `js/[name].[contenthash:8].${Timestamp}.js`;
      return {


        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                // 删除注释
                output: {
                  comments: false
                },
                // 删除console debugger 删除警告
                compress: {

                  drop_console: false,//console
                  drop_debugger: false,
                  pure_funcs: ['console.log']//移除console
                }
              }
            }),
            new TerserPlugin({
              sourceMap: false,
              terserOptions: {
                compress: {
                  drop_console: true
                }
              }
            })
          ]
        }
      }
    }
  },

  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
    // 需要各位自己配置proxy 
    //  disableHostCheck: true,
    // open: process.platform === 'darwin',
    // host: 'localhost',
    // open: true, //配置自动启动浏览器 
    // proxy: {
    //   '/api': {
    //     target: 'http://10.8.10.193', //对应自己的接口
    //     changeOrigin: true,
    //     ws: true,
    //     // pathRewrite: {
    //     //   '^/*': ''
    //     // }
    //   }
    // }
  },
}



