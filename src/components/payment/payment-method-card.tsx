import { setIsPaymentProcessing, setPaymentMethod } from 'actions/checkout';
import DebitCardIconComponent from 'assets/images/icons/payment-icons/debit_card_icon';
import NetbankingIconComponent from 'assets/images/icons/payment-icons/netbanking-icon';
import WalletIconComponent from 'assets/images/icons/payment-icons/wallet_icon';
import React, { useRef, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import RazorpayCheckout from 'react-native-customui';

import { BaseView } from '@components/base/view';
import PrimaryButton from '@components/elements/button/primary-Button';
import WhiteCard from '@components/elements/card/white-card';
import { useCartState } from '@context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { getUserPhone } from '@services/auth';
import {
  createRazorpayOrderService
} from '@services/checkout';
import { RAZORPAY_LIVE_KEY, width } from '@utils/constants';
import { useModalsDispatch } from 'context/modals';
import { router } from 'expo-router';
import useLogin from 'hooks/login';

interface Props {
  navigation: any;
  title: string;
  paymentMethod: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
}

const PaymentMethodWhiteCard = ({
  navigation,
  title,
  paymentMethod,
}: Props): React.ReactElement => {
  const isCard = paymentMethod === 'card';
  // const isEmi = paymentMethod === 'emi';
  const isNetbanking = paymentMethod === 'netbanking';
  // const isUPI = paymentMethod === 'upi';
  const isWallet = paymentMethod === 'wallet';
  const [expanded, setExpanded] = useState(false);
  const { orderTotal } = useCartState();
  const { checkout_id: checkoutId, customer } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const isProcessingRef = useRef(false);

  const launchPaymentProcess = async () => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    const payload = {
      payment_method: paymentMethod,
      channel: 'razorpay'
    }
    try {
      const razorpayCreateData = await createRazorpayOrderService(checkoutId, payload);

      const userPhone = await getUserPhone();

      const options = {
        description: 'OZiva Order',
        currency: 'INR',
        key_id: RAZORPAY_LIVE_KEY,
        order_id:
          razorpayCreateData?.data.razorPayOrderId,
        amount: orderTotal, // amount in currency subunits. Defaults to INR. 100 = 100 paise = INR 1.
        email: "payments@oziva.in",
        contact: userPhone,
        method: `${paymentMethod}`,
      };

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
        .catch(error => {
          isProcessingRef.current = false;
          console.log(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error: any) {
      isProcessingRef.current = false;
      console.log(error, 'error in the launch payment process');
      checkoutDispatch(setIsPaymentProcessing(false));
      if (error?.response?.status === 401) {
        handleLogout();
        navigation.navigate('CartScreen');
      }
    }
  };

  return (
    <>
      <View style={{ marginBottom: 2 }}>
        <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
          <WhiteCard
            style={{ padding: 20, paddingBottom: expanded ? 0 : 20 }}
            noBorderRadius
          >
            <BaseView row>
              {isCard ? (
                <DebitCardIconComponent width={30} height={30} />
              ) : null}
              {isWallet ? <WalletIconComponent width={30} height={30} /> : null}
              {isNetbanking ? (
                <NetbankingIconComponent width={30} height={30} />
              ) : null}
              <Text style={{ marginLeft: 10, fontSize: 16 }}>{title}</Text>
            </BaseView>
          </WhiteCard>
        </TouchableWithoutFeedback>
        {expanded ? (
          <WhiteCard
            style={{ padding: 0, paddingBottom: 20, margin: 0 }}
            noBorderRadius
          >
            <BaseView AlignRight style={{ paddingHorizontal: 20 }}>
              <PrimaryButton
                title="Place Order"
                accentColor="#FF6F00"
                width={width / 2.3}
                // height={48}
                onAction={() => launchPaymentProcess()}
              />
            </BaseView>
          </WhiteCard>
        ) : null}
      </View>
    </>
  );
};

export default PaymentMethodWhiteCard;
