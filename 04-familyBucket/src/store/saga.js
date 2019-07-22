// 任务清单
import { call, put, takeEvery } from "redux-saga/effects";

// 模拟登录
const UserService = {
  login(uname) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uname === "Domesy") {
          resolve({ id: 1, name: "Domesy", age: 18 });
        } else {
          reject("用户名或密码错误");
        }
      }, 1000);
    });
  }
};

// worker Saga
// function* 生成器函数
function* login(action) {
  try {
    // yield: 代表将来脚本一步一步操作，即每一步执行完才会执行
    // put：相当于dispatch 派发
    yield put({ type: "requestLogin" });
    // call：调用异步接口，并且传参 
    const result = yield call(UserService.login, action.uname);
    yield put({ type: "loginSuccess", result });
  } catch (message) {
    yield put({ type: "loginFailure", message });
  }
}

function* mySaga() {
  // takeEvery相当于事件监听
  yield takeEvery("login", login);
}

export default mySaga;