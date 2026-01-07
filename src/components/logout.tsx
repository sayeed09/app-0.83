import React from 'react';
import { Button } from 'react-native';
import ReactMoE from 'react-native-moengage';

import { useAuth } from '@context/auth';

const Logout = ({ navigation }) => {
  const { logout } = useAuth();

  const doLogout = async () => {
    await logout();
    ReactMoE.logout();
    navigation.reset({
      index: 1,
      routes: [{ name: 'Login' }],
    });
  };

  return <Button onPress={() => doLogout()} title="Logout" />;
};

export default Logout;
