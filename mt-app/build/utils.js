'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) { // 生成loader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]// 默认的loader是css-loader

    if (loader) {// 如果参数loader还在
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {// 将loaderOptions和sourceMap组成一个对象
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {// 如果传入的options存在extract并且为true
      return ExtractTextPlugin.extract({ // ExtractTextPlugin 分离js中引入的css文件
        use: loaders,// 处理loader
        fallback: 'vue-style-loader'// 没有被提取分离时使用的loader
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {// 返回css类型对应的loader组成的对象  generateLoaders()来生成loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [] // 定义返回数组，数组中保存的是针对各类型的样式文件的处理方式
  const loaders = exports.cssLoaders(options)// 调用cssLoaders方法返回各类型的样式对象 (css: loader)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'), //  处理文件的类型
      use: loader// 用loader来处理，loader来自loaders【extension】
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
