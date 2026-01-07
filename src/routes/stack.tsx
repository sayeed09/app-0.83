// import React, { useEffect, useRef, useState } from "react";
// import { createStackNavigator } from '@react-navigation/stack';
// import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';

// import PurposeWebView from "containers/purpose";
// import { ProductProvider } from "context/product";
// import HeaderLeft from "components/styled/header/header-Left";
// import { useTheme } from '@shopify/restyle';
// import { Theme } from 'styles/theme';
// import { LogBox, Platform, Text, View } from "react-native";
// import BackIcon from "components/styled/header/back-icon";
// import ProductDetails from "containers/shop/product-details";
// import Cart from "containers/shop/cart";
// import ChatContainer from "containers/profile/chat";
// import OZivaBlog from "containers/blog";
// import AskAQuestion from "containers/shop/ask-a-question";
// import WriteAReview from "containers/shop/write-a-review";
// import CloseSvg from "assets/images/icons/standard-icons/close_icon";
// import ShopOffersContainer from "containers/shop/offers";
// import Addresses from "containers/profile/addresses";
// import AddAddress from "containers/shop/address/add-address";
// import AddressOrderSummary from "containers/shop/address/address-order-summary";
// import BackToShopIcon from "components/styled/header/back-to-shop";
// import OrderConfirmation from "containers/shop/order/order-confirmation";
// import PaymentMethod from "containers/shop/payment/payment-method";
// import { ProductImages } from "containers/shop/product-images";
// import { StyledButton } from "components/base/button/styled";
// import CLPCertificate from "containers/shop/clp-certificate";
// import Contact from "containers/profile/contact";
// import Support from "containers/profile/support";
// import Offers from "containers/profile/offers";
// import OrderDetails from "containers/profile/order-details";
// import Orders from "containers/profile/orders";
// import EditProfile from "containers/profile/edit-profile";
// import NotificationSettingsContainer from "containers/profile/notification-settings";
// import BannerDeepLinksView from "containers/home/banner-deeplinks-view";
// import OZivaCash from "containers/profile/oziva-cash";
// import OZivaPrime from "containers/profile/oziva-prime";
// import Search from "containers/search";
// import Collections from "containers/collections";
// import ProductAdvice from "containers/home/product-advice";
// import Notifications from "containers/notification";
// import HelpDesk from "containers/profile/help-desk";
// import Privacy from "containers/profile/privacy";
// import Refund from "containers/profile/refund";
// import Terms from "containers/profile/terms";
// import ToDo from "containers/todo";
// import HomeTabs from "./home-tabs";
// import { useAxiosInterceptor } from "services/axios";
// import OrderInProgress from "containers/shop/order/order-inprogress";
// import Consult from "containers/consult";
// import StepperHeader from "components/styled/header/stepper-header";
// import OfflineOverlay from "./no-internet";

// const Stack = createStackNavigator();

// export const navigationRef: React.RefObject<any> = React.createRef();
// export const MyTheme = {
//     ...DefaultTheme,
//     // colors: {
//     //   ...DefaultTheme.colors,
//     //   primary: '#2F6079',
//     //   background: '#ffffff',
//     // },
// };

// const linking: LinkingOptions<any> = {
//     prefixes: ['oziva://', 'https://oziva.in'],
//     config: {
//         screens: {
//             Home: {
//                 screens: {
//                     Profile: 'profile',
//                     Concerns: 'concerns/:collectionHandle?/:subCollectionHandle?',
//                     Categories: 'categories/:collectionHandle?',
//                     Consult: 'consult',
//                 },
//             },
//             NoMatch: '*',
//             CartScreen: 'cart-screen',
//             ProductDetails: 'product-details/:productId/:productTitle',
//             Orders: 'orders',
//             Collection: 'collections/:handle',
//             Search: 'search/:searchText',
//             HelpDesk: 'helpdesk',
//         },
//     },

// };

// const StackNavigator = (props: any) => {
//     LogBox.ignoreAllLogs();
//     useAxiosInterceptor();

//     const { colors } = useTheme<Theme>();
//     const routeNameRef = useRef<any | null>(null);

//     return <>
//         <NavigationContainer theme={MyTheme}
//             ref={navigationRef}
//             onReady={() => {
//                 props.setNavigationRefReady(true);
//                 routeNameRef.current = navigationRef.current.getCurrentRoute().name;
//             }}
//             linking={linking}
//             onStateChange={() => {
//                 const currentRouteName = navigationRef.current.getCurrentRoute().name;
//                 routeNameRef.current = currentRouteName;
//             }}>
//             <ProductProvider>
//                 <Stack.Navigator
//                     screenOptions={{
//                         headerTitle: '',
//                         headerBackTitleVisible: false,
//                         headerTintColor: colors.bodyText,
//                         headerMode: 'float'
//                     }}
//                     initialRouteName="Home"
//                 >
//                     <Stack.Screen
//                         name="Home"
//                         component={HomeTabs}
//                         options={() => ({
//                             headerShown: false,
//                         })}
//                     />
//                     <Stack.Screen
//                         name="ProductDetails"
//                         component={ProductDetails}
//                         options={({ navigation, route }: any) => ({
//                             title: route?.params?.productTitle,
//                             headerLeft: () => <BackIcon navigation={navigation} />,
//                         })}
//                     />
//                     <Stack.Screen
//                         name="CartScreen"
//                         component={Cart}
//                         options={({ navigation }) => ({
//                             title: 'Cart',
//                             headerLeft: () => (
//                                 <StepperHeader navigation={navigation} />
//                             ),
//                             headerStyle: {
//                                 shadowColor: '#FFF',
//                             }

//                         })}
//                     />
//                     <Stack.Screen
//                         name="Consult"
//                         component={Consult}
//                         options={({ navigation }) => ({
//                             title: 'Diet',
//                             headerLeft: () => (
//                                 <BackIcon onPress={() => navigation.goBack()} navigation={navigation} title="Chat" />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Chat"
//                         component={ChatContainer}
//                         options={({ navigation }) => ({
//                             headerLeft: () => (
//                                 <HeaderLeft navigation={navigation} />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="WriteAReview"
//                         component={WriteAReview}
//                         options={({ navigation }) => {
//                             const defaultOptions = {
//                                 title: 'Write A Review',
//                                 headerRight: () => { },
//                                 headerLeft: () => (
//                                     <BackIcon navigation={navigation} />
//                                 ),
//                             };
//                             return { ...defaultOptions };
//                         }}
//                     />

//                     <Stack.Screen
//                         name="OZivaBlog"
//                         component={OZivaBlog}
//                         options={({ navigation }) => {
//                             const defaultOptions = {
//                                 title: 'Blog',
//                                 headerRight: () => { },
//                                 headerLeft: () => (
//                                     <BackIcon navigation={navigation} />
//                                 ),
//                             };
//                             return { ...defaultOptions };
//                         }}
//                     />
//                     <Stack.Screen
//                         name="AskAQuestion"
//                         component={AskAQuestion}
//                         options={({ navigation }) => {
//                             const defaultOptions = {
//                                 title: 'Ask A Question',
//                                 headerLeft: () => (
//                                     <BackIcon navigation={navigation} />
//                                 ),
//                                 headerRight: () => { },
//                             };
//                             return { ...defaultOptions };
//                         }}
//                     />
//                     <Stack.Screen
//                         name="ShopOffersScreen"
//                         component={ShopOffersContainer}
//                         options={({ navigation }) => ({
//                             title: 'OZiva Cash and Offers',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="OZiva Cash and Offers"
//                                     icon={<CloseSvg />}
//                                 />
//                             ),
//                             headerRight: () => { },
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Addresses"
//                         component={Addresses}
//                         options={({ navigation }) => ({
//                             title: 'My Address',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="My Addresses"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="AddAddressScreen"
//                         component={AddAddress}
//                         options={({ navigation }) => ({
//                             title: 'Add Address bhai',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="Add Address"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="AddressOrderSummaryScreen"
//                         component={AddressOrderSummary}
//                         options={({ navigation }) => ({
//                             title: 'Add Address',
//                             headerLeft: () => (
//                                 <StepperHeader navigation={navigation} />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="OrderConfirmationScreen"
//                         component={OrderConfirmation}
//                         options={({ navigation }) => ({
//                             gestureEnabled: Platform.OS === 'android',
//                             title: 'Confirmation',
//                             headerLeft: () => (
//                                 <BackToShopIcon
//                                     navigation={navigation}
//                                     title="Confirmation"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="OrderInProgressScreen"
//                         component={OrderInProgress}
//                         options={{ headerShown: false }}
//                     />
//                     <Stack.Screen
//                         name="PaymentMethodScreen"
//                         component={PaymentMethod}
//                         options={({ navigation }) => ({
//                             title: 'Payment',
//                             headerLeft: () => (
//                                 <StepperHeader navigation={navigation} />
//                             ),
//                             headerStyle: {
//                                 borderBottomColor: '#FFF'
//                             }
//                         })}
//                     />
//                     <Stack.Screen
//                         name="ProductImages"
//                         component={ProductImages}
//                         options={({ navigation }) => ({
//                             title: '',
//                             tabBarVisible: false,
//                             headerLeft: () => (
//                                 <StyledButton onPress={() => navigation.pop()}>
//                                     <View style={{ marginLeft: 10 }}>
//                                         <CloseSvg />
//                                     </View>
//                                 </StyledButton>
//                             ),
//                             headerRight: () => { },
//                         })}
//                     />
//                     <Stack.Screen
//                         name="CLPCertificate"
//                         component={CLPCertificate}
//                         options={({ navigation }) => ({
//                             title: '',
//                             tabBarVisible: false,
//                             headerStyle: { backgroundColor: '#000' },
//                             headerLeft: () => (
//                                 <View style={{ marginLeft: 10 }}>
//                                     <StyledButton onPress={() => navigation.pop()}>
//                                         <CloseSvg />
//                                     </StyledButton>
//                                 </View>
//                             ),
//                             headerRight: () => { },
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Support"
//                         component={Support}
//                         options={({ navigation }) => ({
//                             title: 'Customer Service',
//                             headerLeft: () => (
//                                 <BackIcon navigation={navigation} title="Support" />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Contact"
//                         component={Contact}
//                         options={{ title: 'Contact Us' }}
//                     />
//                     <Stack.Screen
//                         name="Orders"
//                         component={Orders}
//                         options={({ navigation }) => ({
//                             title: 'Orders',
//                             headerLeft: () => (
//                                 <BackIcon navigation={navigation} title="Orders" />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="OrderDetails"
//                         component={OrderDetails}
//                         options={{ title: 'Order Details' }}
//                     />
//                     <Stack.Screen
//                         name="Offers"
//                         component={Offers}
//                         options={({ navigation }) => ({
//                             title: 'Offers',
//                             headerLeft: () => (
//                                 <BackIcon navigation={navigation} title="Offers" />
//                             ),
//                             headerRight: () => { },
//                         })}
//                     />
//                     <Stack.Screen
//                         name="NotificationSettings"
//                         component={NotificationSettingsContainer}
//                         options={({ navigation }) => ({
//                             title: 'Notification Settings',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="Notification Settings"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="EditProfile"
//                         component={EditProfile}
//                         options={({ navigation }) => ({
//                             title: 'Edit Profile',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="Edit Profile"
//                                     style={{ fontSize: 20 }}
//                                 />
//                             ),
//                             headerBackTitleStyle: {
//                                 fontSize: 20,
//                                 fontFamily: 'Georgia',
//                             },
//                         })}
//                     />
//                     <Stack.Screen
//                         name="OZivaCash"
//                         component={OZivaCash}
//                         options={({ navigation }) => ({
//                             title: 'OZiva Cash',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="OZiva Cash"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="OZivaPrime"
//                         component={OZivaPrime}
//                         options={({ navigation }) => ({
//                             title: 'OZiva Prime',
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="OZiva Prime"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Search"
//                         component={Search}
//                         options={() => ({
//                             title: '',
//                         })}
//                     />


//                     <Stack.Screen
//                         name="BannerDeepLinksView"
//                         component={BannerDeepLinksView}
//                         options={({ route }) => ({
//                             title: route?.params?.title,
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Privacy"
//                         component={Privacy}
//                         options={{ title: 'Privacy Policy' }}
//                     />
//                     <Stack.Screen
//                         name="Terms"
//                         component={Terms}
//                         options={{ title: 'Terms & Conditions' }}
//                     />
//                     <Stack.Screen
//                         name="Refund"
//                         component={Refund}
//                         options={{ title: 'Refund Policy' }}
//                     />
//                     <Stack.Screen
//                         name="HelpDesk"
//                         component={HelpDesk}
//                         options={{ title: 'HelpDesk' }}
//                     />
//                     {/* TODO: need to check if this being used anywhere */}
//                     <Stack.Screen
//                         name="ToDo"
//                         component={ToDo}
//                         options={{ title: '' }}
//                     />
//                     <Stack.Screen
//                         name="Notifications"
//                         component={Notifications}
//                         options={() => ({
//                             title: 'Notifications',
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Purpose"
//                         component={PurposeWebView}
//                         options={() => ({
//                             title: '',
//                         })}
//                     />
//                     <Stack.Screen
//                         name="ProductAdvice"
//                         component={ProductAdvice}
//                         options={({ navigation }) => ({
//                             headerLeft: () => (
//                                 <BackIcon
//                                     navigation={navigation}
//                                     title="Product Advice"
//                                 />
//                             ),
//                         })}
//                     />
//                     <Stack.Screen
//                         name="Collection"
//                         component={Collections}
//                         options={({ navigation }) => ({
//                             headerLeft: () => (
//                                 <BackIcon navigation={navigation} title="" />
//                             ),
//                         })}
//                     />
//                 </Stack.Navigator>
//             </ProductProvider>
//             {Platform.OS === 'android' ? <OfflineOverlay navigationRef={navigationRef} /> : null}
//         </NavigationContainer>

//     </>
// };
// export default StackNavigator;