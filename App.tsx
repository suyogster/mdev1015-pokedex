/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/Registration';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { PokemonProvider } from './src/context/PokemonContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <PokemonProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Registration">
                    <Stack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Registration"
                        options={{ headerShown: false }}
                        component={RegistrationScreen}
                    />
                    <Stack.Screen
                        name="Onboard"
                        options={{ headerShown: false }}
                        component={OnboardingScreen}
                    />
                    <Stack.Screen
                        name="Home"
                        options={{ headerShown: false }}
                        component={HomeScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PokemonProvider>
    );
}
