
import Consult from 'containers/consult';
import { useNavigation } from 'expo-router';
import React from 'react';

export default function ConsultScreen() {

  const navigation = useNavigation();
  return (
    <>
      <Consult navigation={navigation} />
    </>

  );
}

