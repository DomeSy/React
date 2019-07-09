import React, { Component } from 'react';
import logo from '../logo.svg';
import './jsxTest.css';

function formatName(user){
  return user.firstName + '-' + user.lastName;
}

export default class JsxTest extends Component {
  render() {
    const name = 'DomeSy';
    const greet = <p>hello,DomeSy!</p>
    return (
      <div>
        {/* 表达式：合法的js表达式即可 */}
        <h1>{name}</h1>
        {/* 函数也是表达式 */}
        <p>{formatName({firstName:"tom",lastName:'Jerry'})}</p>
        {/* JSX也是表达式 */}
        {greet}
        {/* 属性 */}
        <img src={logo} style={{width:100}} alt="logo" className="img"/>      
        {/* React中的css属性是全局的   */}
        {/* 关键词规避：如label标签中的for 需要规避 为 htmlFor  class规避为className */}
        {/* <label htmlFor="ff">ff</label> */}
      </div>
    )
  }
}
