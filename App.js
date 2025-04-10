import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notificacao from 'expo-notifications';
import HomeScreen from './screens/Home.js';
import AboutScreen from './screens/aboutScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: "#0987EE" },
          headerTintColor: "#fff",
        })}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sobre" component={AboutScreen} />
        {/* <Stack.Screen name="AddTask" component={CadastroScreen} />
        <Stack.Screen name="EditTask" component={PerfilScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
