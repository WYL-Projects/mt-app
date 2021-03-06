'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,//导出文件目录 
    filename: utils.assetsPath('js/[name].[chunkhash].js'), //导出的文件名 
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') //非入口文件的文件名，而又需要被打包出来的文件命名配置,如按需加载的模块 
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({// js压缩插件
      uglifyOptions: {
        compress: {// 压缩配置
          warnings: false//不显示警告
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({// 将js中引入css分离插件
      filename: utils.assetsPath('css/[name].[contenthash].css'),// 分离出来的css文件名
    }),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({// 压缩提取出的css,并解决ExtractTextPlugin分离出的js重复问题(多个文件引用同一个css文件)
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,//生成html的插件,引入css文件和js文件
      template: 'index.html',// 生成的html的文件名
      inject: true,// 注入的js文件会被放在Body标签中，当值为'head'的时候，将被放在head标签中
      minify: {
        removeComments: true,// 删除html中的注释代码
        collapseWhitespace: true,// 删除html中的空白符
        removeAttributeQuotes: true// 删除html元素中属性的引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'//按dependency的顺序引入
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({//分离公共js到vendor中
      name: 'vendor', // 文件名
      minChunks (module) {
        // 声明公告的模块来自 node_modules文件夹
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
   //上面虽然已经分离了第三方库,每次修改编译都会改变vendor的hash值，导致浏览器缓存失效。
// 原因是vendor包含了webpack在打包过程中会产生一些运行时代码，运行时代码中实际上保存了打包后的文件名。
// 当修改业务代码时,业务代码的js文件的hash值必然会改变。一旦改变必然会导致vendor变化。vendor变化会导致其hash值变化。
    new webpack.optimize.CommonsChunkPlugin({//下面主要是将运行时代码提取到单独的manifest文件中，防止其影响vendor.js
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([ // 复制静态资源,将static文件内的内容复制到指定文件夹
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']//忽视.*文件
      }
    ])
  ]
})

if (config.build.productionGzip) {// 配置文件开启gzip压缩
  const CompressionWebpackPlugin = require('compression-webpack-plugin') // 引入压缩文件的组件，该插件会对生成的文件进行压缩，生成一个.gz文件


  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',// 目标文件名
      algorithm: 'gzip',// 使用gzip压缩
      test: new RegExp( // 满足正则表达式的文件会被压缩
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 资源文件大于10KB的时候会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8的时候会被压缩
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
