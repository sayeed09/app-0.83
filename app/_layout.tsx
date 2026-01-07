import { CartContextProvider } from '@context/cart/CartContext';
import AppProviders from '@context/index';
import { NotificationProvider } from '@context/notifications';
import crashlytics from '@react-native-firebase/crashlytics';
import HandleFatalError from 'components/error';
import { config } from 'components/toast/config';
import { CheckoutProvider } from "context/checkout";
import DeepLinkProvider from 'context/deeplink-provider';
import { ModalsProvider } from "context/modals";
import { ProductProvider } from 'context/product';
import { SearchProvider } from 'context/search';
import { ShopProvider } from "context/shop";
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar
} from 'react-native';
import Config from 'react-native-config';
import ReactMoE, { MoEInitConfig, MoEngageLogConfig, MoEngageLogLevel, MoEPushConfig } from 'react-native-moengage';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getUser } from 'services/auth';
const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [navigationRefReady, setNavigationRefReady] = useState(false);

  useEffect(() => {
    initializeMoe();
    if (!__DEV__)
      HandleFatalError.init();
    getUser().then(data => {
      if (data?.authToken) {
        crashlytics().setUserId(`User Contact Number : ${data?.phone}`);
      }
    });
    crashlytics().log('App mounted.')
  }, []);

  const initializeMoe = () => {
    const moeAppId = Config.MOE_APP_ID as string;
    if (moeAppId) {
      const moEInitConfig = new MoEInitConfig(
        MoEPushConfig.defaultConfig(),
        new MoEngageLogConfig(MoEngageLogLevel.DEBUG, true)
      );
      ReactMoE.initialize(moeAppId, moEInitConfig);
      if (Platform.OS == "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        ReactMoE.requestPushPermissionAndroid();
      } else {
        ReactMoE.registerForPush();
      }
    }
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ShopProvider>
          <CheckoutProvider>
            <ModalsProvider>
              <NotificationProvider>
                <QueryClientProvider client={queryClient}>
                  <AppProviders>
                    <SearchProvider>
                      <DeepLinkProvider navigationRefReady={navigationRefReady}>
                        {/* Deepling to be separated  */}
                        <CartContextProvider>
                          <StatusBar
                            barStyle="dark-content"
                            backgroundColor="white"
                            translucent
                          />
                          <ProductProvider>
                            <Stack>
                              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            </Stack>
                          </ProductProvider>

                          <Toast config={config} />
                        </CartContextProvider>
                      </DeepLinkProvider>
                    </SearchProvider>
                  </AppProviders>
                </QueryClientProvider>
              </NotificationProvider>
            </ModalsProvider>
          </CheckoutProvider>
        </ShopProvider>
      </SafeAreaView >

    </>

  );
}
