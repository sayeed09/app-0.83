import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import ReactMoE, { MoEInitConfig, MoEPushConfig, MoEngageLogConfig, MoEngageLogLevel } from 'react-native-moengage';
import { getUser } from './src/services/auth';
// import { createStackNavigator } from '@react-navigation/stack';
import crashlytics from '@react-native-firebase/crashlytics';
import HandleFatalError from 'components/error';
import { config } from 'components/toast/config';
import AppProviders from 'context';
import { CartContextProvider } from 'context/cart/CartContext';
import { CheckoutProvider } from 'context/checkout';
import DeepLinkProvider from 'context/deeplink-provider';
import { ModalsProvider } from 'context/modals';
import { NotificationProvider } from 'context/notifications';
import { SearchProvider } from 'context/search';
import { ShopProvider } from 'context/shop';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import StackNavigator from 'routes/stack';

// import HomeScreen from './src/screens/HomeScreen';
// import DetailsScreen from './src/screens/DetailsScreen';

// const Stack = createStackNavigator();
const backgroundStyle = {
    flex: 1
};
const queryClient = new QueryClient();


export default function App() {
    const [navigationRefReady, setNavigationRefReady] = useState(false);

    useEffect(() => {
        // SplashScreen.hide();
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
        const moeAppId = 'Z4JGV1DYJZ1TC2TYDLCBC93G';
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
        <SafeAreaView style={backgroundStyle}>
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
                                                <StackNavigator setNavigationRefReady={setNavigationRefReady} />

                                               
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

        </SafeAreaView>

        // <NavigationContainer>
        //   <Stack.Navigator screenOptions={{ headerShown: false }}>
        //     <Stack.Screen name="Home" component={HomeScreen} />
        //     <Stack.Screen name="Details" component={DetailsScreen} />
        //   </Stack.Navigator>
        // </NavigationContainer>
    );
}