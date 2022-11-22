import { useCallback } from 'react';
import { createStore, applyMiddleware } from 'redux';
import {NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import Thunk from 'redux-thunk';
import Home from './page';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const store = createStore(reducer, {}, applyMiddleware(Thunk))

export default function App() {
  const [fontsLoaded] = useFonts({
    'Averta': require('./assets/fonts/AvertaDemo-Regular.otf'),
  });


  return (
      <Provider store={store}>
          <NavigationContainer>
              <Home/>
          </NavigationContainer>
      </Provider>   
  );
}
