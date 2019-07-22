import React from 'react';
// import HookReduxTest from './reactDay4/FruitReduxTest';
import store from './store';

// Provider：上下文
import  {Provider} from 'react-redux';
import FruitSagaTset from './reactDay4/FruitSagaTset';

function App() {
  return (
    < Provider store={store}>
      {/* Redux */}
      {/* <HookReduxTest/> */}

      {/* redux-saga */}
      <FruitSagaTset/>
    </Provider>
 );
}

export default App;
