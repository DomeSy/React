// 嵌套路由：目录下创建_layout
export default function({match, children}) {
  return (
    <div>
      {/* 参数的获取 */}
      <h1>user/{match.params.id}</h1>
      {children}
    </div>
  );
}