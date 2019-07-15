import React from 'react';
import HookTest from './reactDay3/HookTest';
import AntdFrom from './reactDay3/AntdFrom';
import KeyFromTest from './reactDay3/KeyFromTest';
import Hooks from './reactDay3/Hooks';
import HookAsynTest from './reactDay3/HookAsynTest';

function App() {
  return (
    <div>
      {/* Hook相关语法 */}
      {/* <HookTest /> */}

      {/* 基于 useReducer的方式实现异步 */}
      <HookAsynTest/>

      {/* 练习Hook */}
      {/* <Hooks/> */}

      {/* antd表单 */}
      {/* <AntdFrom /> */}

      {/* 仿antd表单 */}
      {/* <KeyFromTest /> */}

    </div>
 );
}

export default App;
