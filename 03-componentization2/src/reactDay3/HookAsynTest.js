import React, { useState, useEffect, useReducer, useContext } from 'react';

// 基于 useReducer的方式实现异步
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
    case "init":
      return { ...state, list: action.payload };
    case "add":
      return { ...state, list: [...state.list, action.payload] };
    case "loading_start":
      return { ...state, loading: true };
    case "loading_end":
      return { ...state, loading: false };
    default:
      return state;
  }
}

// 判断对象是否是Promise
function isPromise(obj) {
  return (
    !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
  )
}

// moke是一个异步方法
async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(p);
    }, 1000);
  });
}

// 对dispatch函数进行封装，使其支持处理异步action
function wrapDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "loading_start" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "loading_end" });
      });
    } else {
      dispatch(action);
    }
  };
}

// 创建上下文Context
const Context = React.createContext();


export default function HookAsynTest() {
  const [fruit, setFruit] = useState('草莓');

  // const [fruits, dispatch] = useReducer(fruitReducer, []);

  const [{ list: fruits, loading}, originDispatch] = useReducer(fruitReducer,{ list:[], loading: false});

  const dispatch = wrapDispatch(originDispatch);

  useEffect(() => {
    console.log("get fruits");
    dispatch({ type: "init", payload: asyncFetch(["草莓", "香蕉"]) });
  },[]);

  return (

    <Context.Provider value={{ fruits, dispatch }}>
      <div>
      <p>{fruit === "" ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>
        <FruitAdd />
        {/* 加载状态处理 */}
        {
          loading ? (
            <div>数据加载中....</div>
          ) : (
            <FruitList fruits={fruits} setFruit={setFruit} />
          )
        }
      </div>
    </Context.Provider>
  )
}
