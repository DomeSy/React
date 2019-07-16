import React, { useState, useEffect, useReducer, useContext } from 'react';
import {connect} from 'react-redux';
import {loadingStart, loadingEnd, init} from '../store/index.js';

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)} >{f}</li>
    ))
  )
}

function FruitAdds({dispatch}) {
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
// 添加水果
// 作为一个常量使用
const FruitAdd = connect()(FruitAdds);

function HookReduxTest({fruits, loading, loadingStart, loadingEnd, init}) {
  const [fruit, setFruit] = useState('草莓');


  useEffect(() => {
    loadingStart();
    setTimeout(()=>{
      loadingEnd();
      init(['草莓','菠萝']);
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

// mapStateToProps:
const mapStateToProps = state => ({
  fruits: state.fruit.list,
  loading: state.fruit.loading
});

// mapDispatchToProps:
// const mapDispatchToProps = dispatch =>({
//   loadingStat: () => dispatch({type:'loading_start'});
// })

// 等同于
// 在reducer中分别导出
const mapDispatchToProps = {
  loadingStart,
  loadingEnd,
  init
};

// connect：两个参数，第一个参数，状态的映射，第二个，dispatch的映射
export default connect(
  // 映射函数
  mapStateToProps,
  // 如果第二个属性不传的话，他会默认将dispatch传进去
  mapDispatchToProps
)(HookReduxTest)
