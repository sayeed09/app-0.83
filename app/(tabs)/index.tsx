
import React from 'react';
// import Razorpay from 'react-native-customui';
import HomePage from "containers/home";
import { useNavigation } from 'expo-router';


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <>
      <HomePage navigation={navigation} />
    </>

  );
}
