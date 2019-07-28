// 可配置路由，在根目录下创建config文件夹下的config.js文件
export default {
  plugins: [
    ['umi-plugin-react', {
      // 按需加载
      antd: true,
      dva:true
    }]
  ],
  routes: [
    { path: "/", component: "./index" },
    { path: "/login", component: "./login" },
    { path: "/goods", component: "./goods" },
    { 
      path: "/about", component: "./about", 
      // Routes与routes的区别在于./ 的不同，Routes的./是基于根目录，而routes是基于pages下的目录
      Routes:[
      './routes/PrivateRoute.js'  // 相对根目录
    ] },
    {
      path: "users",
      component: "./users/_layout",
      routes:[
        { path: "users/", component: "./users/index" },
        { path: "users/:id", component: "./users/$id" },
      ]      
    },
    // 配置404页面
    { component: "./NotFound"}
  ]
}