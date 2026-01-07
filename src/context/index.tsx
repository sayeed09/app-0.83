/* eslint-disable eqeqeq */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context/src/SafeAreaContext';
import { ThemeProvider } from '@shopify/restyle';
import theme from 'styles/theme';


import { AuthProvider } from './auth';

type Props = {
  children: React.ReactNode;
};

const AppProviders: React.FunctionComponent<Props> = ({ children }) => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default AppProviders;
