import React, { Component } from "react";

// 创建一个函数接收一个组件返回另一个组件
function withStage(Component) {
  const NewComponent = props => {
    return <Component {...props} stage="react" />;
  };
  return NewComponent;
}

// 功能：日志记录
function withLog(Component) {
  console.log(Component.name + "加强了");

  return props => {
    return <Component {...props} />;
  };
}

// 在装饰器的写法中不能用函数式组件只能用类组件，并且是从上调用，应写在Domesy组件的上面
@withLog
@withStage
@withLog
class Domesy extends Component {
  render() {
    return (
      <div>
        {this.props.stage} - {this.props.name}
      </div>
    );
  }
}

export default Domesy;
