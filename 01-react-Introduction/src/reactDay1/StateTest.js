import React, { Component } from 'react'

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      counter:1
    }
  }

  /*
    setState：用来修改组件状态的方法

    setState的特性：
      1>状态是封闭的，只有组件自己能够访问和修改
      2>批量执行:对同一个key多次操作会合并，也就是只执行最后一次
                多个key会一次执行
      3>可能是异步(大多数是异步)，如果要获取到最新状态的值(同步)，有三种方式：
        a.传递函数给setState
        b.定时器：将延迟时间设置为0秒(原因：事件循环)
        c.原生事件中(原因：跳过了React的事件机制)
        d.在setState中的第二个参数的回调函数也可以获取到

    使用setState的两种方式：
      1>对象  setState({})
      2>回调函数  setState(cb)
  */

  componentDidMount(){
    this.timer = setInterval(() => {
      this.setState({
        date:new Date()
      })
    },1000);

    // 批量操作
    this.setState({ counter:this.state.counter + 1 });
    this.setState({ counter:this.state.counter + 1 });
    this.setState({ counter:this.state.counter + 1 });

    // 异步
    console.log(this.state.counter); // 1

    // 传递函数给setState
    this.setState((prev)=>{
      console.log(prev.counter); //2
      return prev.counter
    });

    // 定时器
    setTimeout(()=>{
      console.log(this.state.counter); //2
    },0);

    // 原生事件中
    document.body.addEventListener('click',this.changeCounter);

    //在setState中的第二个参数的回调函数也可以获取到
    this.setState({ counter:this.state.counter + 1 }, ()=>{
      console.log('cb'+this.state.counter);
    });
    
  }

  changeCounter = () =>{
    this.setState({ counter:this.state.counter + 1 });
    console.log(this.state.counter); //3
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    const {date,counter} = this.state;
    return(
      <div>
        {date.toLocaleString()}
        <p>{counter}</p>
      </div>
    )
  }
}

export default class StateTest extends Component {
  render() {
    return (
      <div>
        <Clock/>
      </div>
    )
  }
}
