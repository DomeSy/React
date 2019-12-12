import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Index from './container/index';
import About from './container/about';

// function App(props){
//   const [count, setCount] = useState(1);
//   return <div>
//   <h1>Hi {props.title} ! {count}</h1>
//     <button onClick={() => setCount(count + 1)}>累加</button>
//   </div>
// }

export default (
  <div>
    <Route path="/" exact component={Index}></Route>
    <Route path="/about" exact component={About}></Route>
  </div>
)