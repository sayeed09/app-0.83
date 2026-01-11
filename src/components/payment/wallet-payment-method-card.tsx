import {
  setIsPaymentProcessing,
  setPaymentError,
  setPaymentMethod,
} from 'actions/checkout';
import AirtelMoneyIconComponent from 'assets/images/icons/wallet-logos/airtel-money-icon';
import AmazonPayIconComponent from 'assets/images/icons/wallet-logos/amazon-pay-icon';
import FreechargeIconComponent from 'assets/images/icons/wallet-logos/freecharge-icon';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TouchableNativeFeedback, View } from 'react-native';
import RazorpayCheckout from 'react-native-customui';
// import PayZappIconComponent from 'assets/images/icons/wallet-logos/hdfc-icon';
import MobiKwikIconComponent from 'assets/images/icons/wallet-logos/mobikwik-icon';
import PhonePeIconComponent from 'assets/images/icons/wallet-logos/phonepe-icon';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { PaymentMethodType } from 'models/payment';
import { createRazorpayOrderService } from 'services/checkout';
import { RAZORPAY_LIVE_KEY } from 'utils/constants';

import crashlytics from '@react-native-firebase/crashlytics';
import { Color } from 'components/styles/colors';
import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import { useNotificationState } from 'context/notifications';
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
}

enum Wallets {
  FREECHARGE = 'freecharge',
  PAYZAPP = 'payzapp',
  PHONEPE = 'phonepe',
  OLAMONEY = 'olamoney',
  AIRTEL = 'airtelmoney',
  MOBIKWIK = 'mobikwik',
  JIOMONEY = 'jiomoney',
  AMAZONPAY = 'amazonpay',
}

interface WalletItem {
  id: number;
  title: string;
  name: Wallets;
  Icon: React.ReactElement;
}

const WALLET_ITEMS: WalletItem[] = [
  {
    id: 1,
    title: 'Freecharge',
    name: Wallets.FREECHARGE,
    Icon: <FreechargeIconComponent />,
  },
  // {
  //   id: 2,
  //   title: 'PayZapp',
  //   name: Wallets.PAYZAPP,
  //   Icon: <PayZappIconComponent />,
  // },
  {
    id: 3,
    title: 'PhonePe',
    name: Wallets.PHONEPE,
    Icon: <PhonePeIconComponent />,
  },
  {
    id: 4,
    title: 'Amazon Pay',
    name: Wallets.AMAZONPAY,
    Icon: <AmazonPayIconComponent />,
  },
  {
    id: 5,
    title: 'Airtel Money',
    name: Wallets.AIRTEL,
    Icon: <AirtelMoneyIconComponent />,
  },
  {
    id: 7,
    title: 'MobiKwik',
    name: Wallets.MOBIKWIK,
    Icon: <MobiKwikIconComponent />,
  },
];

const WalletPaymentMethodWhiteCard = ({
  navigation,
  title,
  trackPayment,
  setIsFocused,
}: Props): React.ReactElement => {
  const [checked, setChecked] = useState('');
  const [toggleItem, setToggleItem] = useState(false);
  const { trackingTransparency } = useNotificationState();
  const { orderTotal, lineItems, orderSubtotal } = useCartState();
  const { handleLogout } = useLogin();
  const {
    checkout_id: checkoutId,
    customer,
    payment_method: paymentMethodInState,
    discount_code: discountCode,
  } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const isProcessingRef = useRef(false);

  const paymentMethod = PaymentMethodType.WALLET;
  const expanded = paymentMethodInState === paymentMethod && toggleItem;

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
        method: 'wallet',
        wallet: checked,
      };
      crashlytics().log(
        `Wallet payment metho options : ${paymentMethod} - ${checkoutId}`,
      );
      checkoutDispatch(setIsPaymentProcessing(true));
      checkoutDispatch(setPaymentMethod(paymentMethod));

      RazorpayCheckout.open(options)
        .then(async data => {
          checkoutDispatch(setIsPaymentProcessing(true));
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
        .catch(error => {
          console.log(`Error: ${error.code} | ${error.description}`);
          checkoutDispatch(setPaymentError('payment error'));
          checkoutDispatch(setIsPaymentProcessing(false));
          crashlytics().recordError(
            `Payment error : ${paymentMethod} - ${checkoutId}`,
          );
          isProcessingRef.current = false;
        });
    } catch (error: any) {
      console.log(error, 'error in the launch payment process');
      isProcessingRef.current = false;
      checkoutDispatch(setPaymentError('payment error'));
      checkoutDispatch(setIsPaymentProcessing(false));
      crashlytics().recordError(
        `Error in the launch payment process : ${paymentMethod} - ${checkoutId}`,
      );
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('CartScreen');
      }
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
            checkoutDispatch(setPaymentMethod(PaymentMethodType.WALLET));
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
              paddingHorizontal: 20,
              margin: 0,
              justifyContent: 'center',
              paddingTop: 0,
            }}
            noBorderRadius
          >
            {WALLET_ITEMS.map(wallet => (
              <Pressable
                onPress={() => {
                  setChecked(wallet.name);
                }}
                key={wallet.id}
              >
                <View
                  style={[commonStyles.flexD, {
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E0E0E0',
                  }]}
                >
                  <BaseView row>
                    {wallet.Icon}
                    <Text
                      style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15,
                        marginLeft: 10,
                      }}
                    >
                      {wallet.title}
                    </Text>
                  </BaseView>

                  <RadioAction checked={checked === wallet.name ?? false}>
                    <RadioCheck checked={checked === wallet.name ?? false} />
                  </RadioAction>
                </View>
              </Pressable>
            ))}
            <BaseView style={[commonStyles.mt16]}>
              <ShimmerButtonWrapper onAction={() => checked && launchPaymentProcess()}>
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
          </WhiteCard>
        ) : null}
      </View>
    </>
  );
};

export default WalletPaymentMethodWhiteCard;
