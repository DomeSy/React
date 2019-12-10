const path = require('path');
// 规避node_modules
const nodeExternals = require('webpack-node-externals');

//  服务端的webpack
module.exports = {
  target: "node",
  mode: "development",
  // 项目的入口
  entry: './server/index.js',
  externals:[nodeExternals()],
  output: {
    // 输出的文件
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module:{
    // 规则
    rules:[
      {
        test: /\.js$/,
        // 支持JSX
        loader: 'babel-loader',
        exclude: /node_modules/,
        // 配置 @babel/preset-react:支持jsx @babel/preset-env 支持最新的jS语法
        options:{
          presets:['@babel/preset-react',['@babel/preset-env']]
        }
      }
    ]
  }
}

// 安装插件
// npm i webpack webpack-cli webpack-cli webpack-node-externals @babel/core @babel/preset-env @babel/preset-react -D