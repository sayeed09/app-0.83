import crashlytics from '@react-native-firebase/crashlytics';
import {
  setIsPaymentProcessing,
  setPaymentError,
  setPaymentMethod,
} from 'actions/checkout';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import {
  Color,
  darkGreen,
  orderPromoLightGreen,
} from 'components/styles/colors';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { useNotificationState } from 'context/notifications';
import { PaymentMethodType } from 'models/payment';
import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native';
import RazorpayCheckout from 'react-native-customui';
import SvgRenderer from 'react-native-svg-renderer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createRazorpayOrderService, getAvailableBanks } from 'services/checkout';
import { RAZORPAY_LIVE_KEY, width } from 'utils/constants';
import { defaultBanks } from 'utils/constants/netbanking';

import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import { router } from 'expo-router';
import useLogin from 'hooks/login';
import { commonStyles } from 'styles/common';
import { trackContinueShopping } from './comman';
import PaymentTitle from './payment-title';
import Policies from './policies';

interface Props {
  navigation: any;
  title: string;
  trackPayment: (paymentMethod: string) => void;
  setIsFocused: (isFocused: boolean) => void;
  isFocused: boolean;
}

const styles = StyleSheet.create({
  baseInput: {
    borderWidth: 1,
    color: '#000',
    borderColor: 'rgba(0,0,0,0.16)',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.014,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  positionFixedLabel: {
    position: 'absolute',
    top: 8,
    right: 20,
    backgroundColor: '#fff',
    lineHeight: 50,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingLeft: 16,
    height: 38,
    zIndex: 2,
    borderLeftColor: '#ccc',
    borderLeftWidth: 1,
  },
  paymentButton: {
    borderWidth: 1,
    marginHorizontal: 4,
    padding: 10,
    marginBottom: 10,
    borderRadius: 2,
    width: width / 3.8,
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 54,
    left: 16,
    right: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flex: 1,
  },
  bankNameButton: {
    flex: 1,
    justifyContent: 'space-between',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#dedede',
    borderWidth: 1,
    paddingVertical: 8,
  }
});
const BankPaymentMethodWhiteCard = ({
  navigation,
  title,
  trackPayment,
  setIsFocused,
  isFocused,
}: Props): React.ReactElement => {
  const [checked, setChecked] = useState('');
  const [toggleItem, setToggleItem] = useState(false);
  const [searchBank, setSearchBank] = useState('');
  const [banksList, setBanksList] = useState<any>([]);
  const [tempBankList, setTempBankList] = useState<any>([]);
  const { orderTotal, lineItems, orderSubtotal } = useCartState();
  const { trackingTransparency } = useNotificationState();
  const { handleLogout } = useLogin();
  const {
    checkout_id: checkoutId,
    customer,
    payment_method: paymentMethodInState,
    discount_code: discountCode,
  } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const isProcessingRef = useRef(false);

  const paymentMethod = PaymentMethodType.NETBANKING;
  const expanded = paymentMethodInState === paymentMethod && toggleItem;

  useEffect(() => {
    getAvailableBanks().then(response => {
      const arrayOfObjects = Object.entries(response.netbanking).map(
        ([bankCode, bankName]) => ({ bankCode, bankName }),
      );
      setBanksList(arrayOfObjects);
      setTempBankList(arrayOfObjects);
    });
  }, []);

  useEffect(() => {
    if (!expanded) {
      setToggleItem(false);
    }
  }, [expanded, checkoutDispatch]);

  const launchPaymentProcess = async () => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    trackPayment(paymentMethod);
    const payload = {
      payment_method: paymentMethod,
      channel: 'razorpay'
    }
    try {
      const razorpayCreateData = await createRazorpayOrderService(checkoutId, payload);

      const options = {
        description: 'OZiva Order',
        currency: 'INR',
        key_id: RAZORPAY_LIVE_KEY,
        order_id:
          razorpayCreateData?.data.razorPayOrderId,
        amount: orderTotal, // amount in currency subunits. Defaults to INR. 100 = 100 paise = INR 1.
        email: 'payments@oziva.in',
        contact: customer?.phone,
        method: paymentMethod,
        bank: checked,
      };
      crashlytics().log(
        `Netbanking payment method : ${paymentMethod} - ${checkoutId}`,
      );

      checkoutDispatch(setIsPaymentProcessing(true));
      checkoutDispatch(setPaymentMethod(paymentMethod));

      RazorpayCheckout.open(options)
        .then(async data => {
          // navigation.navigate('OrderInProgressScreen', {
          //   paymentId: data.razorpay_payment_id,
          // });
          router.push({
            pathname: '/OrderInProgressScreen',
            params: {
              paymentId: data.razorpay_payment_id,
            },
          });
        })
        .catch((error: any) => {
          console.log(`Error: ${error.code} | ${error.description}`);
          checkoutDispatch(setPaymentError('payment error'));
          checkoutDispatch(setIsPaymentProcessing(false));
          crashlytics().recordError(
            `Payment error : ${paymentMethod} - ${checkoutId}`,
          );
          isProcessingRef.current = false;

          if (error?.response?.status === 401) {
            handleLogout();
            navigation.navigate('CartScreen');
          }
        });
    } catch (error: any) {
      console.log(error, 'error in the launch payment process');
      checkoutDispatch(setPaymentError('payment error'));
      checkoutDispatch(setIsPaymentProcessing(false));
      crashlytics().recordError(
        `Error in the launch payment process : ${paymentMethod} - ${checkoutId}`,
      );
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('CartScreen');
      }
      isProcessingRef.current = false;
    }
    trackContinueShopping(
      lineItems,
      orderSubtotal,
      orderTotal,
      discountCode,
      paymentMethodInState,
      trackingTransparency,
      true,
    );
  };
  return (
    <>
      <View style={{ marginBottom: 1 }}>
        <TouchableNativeFeedback
          onPress={() => {
            checkoutDispatch(setPaymentMethod(PaymentMethodType.NETBANKING));
            setToggleItem(!toggleItem);
            setIsFocused(false);
          }}
        >
          <WhiteCard style={{ paddingVertical: 8 }} noBorderRadius>
            <PaymentTitle
              expanded={expanded}
              title={title}
              method={paymentMethod}
            />
          </WhiteCard>
        </TouchableNativeFeedback>
        {expanded ? (
          <WhiteCard
            style={{
              margin: 0,
              padding: 0,
              justifyContent: 'center',
            }}
            noBorderRadius
          >
            <BaseView
              row
              style={{
                flex: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
                paddingHorizontal: 4,
                paddingTop: 16,
              }}
            >
              {tempBankList.length > 0 &&
                tempBankList.map((bank: any) => {
                  if (defaultBanks[bank.bankCode])
                    return (
                      <>
                        <BaseView key={bank.bankCode}>
                          <Pressable
                            onPress={() => {
                              setChecked(bank.bankCode);
                            }}
                          >
                            <View
                              style={[{
                                borderColor: checked === bank.bankCode
                                  ? darkGreen
                                  : '#f5f5f5',
                                backgroundColor:
                                  checked === bank.bankCode
                                    ? orderPromoLightGreen
                                    : 'transparent',
                              }, styles.paymentButton]}
                            >
                              <SvgRenderer
                                width="50"
                                height="50"
                                source={{
                                  uri: defaultBanks[bank.bankCode]
                                    ? defaultBanks[bank.bankCode].image
                                    : '',
                                }}
                              />
                              <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={[
                                  commonStyles.fs12,
                                  commonStyles.mt8,
                                  {
                                    textAlign: 'center',
                                  },
                                ]}
                              >
                                {bank.bankName}
                              </Text>
                            </View>
                          </Pressable>
                        </BaseView>
                      </>
                    );
                })}
            </BaseView>
            <View style={{ position: 'relative' }}>
              {/* START PRODUCT SEARCH INPUT */}
              <View
                style={{
                  paddingHorizontal: 16,
                  flex: 1,
                }}
              >
                <TextInput
                  onFocus={() => setIsFocused(true)}
                  onChangeText={text => {
                    setSearchBank(text);
                    setChecked('');
                    const newBankList = tempBankList.filter((bank: any) =>
                      bank.bankName
                        .toLowerCase()
                        .includes(text.toLowerCase().trim()),
                    );
                    const result =
                      newBankList.length > 0
                        ? newBankList
                        : [
                          {
                            bankCode: 'NOPT',
                            bankName: 'No Options',
                          },
                        ];
                    setBanksList(result);
                  }}
                  value={checked || searchBank}
                  style={[commonStyles.inputWrapDefault, { paddingHorizontal: 16 }]}
                  placeholder="VIEW MORE BANKS"
                  keyboardType="default"
                  placeholderTextColor="#000"
                />
                <View style={styles.positionFixedLabel}>
                  {isFocused ? (
                    <Pressable onPress={() => setIsFocused(false)}>
                      <Icon name="chevron-down" color="#000" size={30} />
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => setIsFocused(true)}>
                      <Icon name="chevron-up" color="#000" size={30} />
                    </Pressable>
                  )}
                </View>
              </View>
              {/* END PRODUCT SEARCH INPUT */}
              {/* START DROPDOWN */}
              {isFocused ? (
                <View
                  style={styles.dropdownContainer}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      flex: 1,
                      maxHeight: 222,
                    }}
                    nestedScrollEnabled
                  >
                    {banksList.length &&
                      banksList.map((bank: any) => (
                        <Pressable
                          key={bank.bankCode}
                          onPress={() => {
                            setChecked(bank.bankCode);
                            setIsFocused(false);
                          }}
                          disabled={bank.bankCode === 'NOPT'}
                          style={
                            bank.bankCode === 'NOPT'
                              ? {
                                backgroundColor: '#dbdbdb',
                              }
                              : {}
                          }
                        >
                          <BaseView
                            row
                            style={{
                              alignItems: 'center',
                              paddingHorizontal: 8,
                            }}
                          >
                            <BaseView
                              row
                              style={styles.bankNameButton}
                            >
                              <Text
                                style={{
                                  fontFamily: 'Roboto-Regular',
                                  fontSize: 14,
                                  marginRight: 16,
                                  paddingRight: 16,
                                }}
                              >
                                {bank.bankName}
                              </Text>
                            </BaseView>
                          </BaseView>
                        </Pressable>
                      ))}
                  </ScrollView>
                </View>
              ) : null}
              {/* END DROPDOWN */}
            </View>
            <View style={{ margin: 16 }}>
              <BaseView>
                <ShimmerButtonWrapper onAction={() => {
                  if (checked) {
                    setIsFocused(false);
                    launchPaymentProcess();
                  }
                }}>
                  <PrimaryButton
                    title={`PROCEED`}
                    accentColor="#FF6F00"
                    style={{ paddingHorizontal: 0 }}
                    disabled={!checked}
                    disabledColor={Color.PAYMENT_DISABLED}
                  />
                </ShimmerButtonWrapper>
              </BaseView>
              <Policies />
            </View>
          </WhiteCard>
        ) : null}
      </View>
    </>
  );
};

export default BankPaymentMethodWhiteCard;
