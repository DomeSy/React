// 动态路由：以$开头的文件或目录
export default function({match}) {
  return (
    <div>
      {/* 参数的获取 */}
      <h1>user/{match.params.id}</h1>
    </div>
  );
}
