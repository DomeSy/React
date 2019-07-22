// redux-thunk原理
// next是下一步的中间件
const thunk = ({ dispatch, getState }) => next => action => {
  // 如果action是函数的话，那么会一直调用action,直到返回下一步的next
  if(typeof action == 'function') {
    return action(dispatch, getState);
  }
  return next(action);
}

export default thunk;