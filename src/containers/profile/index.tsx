import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@shopify/restyle';
import { setAuthenticated, setUser as setUserState } from 'actions/auth';
import { setDiscountCode } from 'actions/checkout';
import { useCheckoutDispatch } from 'context/checkout';
import { useNotificationState } from 'context/notifications';
import { ChatWootUser } from 'models/prime';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import ReactMoE from 'react-native-moengage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  APP_VERSION,
  chatWootBaseURL,
  chatWootWebsiteToken,
  width,
} from 'utils/constants';

import {
  loginSuccessful,
  setChatWootModal,
  setLoginModal,
} from '@actions/modals';
import {
  Box,
  Hr,
  SafeBottomSpace,
  Text,
} from '@components/base/foundation';
import DetailsLinkItem from '@components/elements/lists/details-link-item';
import ListItem from '@components/elements/lists/item';
import Loader from '@components/elements/loader/loader';
import { useAuthDispatch, useAuthState } from '@context/auth';
import { useModalsDispatch, useModalsState } from '@context/modals';
import crashlytics from '@react-native-firebase/crashlytics';
import { Theme } from '@styles/theme';
import { trackMoEngageAppEvent } from '@utils/common';
import BlogLineIconComponent from 'assets/images/icons/bottom-navigation/lined/blog';
import ProfileIconLined from "assets/images/icons/bottom-navigation/lined/profile-user";
import ChatWithExpertIcon from 'assets/images/icons/profile-icon/chat-with-exper-icon';
import OffersIcon from 'assets/images/icons/profile-icon/offers-icon';
import OzivaCashIcon from 'assets/images/icons/profile-icon/oziva-cash-logo';
import TrackOrderIcon from 'assets/images/icons/profile-icon/track-order-icon';
import ChatlineAccessRestriction from 'components/chatwoot/chatline-access-restriction';
import LoginModal from 'components/login/fullscreen/login-modal';
import useLogin from 'hooks/login';
import { UserProfileResponseModel } from 'models/auth';
import { ICustomAttributes } from 'models/chatwoot';
import Config from 'react-native-config';
import { getUserProfileDataService, userAuthCheckService } from 'services/user';
import { commonStyles } from 'styles/common';

const ProfileContainer = ({
  navigation,
  isNetworkAvailable
}: {
  navigation: any;
  isNetworkAvailable: boolean;
}) => {
  const modalsDispatch = useModalsDispatch();
  const authDispatch = useAuthDispatch();
  const checkoutDispatch = useCheckoutDispatch();
  const [userCustomAttributes, setUserCustomAttributes] =
    useState<ICustomAttributes>({
      identifier_hash: '',
      user_phone_no: '',
      initiated_from: '',
      chatting_from: '',
    });
  const [userData, setUserData] = useState<UserProfileResponseModel>();
  const [loading, setLoading] = useState(false);
  const [authCheckLoading, setAuthCheckLoading] = useState(false);
  const [loggedInRequired, setLoggedInRequired] = useState(false);

  const { user: authUser } = useAuthState();
  const { trackingTransparency } = useNotificationState();
  const { handleLogout } = useLogin();

  const { isLoginSuccessful, chatWootModalVisibility, showLoginSuccess } =
    useModalsState();

  const fetchUserProfile = () => {
    setLoading(true);
    getUserProfileDataService()
      .then((data: UserProfileResponseModel) => {
        setUserData(data);
        userAuthCheck();
        setUserDetails(data);
        if (data?.userDetails?.customerId)
          ReactMoE.identifyUser(data?.userDetails?.customerId);
        setLoading(false);
        setLoggedInRequired(false);
      }).catch(error => {
        setLoading(false);
        setLoggedInRequired(true);
        if (error?.response?.status === 401) {
          handleLogout();
        }
      })
  }

  const userAuthCheck = () => {
    setAuthCheckLoading(true);
    const payload = {
      phone: authUser?.phone,
      productID: null,
      orderID: null,
      hash: authUser?.authToken,
    };
    userAuthCheckService(payload).then(response => {
      setAuthCheckLoading(false);
    }).catch(err => {
      console.log("Error : ", err);
      setAuthCheckLoading(false);
    })
  }

  const [primeUserDetails, setPrimeUserDetails] = useState<ChatWootUser>({
    avatar_url: '',
    email: '',
    identifier: '',
    identityHash: '',
    phone: '',
  });

  useEffect(() => {
    crashlytics().log(`On the profile screen`);
    const unsubscribe = navigation.addListener('focus', () => {
      if (!authUser?.phone && !isLoginSuccessful) {
        setLoggedInRequired(true);
      } else if (authUser?.phone) {
        fetchUserProfile();
        modalsDispatch(setLoginModal(false));
      } else {
        setLoggedInRequired(false);
        modalsDispatch(setLoginModal(true));
      }
    });

    return unsubscribe;
  }, [navigation, authUser]);


  useEffect(() => {
    if (isLoginSuccessful) {
      fetchUserProfile();
    }
    if (isLoginSuccessful && !userData) {
      fetchUserProfile();
    }
  }, [isLoginSuccessful]);
  useEffect(() => {
    if (isLoginSuccessful) {
      if (showLoginSuccess) {
        setTimeout(
          () =>
            // TODO:// Pick this options from setting it to constants in utils
            Toast.show({
              text1: 'Login Successful',
              position: 'bottom',
              bottomOffset: 55,
              type: 'success',
            }),
          1000,
        );
      }
    }
  }, [showLoginSuccess]);

  const setUserDetails = (data: UserProfileResponseModel) => {
    const customAttributes: ICustomAttributes = {
      identifier_hash: data?.identityHash ?? '',
      user_phone_no: authUser?.phone ?? '',
      initiated_from: `profile_screen_${Platform.OS}_app`,
      chatting_from: `user_profile_${Platform.OS}_app`,
    };

    setUserCustomAttributes(customAttributes);
    setPrimeUserDetails({
      avatar_url: '',
      identifier: authUser?.phone ?? '',
      phone: authUser?.phone ?? '',
      identifier_hash: data?.identityHash ?? '',
    });
  };
  const { colors } = useTheme<Theme>();
  if (!userData && loading) {
    return <Loader />;
  }

  if (!isNetworkAvailable) {
    return <></>
  } else if (!authUser?.phone) {
    return <LoginModal />;
  }

  const navigateToEditProfile = () => navigation.navigate('EditProfile');
  const navigateToSupport = () => {
    trackMoEngageAppEvent({
      event: `support_squad_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Support');
  };
  const navigateToOrders = () => {
    trackMoEngageAppEvent({
      event: `my_orders_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Orders');
  };
  const navigateToOffers = () => {
    trackMoEngageAppEvent({
      event: `offers_page_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Offers');
  };
  const navigateToAddresses = () => {
    trackMoEngageAppEvent({
      event: `my_addresses_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Addresses', { isView: true, screenName: 'ProfileScreen' });
  };
  const navigateToNotificationSettings = () => {
    trackMoEngageAppEvent({
      event: `notification_settings_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('NotificationSettings');
  };

  const handleLogoutFunction = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'NO',
        style: 'cancel',
      },
      {
        text: 'YES',
        async onPress() {
          await AsyncStorage.clear();
          trackMoEngageAppEvent({
            event: `user_logout_clicked_app`,
            values: [],
            trackingTransparency,
          });
          setUserData(null);
          authDispatch(setAuthenticated(false));
          modalsDispatch(loginSuccessful(false));
          authDispatch(setUserState(null));
          checkoutDispatch(setDiscountCode({ code: '' }));
          setTimeout(
            () =>
              Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
                position: 'bottom',
                bottomOffset: 55,
              }),
            300,
          );
          ReactMoE.logout();
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        },
      },
    ]);
  };

  const onChatWithExpert = () => {
    trackMoEngageAppEvent({
      event: `profile_chat_with_expert_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Consult');
  };

  const navigateToDetailsCash = () => {
    trackMoEngageAppEvent({
      event: `oziva_cash_page_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('OZivaCash');
  };
  const navigateToBlog = () => {
    trackMoEngageAppEvent({
      event: `oziva_blog_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('OZivaBlog');
  };

  const navigateToHelpDesk = () => {
    trackMoEngageAppEvent({
      event: `help_desk_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('HelpDesk');
  }

  const navigateToContactUs = () => {
    trackMoEngageAppEvent({
      event: `contact_us_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Contact');
  }

  const navigateToPrivacyPolicy = () => {
    trackMoEngageAppEvent({
      event: `privacy_policy_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Privacy');
  }

  const navigateTermsCondition = () => {
    trackMoEngageAppEvent({
      event: `terms_condition_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('Terms');
  }
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              isLoginSuccessful && fetchUserProfile();
            }}
          />
        }
      >
        <Box style={{ backgroundColor: '#C8E6C8' }} p={4}>
          <View
            style={[
              commonStyles.bgWhite,
              commonStyles.pad8,
              commonStyles.radius2,
            ]}
          >
            <ListItem
              right={
                <Pressable
                  onPress={navigateToEditProfile}
                  borderless
                  hitSlop={48}
                >
                  <Icon
                    name="pencil-outline"
                    size={24}
                    color={colors.ctaDarkGreen}
                  />
                </Pressable>
              }
            >
              {isLoginSuccessful && (
                <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                  <View style={[commonStyles.mr8]}>
                    <ProfileIconLined />
                  </View>
                  <View>
                    {userData?.userDetails?.firstName ||
                      userData?.userDetails?.lastName ? (
                      <Text variant="heading3" mb={1}>
                        {userData?.userDetails?.firstName}{' '}
                        {userData?.userDetails?.lastName}
                      </Text>
                    ) : null}
                    <Text
                      variant="body1"
                      style={[commonStyles.fs14, commonStyles.BlackColor]}
                    >
                      {userData?.userDetails?.phone}
                    </Text>
                  </View>
                </View>
              )}
            </ListItem>
          </View>
          <View
            style={[
              commonStyles.flexRow,
              commonStyles.mt8,
              { justifyContent: 'space-between', flexWrap: 'wrap' },
            ]}
          >
            <Pressable
              onPress={navigateToOrders}
              style={[
                commonStyles.flexColumn,
                commonStyles.alignCenter,
                commonStyles.bgWhite,
                commonStyles.ph4,
                commonStyles.pv16,
                commonStyles.radius2,
                {
                  width: '32%',
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  paddingBottom: 32,
                },
              ]}
            >
              <View style={[commonStyles.mb8]}>
                <TrackOrderIcon />
              </View>
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.fw500,
                  commonStyles.textCenter,
                ]}
              >
                Track Order
              </Text>
            </Pressable>

            <Pressable
              onPress={onChatWithExpert}
              style={[
                commonStyles.flexColumn,
                commonStyles.alignCenter,
                commonStyles.bgWhite,
                commonStyles.ph4,
                commonStyles.pv16,
                commonStyles.radius2,
                { width: '32%', borderWidth: 1, borderColor: '#E0E0E0' },
              ]}
            >
              <View style={[commonStyles.mb8]}>
                <ChatWithExpertIcon />
              </View>
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.fw500,
                  commonStyles.textCenter,
                ]}
              >
                Diet
              </Text>
            </Pressable>
            <Pressable
              onPress={navigateToOffers}
              style={[
                commonStyles.flexColumn,
                commonStyles.alignCenter,
                commonStyles.bgWhite,
                commonStyles.ph4,
                commonStyles.pv16,
                commonStyles.radius2,
                { width: '32%', borderWidth: 1, borderColor: '#E0E0E0' },
              ]}
            >
              <View style={[commonStyles.mb8]}>
                <OffersIcon />
              </View>
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.fw500,
                  commonStyles.textCenter,
                ]}
              >
                Offers
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: width,
              height: 48,
              marginLeft: -16,
              marginBottom: -16,
              marginTop: -40,
              backgroundColor: '#f2f2f2',
              zIndex: -1,
              position: 'relative',
            }}
          ></View>
        </Box>
        {chatWootModalVisibility && !authCheckLoading ? (
          <ChatlineAccessRestriction
            locale="en"
            websiteToken={chatWootWebsiteToken}
            baseUrl={chatWootBaseURL}
            closeModal={() => modalsDispatch(setChatWootModal(false))}
            isModalVisible={chatWootModalVisibility}
            user={primeUserDetails}
            customAttributes={userCustomAttributes}
            isConsult={false}
          />
        ) : null}
        <Box mt={2} backgroundColor="levelOneBg">
          {/* <DetailsLinkItem
            title="OZiva Prime"
            icon={<PrimeLogoIcon />}
            onPress={navigateToDetailsPrime}
          />
          <Hr /> */}
          <DetailsLinkItem
            title="OZiva Cash"
            icon={<OzivaCashIcon />}
            onPress={navigateToDetailsCash}
          />
          <Hr />
          <DetailsLinkItem
            title="Blog"
            icon={<BlogLineIconComponent />}
            onPress={navigateToBlog}
          />
          <Hr />
          <DetailsLinkItem
            title="My Addresses"
            icon={
              <Icon
                name="map-marker-outline"
                size={18}
                color={colors.ctaDarkGreen}
              />
            }
            onPress={navigateToAddresses}
          />
          <Hr />
          <DetailsLinkItem
            title="Notification Settings"
            icon={
              <Icon name="bell-outline" size={18} color={colors.ctaDarkGreen} />
            }
            onPress={navigateToNotificationSettings}
          />
          <Hr />
          <Text padding={4} onPress={() => navigateToContactUs()}>
            Contact Us
          </Text>
          <Hr />
          <Text padding={4} onPress={() => navigateToHelpDesk()}>
            Help Desk
          </Text>
          <Hr />
          <Text padding={4} onPress={() => navigateToPrivacyPolicy()}>
            Privacy Policy
          </Text>
          <Hr />
          <Text padding={4} onPress={() => navigateTermsCondition()}>
            Terms & Conditions
          </Text>
          <Hr />
          {/* <DetailsLinkItem
          title="Rate Our Application"
          icon={<Icon name="star-outline" size={18} color={colors.bodyText} />}
          onPress={navigateToChat}
          includeChevron={false}
        />
        <Hr /> */}
          <DetailsLinkItem
            title="Logout"
            icon={<Icon name="logout" size={18} color={colors.ctaDarkGreen} />}
            onPress={handleLogoutFunction}
            includeChevron={false}
          />
          <Hr />
          <Text variant="heading3" padding={4}>
            {Config.ENVIRONMENT === 'Development'
              ? 'Dev'
              : Config.ENVIRONMENT === 'Preprod'
                ? 'Preprod'
                : ''}{' '}
            Application Version: {APP_VERSION}
          </Text>
        </Box>
        <SafeBottomSpace />
      </ScrollView>
    </>
  );
};

export default ProfileContainer;
