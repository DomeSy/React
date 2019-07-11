import React,{ Component } from 'react';

function Domesy(props) {
  return (
    <div>
      {props.stage} - {props.name}
    </div>
  )
}


// 下面两种形式都是高阶组件
// const withDomesy = (Component) => {
//   // props:传过来的参数
//   const NewComponent = (props) => {
//     return <Component {...props} stage="react" /> 
//   };
//   return NewComponent;
// }

// 创建一个函数接收一个组件返回一个强化后的组件
function withDomesy(Component) {
  const NewComponent = (props) => {
    return <Component {...props} stage="react"/> 
  };
  return NewComponent;
}

// 功能：日志记录
function withLog(Component){
  console.log(Component.name + "加强了");

  return props => {
    return <Component {...props} />
  }
}

// export default withDomesy(Domesy);

// 链式调用：从里向外
export default withLog(withDomesy(withLog(Domesy))) ;
