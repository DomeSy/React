import { createStore, applyMiddleware } from 'redux';

// 中间件声明的时候按顺序来
// logger：日志
import logger from 'redux-logger';
// thunk:异步处理 
import thunk from 'redux-thunk';

export const init = (payload) => ({
  type: 'init',
  payload
});
export const add = (payload) => ({
  type: 'add',
  payload
});
export const loadingStart = () => ({
  type: 'loading_start',
});
export const loadingEnd = () => ({
  type: 'loading_end',
});

// 异步
export const asyncFetch = payload => {
  return dispatch => {
    dispatch({ type: "loading_start" });
    setTimeout(()=>{
      dispatch({ type: "loading_end" });
      dispatch({ type: "init", payload });
    },1000);
  }
}

function fruitReducer(state = {list:[],loading:false}, action) {
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

// 第二个参数是中间件函数
const store = createStore(fruitReducer,applyMiddleware(logger, thunk));

export default store;