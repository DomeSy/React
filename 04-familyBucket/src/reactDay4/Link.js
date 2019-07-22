// Link 原理
// Link：跳转链接，处理点击的事件,历史记录的跳转,对a标签的包装

import React from 'react';
import { RouterContext } from './BrowserRouter';
import { createLocation } from 'history';

class Link extends React.Component{
  handleClick(event, history){
    event.preventDefault();
    history.push(this.props.to);
  }

  render(){
    const { to, ...rest } = this.props;

    return (
      <RouterContext.Consumer>
        {
          context => {
            // 可以是字符串
            const location = typeof to === "string" ? createLocation(to, null, null, context.location) : to;
            // 上下文的location
            const href = location ? context.history.createHref(location) : '';

            return (
              <a
                {...rest}
                onClick={event => this.handleClick(event, context.history)}
                href={href}
              >
                {this.props.children}
              </a>
            );
          }
        }
      </RouterContext.Consumer>
    )
  }
}

export default Link;