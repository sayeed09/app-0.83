import React, { useEffect, useState } from 'react';
import {
  ListRenderItem,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  SectionListData,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {
  setCustomerDetails,
  setSubscriptionAddress,
  updateAddress,
} from '@actions/checkout';
import { setLoginModal } from '@actions/modals';
import AddressCard from '@components/address/address-card';
import { RadioAction, RadioCheck } from '@components/base/checkbox/styled';
import {
  Box,
  SafeBottomSpace,
  Text,
} from '@components/base/foundation';
import { BaseView } from '@components/base/view';
import PrimaryButton from '@components/elements/button/primary-Button';
// import SecondaryButton from '@components/elements/button/secondary-button';
import WhiteCard from '@components/elements/card/white-card';
import { FullPageErrorFallback } from '@components/shared/error';
import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { useModalsDispatch, useModalsState } from '@context/modals';
import { UserAddress } from '@models/shop/address';
import { CustomerAddressPayload } from '@models/shop/checkout';
import { AxiosError } from 'axios';
import Loader from 'components/elements/loader/loader';
import { router, useLocalSearchParams } from 'expo-router';
import useLogin from 'hooks/login';
import { getAllAddressService } from 'services/address';
import { patchAddressService } from 'services/checkout';
import { commonStyles } from 'styles/common';
import { getProvinceFromPincode } from 'utils/checkout';

const renderHeader = (info: { section: SectionListData<any, any> }) => (
  <Text style={[commonStyles.h3Tag, commonStyles.mb4, commonStyles.fwBold]}>
    {info.section.title}
  </Text>
);

const keyExtractor = (item: UserAddress) => item?.id;

interface SectionItem {
  title: string;
  data: UserAddress | UserAddress[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const removeFirstIndex = ([x, ...rest]): UserAddress[] => rest;

const Addresses = ({
  navigation,
  route,
}: {
  navigation: any;
  route;
}) => {
  const [sectionAddresses, setSectionAddresses] = useState<SectionItem[]>([]);
  const [checked, setChecked] = useState<UserAddress>({} as UserAddress);
  const [selectedAddressID, setSelectedAddressID] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userAddressList, setUserAddressList] = useState<UserAddress[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const {
    checkout_id: checkoutId,
    address: selectedAddress,
    subscriptionAddress,
  } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const modalsDispatch = useModalsDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoginSuccessful } = useModalsState();
  const { handleLogout } = useLogin();

  const { isView, isSubscription, screenName } = useLocalSearchParams<any>();
  const getAddresses = async () => {
    try {
      setLoading(true);
      const addressList = await getAllAddressService();
      setUserAddressList(addressList);
      setLoading(false);
    } catch (error: any) {
      console.log("Error : ", error);
      setError(error);
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
      }
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getAddresses();
    });

    return () => {
      navigation.removeListener('focus', () => {
        getAddresses();
      });
    };
  }, []);

  const retry = login => {
    if (login) {
      modalsDispatch(setLoginModal(true));
    } else {
      getAddresses();
    }
  };
  const handleEdit = (address) => {
    // navigation.navigate('AddAddressScreen', {
    //   navigateTo: 'Addresses',
    //   address,
    //   isSubscription,
    //   screenName: screenName
    // });
    router.push({
      pathname: '/AddAddressScreen',
      params: {
        navigateTo: 'Addresses',
        isSubscription: isSubscription,
        screenName: screenName,
        address
      },
    });
    setErrorMessage && setErrorMessage('');
  }
  const renderAddress: ListRenderItem<any> = ({
    item,
  }: {
    item: UserAddress;
  }) =>
    item ? (
      <Pressable
        onPress={() => {
          setChecked(item);
          setErrorMessage('');
          setSelectedAddressID(item.id);
        }}
        marginBottom={2}
      >
        <WhiteCard noBorderRadius noPadding style={{ borderWidth: 1, borderColor: '#E0E0E0', padding: 8, borderRadius: 4, }}>
          <View>
            <BaseView row AlignLeft
              style={{
                backgroundColor: '#fff'
              }}
            >
              {!isView && (
                <BaseView style={{ marginTop: 4, marginRight: 5, backgroundColor: '#fff' }}>
                  <RadioAction checked={checked?.id == item?.id ?? false}>
                    <RadioCheck checked={checked?.id == item?.id ?? false} />
                  </RadioAction>
                </BaseView>
              )}
              <AddressCard
                address={item}
                navigation={navigation}
                isView={isView}
                isSubscription={isSubscription}
                errorMessage={errorMessage}
                selectedAddressID={selectedAddressID}
                setErrorMessage={setErrorMessage}
                screenName={screenName}
                handleEdit={handleEdit}
              />
            </BaseView>
          </View>
        </WhiteCard>
      </Pressable>
    ) : null;

  useEffect(() => {
    if (userAddressList) {
      setUserAddressList(userAddressList);
      const addresses = [
        {
          title: 'DEFAULT ADDRESS',
          data: userAddressList.filter(address => address.defaultAddress),
        },
        {
          title: 'OTHER ADDRESSES',
          data: userAddressList.filter(address => !address.defaultAddress),
        },
      ];
      const new_sectionAddresses = addresses.filter(
        addressType => addressType.data.length !== 0,
      );
      setSectionAddresses(new_sectionAddresses);
      if (!subscriptionAddress && !isSubscription) {
        let checked =
          selectedAddress ??
          userAddressList.filter(address => address.defaultAddress)[0];
        if (!checked && userAddressList.length > 0) {
          checked = userAddressList[0];
        }
        setChecked(checked);
      } else {
        setNewAddressId();
      }
    }
  }, [userAddressList]);

  useEffect(() => {
    if (isSubscription && subscriptionAddress) {
      let userAddress = Object.assign({}, subscriptionAddress);
      if (!userAddress.id && userAddress.addressId) {
        userAddress.id = userAddress.addressId.toString();
      }
      setChecked(userAddress);
    }
  }, [subscriptionAddress]);

  if (loading) {
    return <Loader />;
  }
  const setNewAddressId = () => {
    if (!subscriptionAddress?.addressId && !subscriptionAddress?.id) {
      let newAddress = userAddressList?.filter(
        item =>
          item.zip == subscriptionAddress?.zip &&
          item.firstName == subscriptionAddress?.firstName &&
          item.address1 == subscriptionAddress?.address1,
      );
      if (newAddress && newAddress.length > 0) {
        checkoutDispatch(setSubscriptionAddress(newAddress[0]));
      }
    }
  };
  const confirmAddress = async () => {
    setIsSubmitting(true);
    if (isSubscription) {
      checkoutDispatch(setSubscriptionAddress(checked));
      setIsSubmitting(false);
      navigation.navigate('SubscriptionAddressOrderSummary');
    } else {
      let addressToPatch: CustomerAddressPayload = {
        ...checked,
        checkoutId,
      };
      try {
        if (
          !addressToPatch.province ||
          (addressToPatch.province &&
            addressToPatch.province === addressToPatch.city)
        ) {
          addressToPatch = await getProvinceFromPincode(addressToPatch);
        }

        const payload = { ...checked }
        await patchAddressService(checkoutId, payload);
        Toast.show({
          text1: 'Your address has been updated.',
          position: 'bottom',
          bottomOffset: 60,
          type: 'success',
        });
        setIsSubmitting(false);
        checkoutDispatch(
          setCustomerDetails({
            name: `${addressToPatch?.firstName} ${addressToPatch?.lastName}`,
            email: addressToPatch?.email,
            phone: addressToPatch?.phone,
          }),
        );
        checkoutDispatch(updateAddress(checked));
        navigation.navigate('AddressOrderSummaryScreen');

        setIsSubmitting(false);
      } catch (err: any) {
        setIsSubmitting(false);
        if (err && err?.code === 'UNSERVICEABLEPINCODE') {
          setErrorMessage(err.message);
        }
        if (err?.response?.status === 401) {
          handleLogout();
          navigation.navigate(screenName === 'CartScreen' ? 'CartScreen' : 'ProfileScreen'); //To handle ProfileScreen and Checkout Screen navigation
        }
      }
    }
  };

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }}
    >
      <ScrollView>
        <WhiteCard noBorderRadius>
          <Pressable
            onPress={() => {
              router.push({
                pathname: '/AddAddressScreen',
                params: {
                  navigateTo: 'Addresses',
                  isSubscription: isSubscription,
                  screenName: screenName
                },
              });
            }
              //     navigation.navigate('AddAddressScreen', {
              //   navigateTo: 'Addresses',
              // isSubscription: isSubscription,
              // screenName: screenName

            }
          >
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                borderWidth: 1,
                borderColor: '#6BBD58',
                borderRadius: 2,
                height: 42,
              }}
            >
              <Text
                style={{
                  color: '#6BBD58',
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                + ADD NEW ADDRESS
              </Text>
            </View>
          </Pressable>
        </WhiteCard>
        <View style={{ borderWidth: 1, borderColor: '#E0E0E0', padding: 8, borderRadius: 4, marginHorizontal: 16, }}>
          {userAddressList && userAddressList.length > 0 ? (
            <SectionList
              sections={sectionAddresses ? (sectionAddresses as any) : []}
              renderItem={renderAddress}
              keyExtractor={keyExtractor}
              renderSectionHeader={renderHeader}
              ItemSeparatorComponent={() => <Box pt={3} />}
              ListFooterComponent={SafeBottomSpace}
            />
          ) : null}
        </View>
      </ScrollView>
      {
        !isView && (
          <BaseView
            style={{
              padding: 5,
              backgroundColor: '#fff',
            }}
          >
            <PrimaryButton
              accentColor="#F04E23"
              title="CONFIRM"
              onAction={() => {
                confirmAddress();
              }}
              loading={isSubmitting}
            />
          </BaseView>
        )
      }
    </SafeAreaView >
  );
};

export default Addresses;