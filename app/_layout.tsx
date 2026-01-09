import { CartContextProvider } from '@context/cart/CartContext';
import AppProviders from '@context/index';
import { NotificationProvider } from '@context/notifications';
import crashlytics from '@react-native-firebase/crashlytics';
import CloseSvg from 'assets/images/icons/standard-icons/close_icon';
import { StyledButton } from 'components/base/button/styled';
import HandleFatalError from 'components/error';
import BackIcon from 'components/styled/header/back-icon';
import BackToShopIcon from 'components/styled/header/back-to-shop';
import HeaderRight from 'components/styled/header/header-right';
import StepperHeader from 'components/styled/header/stepper-header';
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
  StatusBar,
  View
} from 'react-native';
import Config from 'react-native-config';
import ReactMoE, { MoEInitConfig, MoEngageLogConfig, MoEngageLogLevel, MoEPushConfig } from 'react-native-moengage';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getUser } from 'services/auth';
import { useAxiosInterceptor } from 'services/axios';
const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  useAxiosInterceptor();

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
      <View style={{ flex: 1 }}>
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
                            translucent={Platform.OS === 'android'}
                          />
                          <ProductProvider>
                            <Stack >
                              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                              <Stack.Screen
                                name="ProductDetails"
                                options={({ navigation, route }: any) => ({
                                  title: '',
                                  headerLeft: () => <BackIcon navigation={navigation} />,
                                  headerRight: () => <HeaderRight navigation={navigation} hideIcons />
                                })}
                              />
                              <Stack.Screen
                                name="CartScreen"
                                options={({ navigation }) => ({
                                  title: 'Cart',
                                  headerLeft: () => (
                                    <StepperHeader navigation={navigation} />
                                  ),
                                  headerStyle: {
                                    // shadowColor: '#FFF',
                                  }

                                })}
                              />
                              <Stack.Screen
                                name="Addresses"
                                options={({ navigation }) => ({
                                  title: 'My Address',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="My Addresses"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="AddAddressScreen"
                                options={({ navigation }) => ({
                                  title: 'Add Address bhai',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="Add Address"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="AddressOrderSummaryScreen"
                                options={({ navigation }) => ({
                                  title: 'Add Address',
                                  headerLeft: () => (
                                    <StepperHeader navigation={navigation} />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="OrderConfirmationScreen"
                                options={({ navigation }) => ({
                                  gestureEnabled: Platform.OS === 'android',
                                  title: 'Confirmation',
                                  headerLeft: () => (
                                    <BackToShopIcon
                                      navigation={navigation}
                                      title="Confirmation"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="PaymentMethodScreen"
                                options={({ navigation }) => ({
                                  title: 'Payment',
                                  headerLeft: () => (
                                    <StepperHeader navigation={navigation} />
                                  ),
                                  headerStyle: {
                                    // borderBottomColor: '#FFF'
                                  }
                                })}
                              />
                              <Stack.Screen
                                name="WriteAReview"
                                options={({ navigation }) => {
                                  const defaultOptions = {
                                    title: 'Write A Review',
                                    headerLeft: () => (
                                      <BackIcon navigation={navigation} />
                                    ),
                                  };
                                  return { ...defaultOptions };
                                }}
                              />

                              <Stack.Screen
                                name="OZivaBlog"
                                options={({ navigation }) => {
                                  const defaultOptions = {
                                    title: 'Blog',
                                    headerLeft: () => (
                                      <BackIcon navigation={navigation} />
                                    ),
                                  };
                                  return { ...defaultOptions };
                                }}
                              />
                              <Stack.Screen
                                name="AskAQuestion"
                                options={({ navigation }) => {
                                  const defaultOptions = {
                                    title: 'Ask A Question',
                                    headerLeft: () => (
                                      <BackIcon navigation={navigation} />
                                    ),
                                  };
                                  return { ...defaultOptions };
                                }}
                              />
                              <Stack.Screen
                                name="ShopOffersScreen"
                                options={({ navigation }) => ({
                                  title: 'OZiva Cash and Offers',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="OZiva Cash and Offers"
                                      icon={<CloseSvg />}
                                    />
                                  ),
                                })}
                              />

                              <Stack.Screen
                                name="OrderInProgressScreen"
                                options={{ headerShown: false }}
                              />

                              <Stack.Screen
                                name="ProductImages"
                                options={({ navigation }) => ({
                                  title: '',
                                  tabBarVisible: false,
                                  headerLeft: () => (
                                    <StyledButton onPress={() => navigation.pop()}>
                                      <View style={{ marginLeft: 10 }}>
                                        <CloseSvg />
                                      </View>
                                    </StyledButton>
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="CLPCertificate"
                                options={({ navigation }) => ({
                                  title: '',
                                  tabBarVisible: false,
                                  headerStyle: { backgroundColor: '#000' },
                                  headerLeft: () => (
                                    <View style={{ marginLeft: 10 }}>
                                      <StyledButton onPress={() => navigation.pop()}>
                                        <CloseSvg />
                                      </StyledButton>
                                    </View>
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="Support"
                                options={({ navigation }) => ({
                                  title: 'Customer Service',
                                  headerLeft: () => (
                                    <BackIcon navigation={navigation} title="Support" />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="Contact"
                                options={{ title: 'Contact Us' }}
                              />
                              <Stack.Screen
                                name="Orders"
                                options={({ navigation }) => ({
                                  title: 'Orders',
                                  headerLeft: () => (
                                    <BackIcon navigation={navigation} title="Orders" />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="OrderDetails"
                                options={{ title: 'Order Details' }}
                              />
                              <Stack.Screen
                                name="Offers"
                                options={({ navigation }) => ({
                                  title: 'Offers',
                                  headerLeft: () => (
                                    <BackIcon navigation={navigation} title="Offers" />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="NotificationSettings"
                                options={({ navigation }) => ({
                                  title: 'Notification Settings',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="Notification Settings"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="EditProfile"
                                options={({ navigation }) => ({
                                  title: 'Edit Profile',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="Edit Profile"
                                      style={{ fontSize: 20 }}
                                    />
                                  ),
                                  headerBackTitleStyle: {
                                    fontSize: 20,
                                    fontFamily: 'Georgia',
                                  },
                                })}
                              />
                              <Stack.Screen
                                name="OZivaCash"
                                options={({ navigation }) => ({
                                  title: 'OZiva Cash',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="OZiva Cash"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="OZivaPrime"
                                options={({ navigation }) => ({
                                  title: 'OZiva Prime',
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="OZiva Prime"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="Search"
                                options={() => ({
                                  title: '',
                                })}
                              />


                              <Stack.Screen
                                name="BannerDeepLinksView"
                                options={({ route }) => ({
                                  title: route?.params?.title,
                                })}
                              />
                              <Stack.Screen
                                name="Privacy"
                                options={{ title: 'Privacy Policy' }}
                              />
                              <Stack.Screen
                                name="Terms"
                                options={{ title: 'Terms & Conditions' }}
                              />
                              <Stack.Screen
                                name="Refund"
                                options={{ title: 'Refund Policy' }}
                              />
                              <Stack.Screen
                                name="HelpDesk"
                                options={{ title: 'HelpDesk' }}
                              />
                              {/* TODO: need to check if this being used anywhere */}
                              <Stack.Screen
                                name="ToDo"
                                options={{ title: '' }}
                              />
                              <Stack.Screen
                                name="Notifications"
                                options={() => ({
                                  title: 'Notifications',
                                })}
                              />
                              <Stack.Screen
                                name="Purpose"
                                options={() => ({
                                  title: '',
                                })}
                              />
                              <Stack.Screen
                                name="ProductAdvice"
                                options={({ navigation }) => ({
                                  headerLeft: () => (
                                    <BackIcon
                                      navigation={navigation}
                                      title="Product Advice"
                                    />
                                  ),
                                })}
                              />
                              <Stack.Screen
                                name="Collection"
                                options={({ navigation }) => ({
                                  headerLeft: () => (
                                    <BackIcon navigation={navigation} title="" />
                                  ),
                                })}
                              />
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
      </View >

    </>

  );
}
