// 模拟几个接口

const express = require('express');
const app = express();

app.get('/api/course/list', (req, res) => {
  
  // 支持跨域调用
  res.header('Access-Control-Allow-Origin','*');
  // 支持请求方式
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  // 设置请求格式 
  res.header('Content-Type',"appliction/json;charet=utf-8");
  res.json({
    code: 0,
    list: [
      {name: 'Web全栈', id: 1},
      {name: 'React', id: 2},
      {name: 'Vue', id: 3},
      {name: 'Node', id: 4},
    ]
  })
})

app.listen(9090, ()=>{
  console.log('mock启动完毕！ ')
})
