import React, { Component } from 'react'

// 创建上下文
// 这里的Context必须大写
const Context = React.createContext();
const store = {
  token:'domesy'
}

export default class ContextTest extends Component {
  render() {
    return (
      <Context.Provider value={store}>
        <div>
          <Context.Consumer>
            {
              store => <p>{store.token}</p>
            }
          </Context.Consumer>
        </div>
      </Context.Provider>
    )
  }
}
