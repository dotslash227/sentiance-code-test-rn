import 'react-native-gesture-handler';
import React from 'react';
import Home from './src/screens/Home';
import Map from './src/screens/Map';
import {createStore, combineReducers} from 'redux';
import {locationReducer} from './src/reducers/locationReducer';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const rootReducer = combineReducers({
  locations:locationReducer
})

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>            
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Map" component={Map} />            
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>    
  );
};

export default App;
