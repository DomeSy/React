// redux原理

// createStore
export function createStore(reducer, enhancer){
  
  // enhancer:中间件，可以理解为applyMidlleware
  if(enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = {};
  let currentListeners = [];

  function getState(){
    return currentState;
  }

  function subscribe(listener){
    currentListeners.push(listener);
  }

  function dispatch(action){
    currentState = reducer(currentState, action);
    currentListeners.forEach(v => v());
    return action;
  }

  dispatch({ type:'@IMOOC/KKB-REDUX' });
  return { getState, subscribe, dispatch }
}

// applyMiddleware
// 传过来多个中间件
export function applyMiddleware(...middlewares){
  // createStore:就是上述的createStore
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    // 封装了midApi对象，在中间件内又进行了一层处理，使之得到 getState 和 dispatch
    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    // 实际上是线性执行，使之合并成一个函数
    // compose：函数合成
    dispatch = compose(...middlewareChain)(store.dispatch);
    
    return {
      ...store,
      dispatch
    }
  }
}

// compose：函数
export function compose(...funcs){
  if(funcs.length == 0){
    return arg => arg;
  }
  if(funcs.length == 1){
    return funcs[0];
  }

  // 聚合 数组里的一左(left)一右(right)  然后先执行左边，在执行右边
  return funcs.reduce((left, right) => (...args) => right(left(...args)))
}

// bindActionCreateors
function bindActionCreateor(creator, dispatch){
  return (...args) => dispatch(creator(...args));
}
export function bindActionCreateors(creators, dispatch){
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreateor(creators[item], dispatch);
    return ret;
  },{})
}