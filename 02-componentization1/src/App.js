import React from 'react';
// 普通引入
// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"

// 按需加载
import { Button } from "antd";
import CommentList from './reactDay2/CommentList';
import Hoc from './reactDay2/Hoc';
import HocDecorator from './reactDay2/HocDecorator';
import Composition from './reactDay2/Composition';
import ContextTest from './reactDay2/ContextTest';

function App() {
  return (
    <div>
      {/* antd例子  */}
      {/* <Button type="primary">Button</Button> */}

      {/* 性能优化问题： React.PureComponent和React.memo */}
      {/* <CommentList/> */}

      {/* 高阶组件 */}
      {/* <Hoc name="hoc" /> */}
      {/* 装修器写法 */}
      {/* <HocDecorator name="hoc" /> */}

      {/* 组件复合 */}
      {/* <Composition/> */}

      {/* 上下文 */}
      <ContextTest/>
    </div>
 );
}

export default App;
