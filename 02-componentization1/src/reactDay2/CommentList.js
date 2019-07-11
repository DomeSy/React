import React, { Component,PureComponent } from 'react'
// 注：PureComponent在react的15.3版本后出现

/*
  尽量写为纯组件，因为如果值没有发生变化时，会一直渲染
  当然react有diff算法，如果值没有发生变化，也不会去做真正的更新操作，
  但本省diff算法也会消耗资源，所以尽可能的减少diff算法，从而优化性能
*/


// 容器组件
export default class CommentList extends Component {
  constructor(props){
    super(props);
    this.state={
      comments:[]
    };
  }

  componentDidMount() {
    setInterval(()=>{
      this.setState({
        comments:[
          {body:"react is very good", author: "facebook" },
          {body:"vue is very good", author: "youyuxi" },
        ]
      });
    },1000);
  }
  
  render() {
    return (
      <div>
        {this.state.comments.map((c,i) => (
          // <Comment key={i} data={c} />
          <Comment key={i} {...c} />
        ))}
      </div>
    );
  }
}

// 展示组件
// function Comment({ data }){

//   // 会一直打印 render commpent
//   console.log("render commpent");  
//   return (
//     <div>
//       <p>{data.body}</p>
//       <p> --- {data.author}</p>
//     </div>
//   )
// }

// PureComponent:纯函数组件，只能比较值，对象不能比较，因为只是浅比较
// class Comment extends PureComponent{
//   render() {
//     const {data} = this.props;

//     // 还是会一直渲染 原因:PureComponent只是浅比较，比较的是地址，但在定时器中，获取的地址并不同，（对象的地址在改变）所以会一直渲染
//     console.log("render commpent");  
//     return (
//       <div>
//         <p>{data.body}</p>
//         <p> --- {data.author}</p>
//       </div>
//     )
//   }
// }

// shouldComponentUpdate优化
// class Comment extends Component{
//   shouldComponentUpdate(props){
//     if( props.data.body === this.props.data.body && props.data.author === this.props.data.author ){
//       return false;
//     }
//     return true;
//   }

//   render() {
//     const {data} = this.props;

//     //只会渲染一次
//     console.log("render commpent");  
//     return (
//       <div>
//         <p>{data.body}</p>
//         <p> --- {data.author}</p>
//       </div>
//     )
//   }
// }

// 优化方式：
//  1>immutable.js
//  2>将对象结构成值的方式

//  PureComponent 将对象结构成值的方式
// class Comment extends PureComponent{
//   render() {
//     const { body, author } = this.props;

//     // 还是会一直渲染 原因:PureComponent只是浅比较，比较的是地址，但在定时器中，获取的地址并不同，（对象的地址在改变）所以会一直渲染
  //   console.log("render commpent");  
  //   return (
  //     <div>
  //       <p>{body}</p>
  //       <p> --- {author}</p>
  //     </div>
  //   )
  // }
// }

// 展示组件
// React.memo高阶组件 在版本16.6.0
const Comment = React.memo(function({ body,author }){
  // 也只会渲染一次
  console.log("render commpent");  
  return (
    <div>
      <p>{body}</p>
      <p> --- {author}</p>
    </div>
  )
});