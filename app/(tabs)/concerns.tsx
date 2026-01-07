
import Concerns from 'containers/concerns';
import { useNavigation, useRouter } from 'expo-router';
import React from 'react';


export default function ConcernsScreen() {
  const navigation = useNavigation();
  const route = useRouter();
  return (
    <>
      <Concerns navigation={navigation} route={route} />
    </>
  );
}