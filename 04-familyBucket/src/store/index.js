import { createStore, applyMiddleware, combineReducers } from 'redux';

// 中间件声明的时候按顺序来
// logger：日志
import logger from 'redux-logger';
// thunk:异步处理 
import thunk from 'redux-thunk';

import fruitReducer from './fruit.redux';
import user from './user.redux';

// 创建中间件
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';

const sagaMiddleware = createSagaMiddleware();

// 第二个参数是中间件函数
const store = createStore(
  combineReducers({fruit: fruitReducer,user}),
  applyMiddleware(logger, thunk, sagaMiddleware)
);

// 对清单的监听
sagaMiddleware.run(mySaga);

export default store;