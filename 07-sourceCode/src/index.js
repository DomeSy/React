// import React from 'react';
// import ReactDOM from 'react-dom';
import React, { Component } from './sourceCode/kreact';
import ReactDOM from './sourceCode/kreact-dom';


class Comp2 extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {}
  // }

  render() {
    return (
      <div>
        comp2
      </div>
    )
  }
}


function Comp(props) {
  return (
    <div>
      <h2>hi {props.name}</h2>
    </div>
  )
}

const foo = "bar";
const jsx = (
  <div id="dom" className={foo}>
    <span>hi</span>
    <Comp name="函数组件" />
    <Comp2 name="类组件" />
  </div>
);

// jsx 虚拟DOM 是由 React.createElement() => vdom
// console.log(jsx);

ReactDOM.render(jsx, document.getElementById('root'));
