import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ title: 'Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
