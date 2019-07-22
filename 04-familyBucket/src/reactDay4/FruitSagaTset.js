import React, { useState, useEffect, useReducer, useContext } from 'react';
import { connect } from 'react-redux';
// import { loadingStart, loadingEnd, init } from '../store/index.js';
import { BrowserRouter, Link, Route, Redirect, Switch } from 'react-router-dom';
import {login} from '../store/user.redux';
import {asyncFetch} from '../store/fruit.redux';

function FruitList({ fruits, setFruit }) {
  return (
    <div>
      <ul>
        {
          fruits.map(f => (
            <li key={f} onClick={() => setFruit(f)} >
              <Link to={`/list/detail/${f}`} >{f}</Link>
            </li>
          ))
        }
      </ul>
      <Route path='/list/detail/:fruit' component={Detail}/>
    </div>
   
  )
}

// 命令式的导航
function Detail({match,history,location}) {
  // console.error( match,history,location);
  return (
    <div>
      {/* fruit是前面写的占位符 */}
      <h3>{match.params.fruit}的详情</h3>
      <p>.....</p>
      <div>
        <button onClick={history.goBack}>返回</button>
      </div>
    </div>
  )
}

// 路由守卫
// 创建高阶组件包装Route组件使其可以验证用户登录态
const PrivateRoute = connect(state => ({
  // 增加状态
  isLogin: state.user.isLogin 
}))(
  function({ component: Component, isLogin, ...rest }) {
    // component需要重新命名为Component,原因是JSX需要大写  
    // 结构props为component和rest
    // rest为传递给Route的属性
    console.log( rest );
    return (
      <Route
        {...rest}
        render={
          // 执行登录判断逻辑从而动态生成组件
          props =>
            isLogin ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { redirect: props.location.pathname } // 重定向地址
                }}
              />
            )
        }
      />
    );
  }
)


// 登录组件
const Login = connect(state => ({
  isLogin: state.user.isLogin,
  }),
  { login }
)(function ({ location, isLogin, login }) {
  const redirect = location.state.redirect || "/"; // 重定向地址

  if (isLogin) return <Redirect to={redirect} />;

  return (
    <div>
      <p>用户登录</p>
      <hr />
      <button onClick={() =>{
        let num = Math.random();
        if(num >= 0.5){
          login('Domesy');
        }else{
          login('Jerry');
        }
      }}>登录</button>
    </div>
  );}
)

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
  console.log('furit',fruits);
  const [fruit, setFruit] = useState('草莓');


  useEffect(() => {
    asyncFetch(['草莓','菠萝']);
  },[]);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/list">水果列表</Link>
        <Link to="/add">添加水果</Link>
      </nav>
      <div>
        <Switch>
          {/* render:条件渲染 */}
          <Route 
            // exact 
            // path="/"
            path="/list" 
            render={() => (
              // 加载状态处理 
              loading ? (
                <div>数据加载中....</div>
              ) : (
                <FruitList fruits={fruits} setFruit={setFruit} />
              )
            )
          } ></Route>
          
          <PrivateRoute path="/add" component={FruitAdd} />
          {/* 路径和组件相匹配 */}
          {/* <Route path="/add" component={FruitAdd} /> */}
          {/* 创建一个与之匹配的组件 */}
          {/* <Route path="/detail/:fruit" component={Detail} ></Route> */}

          {/* 重定向处理:当地址栏中的地址不存在时，自动跳到/list */}
          {/* <Redirect to="/list" ></Redirect> */}

          <Route path="/login" component={Login} />
          {/* 不占独一个页面，解决Switch： */}
          <Route component={()=><h3>页面不存在</h3>}/>
        </Switch>
      </div>
    </BrowserRouter>
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
  asyncFetch
};

// connect：两个参数，第一个参数，状态的映射，第二个，dispatch的映射
export default connect(
  // 映射函数
  mapStateToProps,
  // 如果第二个属性不传的话，他会默认将dispatch传进去
  mapDispatchToProps
)(HookReduxTest)
