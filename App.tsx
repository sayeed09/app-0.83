import React from 'react';
import { Text, View } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from './src/screens/HomeScreen';
// import DetailsScreen from './src/screens/DetailsScreen';

// const Stack = createStackNavigator();

export default function App() {
    return (
        <View>
            <Text>Hello</Text>
        </View>
        // <NavigationContainer>
        //   <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     <Stack.Screen name="Home" component={HomeScreen} />
        //     <Stack.Screen name="Details" component={DetailsScreen} />
        //   </Stack.Navigator>
        // </NavigationContainer>
    );
}