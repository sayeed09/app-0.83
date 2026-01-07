import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from "containers/home";
import Categories from "containers/categories";
import HomeFilledIcon from "assets/images/icons/bottom-navigation/filled/home";
import HomeLineIconComponent from "assets/images/icons/bottom-navigation/lined/home";
import { trackMoEngageAppEvent } from "utils/common";
import BagFilledIconComponent from "assets/images/icons/bottom-navigation/filled/bag";
import CategoriesFilledIconComponent from "assets/images/icons/bottom-navigation/filled/categories";
import ConsultFilledIcon from "assets/images/icons/bottom-navigation/filled/consult";
import BagLineIconComponent from "assets/images/icons/bottom-navigation/lined/bag";
import CategoriesLineIconComponent from "assets/images/icons/bottom-navigation/lined/categories";
import ConsultLineIcon from "assets/images/icons/bottom-navigation/lined/consult";
import Consult from "containers/consult";
import { useModalsDispatch } from "context/modals";
import { useNotificationState } from "context/notifications";
import { LogBox, SafeAreaView } from "react-native";
import {
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import Concerns from "containers/concerns";
import HeaderLeft from "components/styled/header/header-Left";
import HeaderRight from "components/styled/header/header-right";
import BackIcon from "components/styled/header/back-icon";
import ProfileContainer from "containers/profile";
import ProfileIconLined from "assets/images/icons/bottom-navigation/lined/profile-user";
import ProfileIconFilled from "assets/images/icons/bottom-navigation/filled/profile-user";
import NetInfo from '@react-native-community/netinfo';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);
    const { trackingTransparency } = useNotificationState();
    const modalsDispatch = useModalsDispatch();
    /** Please uncomment the following line after the demo * */
    LogBox.ignoreAllLogs();

    const networkInformation = async () => {
        const unsub = NetInfo.addEventListener(state => {
            if (state && state.isInternetReachable && state.isConnected) {
                setIsNetworkAvailable(true);
            } else {
                setIsNetworkAvailable(false);
            }
        });
        return unsub;
    }
    useEffect(() => {
        networkInformation();
    }, []);

    function ProfileWrapper(props: any) {
        return <ProfileContainer {...props} isNetworkAvailable={isNetworkAvailable} />
    }

    /** the above should be commented when not demoing * */

    return <>
        <SafeAreaProvider>

            <Tab.Navigator
                detachInactiveScreens
            >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomePage}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ focused }) =>
                            focused ? <HomeFilledIcon /> : <HomeLineIconComponent />,
                        headerShown: true,
                        title: 'Home',
                        headerTitle: '',
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur: true,
                        headerLeft: () => (
                            <HeaderLeft navigation={navigation} />
                        ),
                        headerRight: () => (
                            <HeaderRight navigation={navigation} />
                        )
                    })}
                    listeners={{
                        tabPress: e => {
                            trackMoEngageAppEvent({
                                event: `home_icon_clicked_app`,
                                values: [],
                            });
                        },
                    }}

                />
                <Tab.Screen
                    name="Concerns"
                    component={Concerns}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ focused }) =>
                            focused ? <BagFilledIconComponent /> : <BagLineIconComponent />,
                        headerShown: true,
                        title: 'Concerns',
                        headerTitle: '',
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur: true,
                        headerLeft: () => (
                            <HeaderLeft navigation={navigation} />
                        ),
                        headerRight: () => (
                            <HeaderRight navigation={navigation} />
                        ),
                    })}
                    listeners={{
                        tabPress: e => {
                            trackMoEngageAppEvent({
                                event: `concern_icon_clicked_app`,
                                values: [],
                            });
                        },
                    }}
                />
                <Tab.Screen
                    name="Categories"
                    component={Categories}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <CategoriesFilledIconComponent />
                            ) : (
                                <CategoriesLineIconComponent />
                            ),
                        headerShown: true,
                        title: 'Categories',
                        headerTitle: '',
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur: true,
                        headerLeft: () => (
                            <HeaderLeft navigation={navigation} />
                        ),
                        headerRight: () => (
                            <HeaderRight navigation={navigation} />
                        ),
                    })}
                    listeners={{
                        tabPress: e => {
                            trackMoEngageAppEvent({
                                event: `categories_icon_clicked_app`,
                                values: [],
                            });
                        },
                    }}
                />
                <Tab.Screen
                    name="Consult"
                    component={Consult}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <ConsultFilledIcon />
                            ) : (
                                <ConsultLineIcon />
                            ),
                        headerShown: true,
                        headerTitle: '',
                        title: 'Diet',
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur: true,
                        headerLeft: () => (
                            <BackIcon onPress={() => navigation.navigate('HomeScreen')} navigation={navigation} title="Chat" />
                        ),

                    })}
                    listeners={{
                        tabPress: e => {
                            trackMoEngageAppEvent({
                                event: `consult_icon_clicked_app`,
                                values: [],
                                trackingTransparency,
                            });
                        },
                    }}

                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileWrapper}
                    options={({ navigation }) => ({
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <ProfileIconFilled />
                            ) : (
                                <ProfileIconLined />
                            ),
                        headerShown: true,
                        headerTitle: '',
                        title: 'Profile',
                        tabBarActiveTintColor: 'green',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur: true,
                        headerLeft: () => (
                            <BackIcon onPress={() => navigation.navigate('HomeScreen')} navigation={navigation} title="Profile" />
                        ),

                    })}
                    listeners={{
                        tabPress: e => {
                            trackMoEngageAppEvent({
                                event: `profile_icon_clicked_app`,
                                values: [],
                                trackingTransparency,
                            });
                        },
                    }}

                />
            </Tab.Navigator>
        </SafeAreaProvider >

    </>
}
export default HomeTabs;