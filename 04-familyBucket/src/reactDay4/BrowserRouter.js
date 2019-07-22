// BrowserRouter源码
// BrowserRouter核心作用：history(历史记录，页面跳转)初始化向下传递，location(监听url地址的变化)变更监听

import React, { Component } from 'react';
// histiry：对历史记录的简化
import { createBrowserHistory as createHistory } from 'history'; 

// 创建上下文，传递给后代
export const RouterContext = React.createContext();

export default class BrowerRouter extends Component {
  static computeRootMatch(pathname) {
    // 根路由下的match对象的一个封装
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);

    this.history = createHistory(this.props);

    // 历史记录的地址发生变化，重新render
    this.state = {
      location: this.history.location
    };

    this._isMounted = false;
    this._pendingLocation = null;

    this.unlisten = this.history.listen(location => {
      // 已挂载和未挂载的两种情况
      if(this._isMounted){
        this.setState({ location });
      }else{
        // 未挂载的时候设置标识符
        this._pendingLocation = location;
      }
    })
  }

  componentDidMount() {
    this._isMounted = true;

    if(this._pendingLocation){
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillMount() {
    if(this.unlisten)
      this.unlisten();
  }

  render() {
    return (
      // children 将 BrowerRouter 的属性传过去，如果没有则传入 null
      // value 传递给路由的三个参数，match history location
      <RouterContext.Provider
        children={this.props.children || null}
        value={{
          history: this.props.history,
          location: this.state.location,
          match: BrowerRouter.computeRootMatch(this.state.location.pathname);
        }}
      />
    )
  }
}