import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getIndexList } from '../store/index';
 
function Index(props){
  const [count, setCount] = useState(1);
  useEffect(() => {
    // 异步数据首页显示 在查看网页源代码的时候，ul是没有数据的，原因是他在加载完js后加载的
    props.getIndexList();
  }, []);
  return <div>
  <h1>Hi {props.title} ! {count}</h1>
    <button onClick={() => setCount(count + 1)}>累加</button>
    <hr/>
    <ul>
      {
        props.list.map(item => {
          return <ul key={item.id}>{item.name}</ul>
        })
      }
    </ul>
  </div>
}

export default connect( 
  state => ({ list:state.index.list }),
  { getIndexList }
)(Index);