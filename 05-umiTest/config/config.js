// 可配置路由，在根目录下创建config文件夹下的config.js文件
export default {
  routes: [
    { path: "/", component: "./index" },
    {
      path: "users",
      // 这里的./是相对于pages下的目录结构
      component: "./users/_layout",
      routes:[
        { path: "users/", component: "./users/index" },
        { path: "users/:id", component: "./users/$id" },
      ]      
    }
  ]
}