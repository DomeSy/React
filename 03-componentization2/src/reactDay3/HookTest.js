import React, { useState, useEffect, useReducer, useContext } from 'react';

// 但是无法取代Redux，原因是项目较大时，并不好维护

// 水果列表，调查对水果的喜爱
// 点击后会选择相应的水果
function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)} >{f}</li>
    ))
  )
}

// 添加水果
function FruitAdd(props) {
  const [pname, setPname] = React.useState('');

  const { dispatch, fruits } = useContext(Context);
  console.log('1',fruits);
  console.log('2',dispatch);

  const onAddFruit = (ev) => {
    if (ev.key === 'Enter') {
      // props.onAddFruit(pname);

      // 此时不用在通过传函数来执行;
      dispatch({ type: 'add', payload: pname });
      setPname('');
    }
  }
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  )
}

// 将状态移至全局
function fruitReducer(state, action) {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'add':
      return [...state, action.payload] //等同于[...fruits,pname]
    default:
      return state;
  }
}

// 创建上下文Context
const Context = React.createContext();


export default function HookTest() {

  // useState参数是状态初始值
  // 返回一个数组，第一个元素是状态变量，第二个是状态变更函数
  const [fruit, setFruit] = useState('草莓');
  // const [fruits, setFruits] = useState(['草莓','西瓜']);

  // const [fruits, setFruits] = useState([]);

  // 参数一是相关的reducer,参数二是初始值
  const [fruits, dispatch] = useReducer(fruitReducer, []);

  // 使用useEffect操作副作用
  // 第一个是回调函数，第二个是数组
  // 不加第二个参数，却导致一直循环的原因,useEffect:只要发生改变就会循环，无论值是否改变，所以导致不停的刷新setFruits，导致一直执行
  // 必须设置依赖，如果没有依赖，则设置空数组，代表只执行一次
  useEffect(() => {
    // 会循环调用
    console.log('get fruits');
    setTimeout(() => {
      // setFruits(['草莓',"香蕉"])

      dispatch({ type: 'init', payload: ['草莓', "香蕉"] })
    }, 1000)
  }, [])

  // 副作用可以重复执行,但不可累加
  // 点水果名时改变title,操作DOM
  useEffect(() => {
    document.title = fruit;
  }, [fruit]);


  useEffect(() => {
    const timer = setInterval(() => {
      console.log('应用启动')
    }, 1000);

    // 返回清除函数,作用：如果组件卸载将停止调用，如果不写，当组件卸载时会造成内存泄露
    return function () {
      clearInterval(timer);
    }

  }, []);

  return (
    <Context.Provider value={{ fruits, dispatch }}>
      <div>
        <p>{fruit === '' ? '请选择喜爱的水果' : `你选择的是${fruit}`}</p>
        {/* <FruitAdd onAddFruit={pname => setFruits([...fruits,pname])} /> */}

        {/* <FruitAdd onAddFruit={pname => dispatch({type:"add", payload: pname})} /> */}

        <FruitAdd />
        <FruitList fruits={fruits} setFruit={setFruit} ></FruitList>
      </div>
    </Context.Provider>
  )
}
