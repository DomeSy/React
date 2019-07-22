// react-redux原理：简化在使用redux的过程

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './kkb-redux';

// connect原理 connect注入
// mapStateToProps = state => state  ：意思是默认值，什么都不处理
// 将状态和action映射到WrapComponent组件的属性上，所以当成属性
export const connect = (mapStateToProps = state => state,mapDispatchToProps = {}) => ( WrapComponent ) => {
  return class ConnectComponent extends React.Component{
    static contextType = {
      store: PropTypes.object
    }

    // context：上下文
    constructor(props, context){
      super(props, context);
      this.state = {
        props:{}
      }
    }

    componentDidMount(){
      const {store} = this.context;

      // 监听：有任何变化就会执行更新函数
      store.subscribe(() => this.update());
      this.update();
    }

    update(){
      const {store} = this.context;
      const stateProps = mapStateToProps(store.getState());
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);

      this.setState({
        props:{
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render(){
      // 然后返回给WrapComponent组件的值
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

// Provider 注入store实例，不需要手动去哪
export class Provider extends React.Component{
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext(){
    return {store: this.store}
  }

  constructor(props, context){
    super(props, context);
    // 将传过来的store赋值给this.store
    this.store = props.store;
  }

  // 渲染的时候返回给子代
  render(){
    return this.props.children;
  }
}