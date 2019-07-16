import React from 'react';
import HookReduxTest from './reactDay4/FruitReduxTest';
import store from './store';

// Provider：上下文
import  {Provider} from 'react-redux';

function App() {
  return (
    < Provider store={store}>
      <HookReduxTest/>
    </Provider>
 );
}

export default App;
