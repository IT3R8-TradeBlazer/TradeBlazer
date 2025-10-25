import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();

export default function App({}) {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Dash" component={Dashboard}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


