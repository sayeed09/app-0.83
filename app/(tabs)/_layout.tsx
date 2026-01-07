import BagFilledIconComponent from 'assets/images/icons/bottom-navigation/filled/bag';
import CategoriesFilledIconComponent from 'assets/images/icons/bottom-navigation/filled/categories';
import ConsultFilledIcon from 'assets/images/icons/bottom-navigation/filled/consult';
import HomeFilledIcon from 'assets/images/icons/bottom-navigation/filled/home';
import ProfileIconFilled from 'assets/images/icons/bottom-navigation/filled/profile-user';
import BagLineIconComponent from 'assets/images/icons/bottom-navigation/lined/bag';
import CategoriesLineIconComponent from 'assets/images/icons/bottom-navigation/lined/categories';
import ConsultLineIcon from 'assets/images/icons/bottom-navigation/lined/consult';
import HomeLineIconComponent from 'assets/images/icons/bottom-navigation/lined/home';
import ProfileIconLined from 'assets/images/icons/bottom-navigation/lined/profile-user';
import BackIcon from 'components/styled/header/back-icon';
import HeaderLeft from 'components/styled/header/header-Left';
import HeaderRight from 'components/styled/header/header-right';
import { Tabs } from 'expo-router';
import React from 'react';
import { trackMoEngageAppEvent } from 'utils/common';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
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
      <Tabs.Screen
        name="concerns"
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
      <Tabs.Screen
        name="categories"
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
      <Tabs.Screen
        name="consult"
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

            });
          },
        }}

      />
      <Tabs.Screen
        name="profile"
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
            });
          },
        }}

      />
    </Tabs>

  );
}
