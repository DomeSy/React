import React, { Component } from 'react'

function Cart(props) {
  return (
    <table>
      <tbody>
        {
          props.data.map(item => (
            <tr key={item.text} onClick={()=>{props.onSelect(item.text)}} > 
              <td>{item.text}</td>
              <td>{item.count}</td>
              <td>￥{item.price * item.count}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default class CartSample extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      name:"",
      goods:[
        {text:"百万年薪架构师", price: 100, id: 1},
        {text:"web全栈架构师", price: 60, id: 2},
        {text:"React全家桶", price: 170, id: 3},
      ],
      cart:[]
    }
    setTimeout(()=>{
      this.setState({title: "React购物车"})
    },1000)

    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  addGood = () => {
    this.setState({
      goods:[...this.state.goods,{text: this.state.name, price: 666}]
    })
  }

  addCart(good){
    const item = this.state.cart.find(c => c.text === good.text);
    if (item) {
      item.count += 1;
      this.setState({ cart: [...this.state.cart] });
    } else {
      this.setState({ cart: [...this.state.cart, {...good, count: 1}] });
    }
  }

  // 子父通信
  onSelect = (name) => {
    console.log(name);
  }

  render() {
    const {goods, title, name, cart} = this.state;
    return (
      <div>
        {/* 条件语句(&& | !) 或 三元表达式 */}
        {title && <h1>{title}</h1>}
        
        {/* 事件处理 */}
        <div>
          {/* React单向数据流 */}
          <input 
            type="text"
            value={name}
            onChange={e => this.handleChange(e)}
            // onChange={this.handleChange()}
          />
          <button onClick={this.addGood}>添加</button>
        </div>

        <ul>
          {/* 循环操作 */}
          {goods.map(good => 
          <li key={good.text}>
            {good.text}
            <button onClick={()=>{this.addCart(good)}} >加购</button>
          </li>)}
        </ul>

        {/* 购物车 */}
        <Cart data={cart} onSelect={this.onSelect}></Cart>
      </div>
    )
  }
}
