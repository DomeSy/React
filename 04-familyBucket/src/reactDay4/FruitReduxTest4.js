import React, { useState, useEffect, useReducer, useContext } from 'react';
import { connect } from 'react-redux';
import { loadingStart, loadingEnd, init, asyncFetch } from '../store/index.js';
import { BrowserRouter, Link, Route } from 'react-router-dom';

function FruitList({ fruits, setFruit }) {
  return (
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)} >
        <Link to={`/detail/${f}`} >{f}</Link>
      </li>
    ))
  )
}

// 命令式的导航
function Detail({match,history,location}) {
  console.error( match,history,location);
  return (
    <div>
      <h3>{match.params.fruit}的详情</h3>
      <p>.....</p>
      <div>
        <button onClick={history.goBack}>返回</button>
      </div>
    </div>
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

function HookReduxTest({fruits, loading, loadingStart, loadingEnd, init, asyncFetch}) {
  const [fruit, setFruit] = useState('草莓');


  useEffect(() => {
    asyncFetch(['草莓','菠萝']);
  },[]);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">水果列表</Link>
        <Link to="/add">添加水果</Link>
      </nav>
      <div>
        {/* render:条件渲染 */}
        <Route exact path="/" render={() => (
          // 加载状态处理 
          loading ? (
            <div>数据加载中....</div>
          ) : (
            <FruitList fruits={fruits} setFruit={setFruit} />
          )
        )} ></Route>

        {/* 路径和组件相匹配 */}
        <Route path="/add" component={FruitAdd} />
        {/* 创建一个与之匹配的组件 */}
        <Route path="/detail/:fruit" component={Detail} ></Route>
      </div>
    </BrowserRouter>
  )
}

// mapStateToProps:
const mapStateToProps = state => ({
  fruits: state.list,
  loading: state.loading
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
  init,
  asyncFetch
};

// connect：两个参数，第一个参数，状态的映射，第二个，dispatch的映射
export default connect(
  // 映射函数
  mapStateToProps,
  // 如果第二个属性不传的话，他会默认将dispatch传进去
  mapDispatchToProps
)(HookReduxTest)
