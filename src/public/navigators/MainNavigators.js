import React from 'react';
import {View, Text} from 'react-native';
import Product from '../../screens/product';
import Data from '../../screens/data';
import Record from '../../screens/record';
import Login from '../../screens/Login';
import Register from '../../screens/register';
import HomeScreen from '../../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createStackNavigator();
function MainNavigators() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="HomeScreens" component={HomeScreens} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreens() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" headerMode="none">
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="product" component={Product} />
      <Tab.Screen name="Data" component={Data} />
      <Tab.Screen name="Record" component={Record} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
    </Tab.Navigator>
  );
}

export default MainNavigators;
