import React, { useState, useEffect, useReducer, useContext } from 'react';
import {connect} from 'react-redux';

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)} >{f}</li>
    ))
  )
}

// 添加水果
// 作为一个常量使用
const FruitAdd = connect()(
  function FruitAdd({dispatch}) {
    const [pname, setPname] = React.useState('');
  
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
  
)

function HookReduxTest({fruits,loading,dispatch}) {
  const [fruit, setFruit] = useState('草莓');


  useEffect(() => {
    dispatch({ type: "loading_start" });
    setTimeout(()=>{
      dispatch({ type: "loading_end" });
      dispatch({type:"init",payload: ['草莓','菠萝']});
    },1000);
  },[]);

  return (
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
  )
}

// connect：两个参数，第一个参数，状态的映射，第二个，dispatch的映射
export default connect(
  // 映射函数
  state => ({fruits: state.list,loading:state.loading}),
  // 如果第二个属性不传的话，他会默认将dispatch传进去

)(HookReduxTest)
