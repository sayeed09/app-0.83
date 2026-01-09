import React, { useEffect, useState } from 'react';
import { Pressable, SectionList, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useQuery } from 'react-query';
// import { RouteProp } from '@react-navigation/native';
import OzivaCashWalletIconComponent from 'assets/images/icons/oziva-cash-icons/oziva-cash-wallet-icon';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

// import {
//   getTransactions,
// } from 'rest/profile-react-query';
import { setLoginModal } from '@actions/modals';
import { SecondaryButton } from '@components/base/buttons';
import { Box, Hr, Text } from '@components/base/foundation';
import ListItem from '@components/elements/lists/item';
import Loader from '@components/elements/loader/loader';
import { FullPageErrorFallback } from '@components/shared/error';
import { useModalsDispatch, useModalsState } from '@context/modals';
import useLogin from 'hooks/login';
import { UserProfileResponseModel } from 'models/auth';
import { getOZivaCashService, getUserProfileDataService } from 'services/user';

const OZivaCash = ({
  navigation,
}: // route,
  {
    navigation: any
    // route: RouteProp<AppStackDefinition, 'OZivaCash'>;
  }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [ozivaCashData, setOzivaCashData] = useState<any>([]);
  const [userProfileData, setUserProfileData] = useState<UserProfileResponseModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const [expanded, setExpanded] = useState({
    benefits: true,
    earn: true,
    faqs: true,
    redeem: true,
  });

  const getOzivaCash = () => {
    setLoading(true);
    const perPage = 3;
    getOZivaCashService(perPage, pageNumber).then(response => {
      setOzivaCashData([...ozivaCashData, ...response]);
      setLoading(false);
    }).catch(error => {
      console.log("Error : ", error);
      setLoading(false);
      setError(error)
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    })
  }

  const getUserProfile = () => {
    setProfileLoading(true);
    getUserProfileDataService()
      .then((response: UserProfileResponseModel) => {
        setUserProfileData(response);
        setProfileLoading(false);
      })
      .catch((error) => {
        console.log("Error while getting user profile : ", error);
        setProfileLoading(false);
        if (error?.response?.status === 401) {
          handleLogout();
          navigation.navigate('ProfileScreen');
        }
      });
  }

  const viewMoreTransactions = () => {
    setPageNumber(pageNumber + 1);
    getOzivaCash();
  };

  const toggleSection = (section: 'benefits' | 'earn' | 'faqs' | 'redeem') =>
    setExpanded(state => ({ ...state, [section]: !state[section] }));
  const { isLoginSuccessful } = useModalsState();

  navigation.addListener('focus', () => {
    getOzivaCash();
    if (error) {
      modalsDispatch(setLoginModal(true));
    }
  });

  useEffect(() => {
    if (isLoginSuccessful) {
      getOzivaCash();
    }
  }, [isLoginSuccessful]);

  useEffect(() => {
    if (isLoginSuccessful) {
      getUserProfile();
    }
  }, [isLoginSuccessful]);

  const retry = login => {
    if (login) {
      modalsDispatch(setLoginModal(true));
    } else {
      getOzivaCash();
    }
  };

  if (isEmpty(ozivaCashData) && !DataTable && loading) {
    return <Loader />;
  }
  if (error && !isLoginSuccessful) {
    const login = error?.message.includes('401');
    return (
      <FullPageErrorFallback
        onRetry={() => retry(login)}
        title={login ? 'Login' : 'Retry'}
        error={error as AxiosError}
        noMessage={login}
      />
    );
  }
  const sections = [
    { name: 'balance' as const, data: [] },
    {
      name: 'history' as const,
      data: ozivaCashData,
    },
    { name: 'benefits' as const, data: [] },
    {
      name: 'earn' as const,
      data: expanded.earn
        ? [
          'Earn 200 OZiva Cash on your first login.',
          'Use special cash back offers on your cart while placing your order.',
        ]
        : [],
    },
    {
      name: 'redeem' as const,
      data: expanded.redeem
        ? [
          'Login using your Mobile Phone Number.',
          'Apply your OZiva Cash from the cart while placing your order.',
          'Complete your purchase.',
        ]
        : [],
    },
    {
      name: 'faqs' as const,
      data: expanded.faqs
        ? [
          {
            question: 'What is OZiva Cash?',
            answer:
              'OZiva Cash is a points system driven through cashback to incentivise our loyal and valued customers.',
          },
          {
            question: 'Is there a membership fee for OZiva Cash?',
            answer: 'There is no membership fee for OZiva Cash.',
          },
          {
            question: 'How can I earn and redeem OZiva Cash?',
            answer:
              'You need to log in / sign up on the OZiva website or app to earn and redeem Cash. OZiva Cash is exclusively available on the OZiva website and app.',
          },
          {
            question: 'Where can I view my OZiva Cash Wallet balance?',
            answer:
              'You can view your OZiva Cash Wallet balance in Cash section of the Cash & Deals page.',
          },
          {
            question: 'How do I earn OZiva Cash?',
            answer:
              "You can earn OZiva Cash by applying cashback coupons from the 'View Offers' section of your Cart.",
          },
          {
            question: 'How much is 1 OZiva Cash worth?',
            answer: '1 OZiva Cash is equivalent to 1 INR.',
          },
          {
            question: 'When will my OZiva Cash expire?',
            answer:
              'Your OZiva Cash will expire after 45 days from the date of earning them.',
          },
          {
            question: 'How do I redeem my OZiva Cash?',
            answer:
              'You can redeem your OZiva Cash on the cart while placing your order. If you`re logged in, you would automatically be able to see how much of your OZiva Cash can be used with your order.',
          },
        ]
        : [],
    },
  ];

  return (
    <>
      {ozivaCashData && (
        <SectionList
          sections={sections as any}
          renderSectionHeader={({ section }) => {
            if (section.name === 'balance') {
              return (
                <Box p={4}>
                  <Box
                    bg="levelOneBg"
                    opacity={0.7}
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                  />
                  <Text variant="heading3" textAlign="center" mb={3}>
                    Total Balance
                  </Text>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    mb={3}
                  >
                    {/** TODO: Add balance image */}
                    {!profileLoading && (
                      <>
                        <OzivaCashWalletIconComponent />
                        <Text variant="display1" color="ctaDarkGreen">
                          {userProfileData?.wallet?.oziva_cash_balance}
                        </Text>
                      </>
                    )}
                  </Box>
                  <Text
                    textAlign="center"
                    color="hintText"
                    variant="body3"
                    my={3}
                  >
                    1 OZiva Cash = ₹1.00
                  </Text>
                  <Text
                    textAlign="center"
                    color="hintText"
                    mx={4}
                    variant="body3"
                  >
                    Get rewarded with OZiva Cash. Use your OZiva Cash for
                    exciting discounts with every order.
                  </Text>
                </Box>
              );
            }
            if (section.name === 'history') {
              return (
                <Box bg="levelOneBg" mt={2}>
                  <Box
                    px={4}
                    py={2}
                    borderBottomWidth={1}
                    borderColor="levelOneBorder"
                  >
                    <Text variant="heading3">My OZiva Cash History</Text>
                  </Box>
                </Box>
              );
            }
            if (section.name === 'benefits') {
              return (
                <Box backgroundColor="levelOneBg">
                  <Pressable
                    py={2}
                    px={4}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    onPress={() => toggleSection('benefits')}
                  >
                    <Text variant="heading3">OZiva Cash Benefits</Text>
                    <Icon
                      name={expanded.benefits ? 'chevron-up' : 'chevron-down'}
                      size={24}
                    />
                  </Pressable>
                  {expanded.benefits && (
                    <Box flexDirection="row" pb={3} px={4}>
                      {/** TODO: Add image */}

                      <OzivaCashWalletIconComponent />
                      <Box pl={4}>
                        <Text variant="heading4" mb={2}>
                          Big Discounts
                        </Text>
                        <Text variant="body2" mb={2}>
                          Use your OZiva Cash to get up to ₹150 extra off on
                          every purchase.
                        </Text>
                        <Text variant="body2">1 OZiva Cash = ₹1.00</Text>
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            }
            if (section.name === 'earn') {
              return (
                <Pressable
                  backgroundColor="levelOneBg"
                  px={4}
                  py={2}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onPress={() => toggleSection('earn')}
                >
                  <Text variant="heading3">How to Earn</Text>
                  <Icon
                    name={expanded.earn ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                </Pressable>
              );
            }
            if (section.name === 'redeem') {
              return (
                <Pressable
                  backgroundColor="levelOneBg"
                  px={4}
                  py={2}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onPress={() => toggleSection('redeem')}
                >
                  <Text variant="heading3">How to Redeem</Text>
                  <Icon
                    name={expanded.redeem ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                </Pressable>
              );
            }
            if (section.name === 'faqs') {
              return (
                <Pressable
                  backgroundColor="levelOneBg"
                  px={4}
                  py={2}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onPress={() => toggleSection('faqs')}
                >
                  <Text variant="heading3">FAQs</Text>
                  <Icon
                    name={expanded.faqs ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                </Pressable>
              );
            }
            return null;
          }}
          renderSectionFooter={({ section }) => {
            if (section.name === 'history') {
              return (
                <>
                  {loading ? (
                    <View style={{ paddingBottom: 15 }}>
                      <Loader />
                    </View>
                  ) : !isEmpty(ozivaCashData) ? (
                    <Box
                      bg="levelOneBg"
                      borderTopWidth={1}
                      borderColor="levelOneBorder"
                      mb={2}
                    >
                      <SecondaryButton
                        title="View more"
                        onPress={viewMoreTransactions}
                      />
                    </Box>
                  ) : null}
                </>
              );
            }
            return <Box mb={1} />;
          }}
          renderItem={({ section, index, item }) => {
            if (['balance', 'benefits'].includes(section.name)) {
              return null;
            }
            if (section.name === 'history') {
              const expired =
                !!item.expire_at && dayjs(item.expire_at).isBefore(dayjs());
              return (
                <Box bg="levelOneBg" px={4}>
                  {index > 0 && <Hr />}
                  <Box py={3}>
                    <ListItem
                      right={
                        <Box
                          alignItems="flex-end"
                          justifyContent="space-between"
                          alignSelf="stretch"
                        >
                          <Text
                            variant="heading4"
                            style={{
                              textDecorationLine: expired
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {item.type === 'CREDIT'
                              ? `+${item.amount}`
                              : expired || item.type === 'REVERSE'
                                ? ` ${expired || item.credit_reversal ? '-' : '+'
                                }${item.amount}`
                                : item.amount}{' '}
                            Cash
                          </Text>
                          {!expired && item.type === 'CREDIT' && (
                            <Box
                              bg="brandPrimary"
                              py={1}
                              px={2}
                              borderRadius={4}
                            >
                              <Text color="onBrandPrimary" variant="body2">
                                Earned
                              </Text>
                            </Box>
                          )}
                          {item.type === 'REVERSE' && (
                            <Box
                              bg="brandPrimary"
                              py={1}
                              px={2}
                              borderRadius={4}
                            >
                              <Text color="onBrandPrimary" variant="body2">
                                Redeem
                              </Text>
                            </Box>
                          )}
                          {!expired && item.type === 'DEBIT' && (
                            <Box
                              backgroundColor="disabledBg"
                              py={1}
                              px={2}
                              borderRadius={4}
                            >
                              <Text color="onBrandPrimary" variant="body2">
                                Redeemed
                              </Text>
                            </Box>
                          )}
                          {expired && (
                            <Box bg="errorBg" py={1} px={2} borderRadius={4}>
                              <Text color="onBrandPrimary" variant="body2">
                                Expired
                              </Text>
                            </Box>
                          )}
                        </Box>
                      }
                    >
                      {!!item.order_number && (
                        <Text>Order ID: {item.order_number}</Text>
                      )}
                      {item.type === 'REVERSE' && (
                        <>
                          <Text>Transaction Reversed</Text>
                          <Text color="hintText" variant="body2">
                            Transaction is reversed
                          </Text>
                        </>
                      )}
                      {!!item.coupon && (
                        <Text color="hintText" variant="body2">
                          Code Used: {item.coupon}
                        </Text>
                      )}
                      <Text color="hintText" variant="body2">
                        {dayjs(item.created_at).format('DD MMM YYYY')}
                        {item.expire_at
                          ? ` | Expiry ${dayjs(item.expire_at).format(
                            'DD MMM YYYY',
                          )}`
                          : ''}
                      </Text>
                    </ListItem>
                  </Box>
                </Box>
              );
            }
            if (section.name === 'faqs') {
              return (
                <Box bg="levelOneBg" px={4} py={2}>
                  <Text variant="heading4">{item.question}</Text>
                  <Text variant="body2" color="hintText">
                    {item.answer}
                  </Text>
                </Box>
              );
            }
            if (['earn', 'redeem'].includes(section.name)) {
              return (
                <Box
                  bg="levelOneBg"
                  flexDirection="row"
                  px={4}
                  pb={2}
                  alignItems="center"
                >
                  <Box
                    bg="brandPrimary"
                    width={20}
                    height={20}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={20}
                  >
                    <Text variant="body3" color="onBrandPrimary">
                      {index + 1}
                    </Text>
                  </Box>
                  <Text variant="body2" ml={2}>
                    {item}
                  </Text>
                </Box>
              );
            }
            return null;
          }}
        />
      )}
    </>
  );
};
export default OZivaCash;
