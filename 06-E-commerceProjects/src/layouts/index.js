import { Layout, Menu } from "antd";
import Link from "umi/link";
import styles from "./index.css";

const { Header, Footer, Content } = Layout;

export default function (props) {

  console.log(props);
  // 通过location传来的地址来确定
  // const selectedKeys = [props.location.pathname];
  
  // 将数据循环遍历出来
  const menus = [
    {path: "/",name:'商品'},
    {path: "/users",name:'用户'},
    {path: "/about",name:'我的'}
  ];

  const pathname = props.location.pathname;
  const selectedKeys = menus.filter( menu => {
    if(menu.path === "/") {
      return pathname === "/";
    }
    // return pathname.indexOf(menu.path) !== -1;
    return pathname.startsWith(menu.path);
  }).map(menu => menu.path)



  return (
    <Layout>
      {/* 页头 */}
      <Header className={styles.header}>
        <img
          className={styles.logo}
          src="https://img.kaikeba.com/logo-new.png"  
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ lineHeight: "64px", float: "left" }}  
        >
          {
            menus.map( menu =>
              <Menu.Item key={menu.path}>
                <Link to={menu.path}>{menu.name}</Link>
              </Menu.Item>  
            )
          }
        </Menu>
      </Header>
      {/* 内容 */}
      <Content className={styles.content}>
        <div className={styles.box}>{props.children}</div>
      </Content>
      {/* 页脚 */}
      <Footer className={styles.footer}>Domesy</Footer>
    </Layout>
  );
}
