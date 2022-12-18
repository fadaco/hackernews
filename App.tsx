import { useState, useCallback, useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import {NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import Thunk from 'redux-thunk';
import Home from './page';
import 'expo-dev-menu';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const store = createStore(reducer, {}, applyMiddleware(Thunk))



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  let customFonts = {
    'Averta': require('./assets/fonts/AvertaDemo-Regular.otf'),
    'Averta Bold': require('./assets/fonts/averta-bold.otf')
  };

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
     setFontsLoaded(true);
  }

  useEffect(() => {
    _loadFontsAsync();
  }, [fontsLoaded])
  


  return (
      <Provider store={store}>
          <NavigationContainer>
             {fontsLoaded && <Home/>}
          </NavigationContainer>
      </Provider>   
  );
}
