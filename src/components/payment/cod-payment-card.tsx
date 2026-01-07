import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import {
  setIsPaymentProcessing,
  setPaymentError,
  setPaymentMethod,
} from '@actions/checkout';
import { BaseView } from '@components/base/view';
import PrimaryButton from '@components/elements/button/primary-Button';
import WhiteCard from '@components/elements/card/white-card';
import { useCartState } from '@context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from '@context/checkout';
import { PaymentMethodType } from '@models/payment';
import {
  checkForCodDisabledVariants,
  createRazorpayOrderService,
} from '@services/checkout';
import { trackContinueShopping } from './comman';
import PaymentTitle from './payment-title';
import { useNotificationState } from 'context/notifications';
import Loader from 'components/elements/loader/loader';
import {
  ozivaPrimeProductId,
} from 'utils/constants';
import { commonStyles } from 'styles/common';
import crashlytics from '@react-native-firebase/crashlytics';
import { setLoginModal } from 'actions/modals';
import { useModalsDispatch } from 'context/modals';
import useLogin from 'hooks/login';
import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import Policies from './policies';
import { Color } from 'components/styles/colors';

interface Props {
  navigation: any;
  title: string;
  trackPayment: (paymentMethod: string) => void;
  loading: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

const CODPaymentMethodWhiteCard = ({
  navigation,
  title,
  trackPayment,
  loading,
  setIsFocused,
}: Props): React.ReactElement => {
  const { trackingTransparency } = useNotificationState();
  const {
    checkout_id: checkoutId,
    payment_method: paymentMethodInState,
    discount_code: discountCode,
    paymentOptions,
  } = useCheckoutState();

  const { lineItems, orderTotal, cartItems, shippingCharges, orderSubtotal } = useCartState();

  const checkoutDispatch = useCheckoutDispatch();
  const modalsDispatch = useModalsDispatch();
  const { handleLogout } = useLogin();
  const [toggleItem, setToggleItem] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [codDisabledStatus, setCodStatus] = useState(false);
  const isProcessingRef = useRef(false);

  const paymentMethod = PaymentMethodType.COD;
  const expanded =
    (paymentMethodInState === paymentMethod && toggleItem) || orderTotal == 0;

  const checkForCODDisable = () => {
    const isPrime = cartItems.some(
      data => Number(data.productId) === ozivaPrimeProductId,
    );
    let codStatus = checkForCodDisabledVariants(discountCode?.code);
    return (isPrime && cartItems.length == 1) || codStatus;
  };
  useEffect(() => {
    setCodStatus(checkForCODDisable());
  }, [expanded]);

  useEffect(() => {
    if (!expanded) {
      setToggleItem(false);
    }
  }, [expanded, checkoutDispatch]);

  const launchPaymentProcess = async () => {
    if (isProcessingRef.current || loading) return;

    isProcessingRef.current = true;

    trackPayment(paymentMethod);
    const payload = {
      payment_method: paymentMethod,
      channel: 'razorpay'
    }
    try {
      setPlacingOrder(true);
      const razorpayCreateData = await createRazorpayOrderService(checkoutId, payload);

      const codOrderStatus = razorpayCreateData.status;

      checkoutDispatch(setIsPaymentProcessing(true));
      checkoutDispatch(setPaymentMethod(paymentMethod));

      if (codOrderStatus === 'success') {
        navigation.navigate('OrderConfirmationScreen');
        checkoutDispatch(setIsPaymentProcessing(false));
        crashlytics().log(`COD order success : ${JSON.stringify(cartItems)}`);
      } else {
        isProcessingRef.current = false;
        checkoutDispatch(setIsPaymentProcessing(false));
        checkoutDispatch(setPaymentError('payment error'));
        crashlytics().recordError(`Payment error : ${cartItems}`);
      }
      setPlacingOrder(false);
    } catch (e: any) {
      isProcessingRef.current = false;
      setPlacingOrder(false);
      checkoutDispatch(setIsPaymentProcessing(false));
      checkoutDispatch(setPaymentError('payment error'));
      crashlytics().recordError(`Payment error : ${cartItems}`);

      if (e?.response?.status === 401) {
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

  const isButtonDisabled = checkForCODDisable() || (paymentOptions && paymentOptions?.filter(item => item.method == 'COD' && !item.isActive).length > 0)

  return (
    <>
      {!codDisabledStatus || orderTotal === 0 ? (
        <View style={{ marginBottom: 1 }}>
          <TouchableNativeFeedback
            onPress={() => {
              checkoutDispatch(setPaymentMethod(PaymentMethodType.COD));
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
              }}
              noBorderRadius
            >
              <View
                style={[
                  commonStyles.pad16,
                  commonStyles.BgLightGreen,
                  commonStyles.radius4,
                  commonStyles.mb8,
                ]}
              >
                {orderTotal != 0 ? (
                  <Text
                    style={[
                      commonStyles.fs14,
                      commonStyles.BlackColor,
                      commonStyles.fw500,
                    ]}
                  >
                    {paymentOptions &&
                      paymentOptions?.filter(
                        item =>
                          item.method == 'COD' &&
                          !item.isActive &&
                          item.reason == 'MINORDERVALUE',
                      ).length > 0
                      ? 'COD available for orders above ₹199.'
                      : paymentOptions &&
                        paymentOptions?.filter(
                          item =>
                            item.method == 'COD' &&
                            !item.isActive &&
                            item.reason == 'MAXORDERVALUE',
                        ).length > 0
                        ? 'COD is not available for orders above ₹5000'
                        : `COD Charge of ₹${Number(shippingCharges) / 100} has been added`}
                  </Text>
                ) : null}
              </View>
              <BaseView>
                {placingOrder ? (
                  <Loader />
                ) : (
                  <ShimmerButtonWrapper onAction={() => !isButtonDisabled && launchPaymentProcess()}>
                    <PrimaryButton
                      title={`${orderTotal == 0 ? 'PLACE ORDER FOR FREE' : 'PAY WITH CASH'
                        }`}
                      accentColor="#FF6F00"
                      style={{ paddingHorizontal: 0 }}
                      disabled={
                        checkForCODDisable() ||
                        (paymentOptions &&
                          paymentOptions?.filter(
                            item => item.method == 'COD' && !item.isActive,
                          ).length > 0)
                      }
                      disabledColor={Color.PAYMENT_DISABLED}
                    />
                  </ShimmerButtonWrapper>
                )}
              </BaseView>

              <Policies />
            </WhiteCard>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default CODPaymentMethodWhiteCard;
