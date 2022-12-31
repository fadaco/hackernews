import { useState, useCallback, useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import {NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux';
import { StripeProvider } from "@stripe/stripe-react-native";
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
      <StripeProvider publishableKey="pk_test_51MIcL0LjQXh9ZYRptYohMsf9d4CzOpR8vE04FB0mk1FSvLJ8ow2nMNPr5hxYkMvXmKTfkPeoDetschIDMZME7eqa006e6dNYUQ">
          <NavigationContainer>
             {fontsLoaded && <Home/>}
        </NavigationContainer>
        </StripeProvider>
      </Provider>   
  );
}
