import React from 'react'
import {Main} from './main'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './detailsScreen';
const Route = () => {
    const Stack = createNativeStackNavigator();


  return (
      <Stack.Navigator initialRouteName="test">
        <Stack.Screen name="test" component={Main} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  )
}

export default Route
