import React, { Component } from 'react';
// 函数式组件 无状态 展示组件
function Welcome1(props) {
  // props只是形参
  return (
    <div>
      {/* 父传子 */}
      Welcome1,{props.name} - {props.age}
    </div>
  )
}

// 类组件 有状态
class Welcome2 extends Component {

  render(){
    return (
      <div>
        {/* 父传子 */}
        Welcome2,{this.props.name} - {this.props.age}
      </div>
    )
  }
}

export default class CompType extends Component {
  render() {
    return (      
      <div>
        {/* 属性是只读的不能修改 */}
        {/* 将嵌套复杂的组件抽取为更小的组件是最佳实践 */}
        <Welcome1 name="tom" age="20" />
        <hr/>
        <Welcome2 name="jerry" age="20" />
      </div>
    )
  }
}
