// node代码， 会用 babel 处理
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
import { Provider } from 'react-redux';
import store from '../src/store/store';

const app = express();

// 注：设置成静态资源目录
app.use(express.static('public'))

// 监听根路由
// app.get('/', (req, res) => {
// 监听所以的路由，防止爆出404错误
app.get('*', (req, res) => {
  // const Page = <App title="Domesy"></App>;
  // 把react组件解析成dome（html）
  // const content = renderToString(App);
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
      </StaticRouter>
    </Provider>
  );
  // 字符串模版
  res.send(`
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>React SSR</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>
  `)
});

app.listen(9093,()=>{
  console.log('监听完毕')
})