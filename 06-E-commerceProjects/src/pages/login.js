import React, { Component } from "react";
import styles from "./login.css";

import { Login } from "ant-design-pro";
import { connect } from "dva";

// 通用的用户名、密码、和提交文件
const { UserName, Password, Submit } = Login;

export default function(props) {

  // 重定向地址
  // const from = props.location.state.from || "/";

  const onSubmit = (err, values) => {
    console.log(err, values);
  };
  return (
    <div className={styles.loginForm}>
      {/* logo */}
      <img className={styles.logo} src="https://img.kaikeba.com/logo-new.png"/>
      {/* 登录表单 */}
      <Login onSubmit={onSubmit}>
        <UserName
          name="username"
          placeholder="Domesy"
          rules={[{ required: true, message: "请输入用户名" }]}
        />
        <Password
          name="password"
          placeholder="123"
          rules={[{ required: true, message: "请输入密码" }]}
        />
        <Submit>登录</Submit>
      </Login>
    </div>
  );
}
