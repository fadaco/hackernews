import { createStore, applyMiddleware } from 'redux';
import {NavigationContainer} from '@react-navigation/native'
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import Thunk from 'redux-thunk';
import Home from './page';

const store = createStore(reducer, {}, applyMiddleware(Thunk))


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Home/>
        </NavigationContainer>
    </Provider>
  );
}
