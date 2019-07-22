// Route原理
// Route: 路由配置，匹配检测，内容渲染

import React, { Component } from 'react';
import { RouterContext } from './BrowserRouter';
import matchPath from './matchPath';

export default class Route extends Component {
  render(){
    return(
      <RouterContext.Consumer>
        {
          // context：是BrowserRouter传递的三个参数：match location history
          context => {
            const location = this.props.location || context.location;
            // computedMatch在Switch下才会有,  如果patch存在，则会匹配，否则是上级的path
            const match = this.props.computedMatch ? this.props.computedMatch : this.props.path ? matchPath(location.pathname, this.props) : context.match;
            const props = { ...context, location, match };

            // 三个参数的函数 component：组件,render:条件，参数动态的渲染，children：匹配不匹配都会匹配，并且不能同时制定
            let { children, component, render } = this.props;

            // 若未传递children属性，则默认为null
            if(Array.isArray(children) && children.length === 0){
              children = null;
            }

            if(typeof children === 'function'){
              // 最终的渲染
              children = children(props);
            }

            return (
              <RouterContext.Provider value={props}>
                {
                  // 先渲染children在渲染，在看match是否匹配，如果匹配渲染component,然后判断component是否存在，存在则渲染出来，否则返回为空，最后在执行render
                  // 所以在render还是component下的组件可以拿到props(即history,match,location)
                  children && React.Children.count(children) > 0 ? children : props.match ? component ? React.createElement(component, props) : render ? render(props) : null : null
                }
              </RouterContext.Provider>
            );
          }
        }
      </RouterContext.Consumer>
    )
  }
}