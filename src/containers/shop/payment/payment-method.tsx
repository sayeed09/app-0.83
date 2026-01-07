import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setCartDeliveryCharge } from 'actions/cart';
import { setPaymentError, setPaymentMethodsToShow } from 'actions/checkout';
import { BaseView } from 'components/base/view';
import WhiteCard from 'components/elements/card/white-card';
import Loader from 'components/elements/loader/loader';
import CardPaymentMethodWhiteCard from 'components/payment/card-payment-method-card';
import CODPaymentMethodWhiteCard from 'components/payment/cod-payment-card';
import BankPaymentMethodWhiteCard from 'components/payment/netbanking-payment-method-card';
import UPIPaymentMethodWhiteCard from 'components/payment/upi-payment-method-card';
import WalletPaymentMethodWhiteCard from 'components/payment/wallet-payment-method-card';
import { Color, errorRed, errorRedBackground } from 'components/styles/colors';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { OFFER_ICON } from 'utils/images';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { useNotificationState } from 'context/notifications';
import { getPaymentMethod } from 'models/payment';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';
import { GATrackingService } from 'utils/ga-tracking';
import { DISCOUNT_ICON } from 'utils/images';

import { trackMoEngageAppEvent } from '@utils/common';

import { getCartLineItems } from '../common';
import { commonStyles } from 'styles/common';
import { useAuthState } from 'context/auth';
import { PrimeMemberShipType } from 'models/prime';
import OrderSummaryAccordion from 'components/order/order-summary-accordion';
import crashlytics from '@react-native-firebase/crashlytics';
import { incentiveAmountService } from 'services/checkout';
import { IncentiveAmountPayload, IncentiveValue } from 'models/shop/checkout';
import { useModalsDispatch } from 'context/modals';
import useLogin from 'hooks/login';
import FooterDetails from '../cart/cart-list/footer-details';

const PaymentMethod = ({ navigation }): React.ReactElement => {
  const { trackingTransparency } = useNotificationState();
  const { lineItems, orderTotal } = useCartState();
  const { userData } = useAuthState();
  const [incentiveValue, setIncentiveValue] = useState<IncentiveValue>();
  const [loading, setLoading] = useState(false);


  const { payment_method: paymentMethod, checkout_id: checkoutId } =
    useCheckoutState();
  const { handleLogout } = useLogin();

  const {
    isPaymentProcessing,
    setPaymentError: paymentError,
    discount_code: discountCode,
  } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const modalsDispatch = useModalsDispatch();
  const cartDispatch = useCartDispatch();
  const [isFocused, setIsFocused] = useState(false);

  const incentiveAmount = () => {
    setLoading(true);
    const payload: IncentiveAmountPayload = {
      paymentMethod: getPaymentMethod(paymentMethod),
    };
    incentiveAmountService(checkoutId, payload).then(response => {
      setIncentiveValue(response);
      setLoading(false);
      if(response.status === 'COMPLETED'){
        navigation.navigate('OrderConfirmationScreen');
      }
    }).catch(err => {
      console.log("Error : ", err);
      setLoading(false);
      if (err?.response?.status === 401) {
        handleLogout();
        navigation.navigate('CartScreen');
      }
    })
  }

  useEffect(() => {
    trackMoEngageAppEvent({
      event: `viewed_payment_page_app`,
      values: [],
      trackingTransparency,
    });
  }, []);

  useEffect(() => {
    checkoutDispatch(setPaymentError(null));
  }, [checkoutDispatch]);

  useEffect(() => {
    incentiveAmount();
    crashlytics().log(`payment method : ${paymentMethod} - ${checkoutId}`);
  }, [paymentMethod]);

  const trackPayment = (paymentMethod: string) => {
    GATrackingService.trackPaymentInfo(
      lineItems.map(item => {
        return {
          item_id: String(item?.product_id) || String(item?.productId),
          item_name: item?.title,
          quantity: item?.quantity,
          price: convertToRupees(Number(item?.price) || 0),
        };
      }),
      discountCode?.code,
      convertToRupees(orderTotal ?? 0),
      paymentMethod,
    );
  };

  useEffect(() => {
    if (incentiveValue) {
      checkoutDispatch(
        setPaymentMethodsToShow(incentiveValue?.paymentOptions),
      );
      // Update the cart for online payment incentive
      // const lineItems = [...incentiveValue?.line_items];
      cartDispatch(
        setCartDeliveryCharge({
          freeShipping: incentiveValue?.free_shipping,
          shippingName: incentiveValue?.shipping_name,
          shippingCharges: incentiveValue?.shipping_charges,
          orderSubtotal: incentiveValue?.order_subtotal,
          orderTotal: incentiveValue?.order_total,
          totalDiscount: incentiveValue?.discount_value,
          lineItems: getCartLineItems(lineItems),
          orderTotalMRP: incentiveValue?.orderTotalMrp,
          cashback:
            (userData?.prime?.current_status === PrimeMemberShipType.Prime
              ? incentiveValue?.cashbackPrime
              : incentiveValue?.cashbackNonPrime) || 0,
        }),
      );
    }
  }, [incentiveValue]);
  return isPaymentProcessing ? (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loader />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OrderSummaryAccordion />
        {paymentError ? (
          <WhiteCard noBorderRadius style={{ marginBottom: 0 }}>
            <BaseView
              AlignLeft
              row
              style={{
                backgroundColor: errorRedBackground,
                borderColor: errorRed,
                borderWidth: 1,
                borderRadius: 6,
                padding: 12,
              }}
            >
              <Icon
                name="alert-circle-outline"
                size={20}
                color={errorRed}
                style={{ marginRight: 5, marginTop: 2 }}
              />
              <BaseView AlignLeft>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 12,
                    color: errorRed,
                    width: '100%',
                  }}
                >
                  Your payment could not be processed, please try again.
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 12,
                    color: errorRed,
                    width: '95%',
                  }}
                >
                  Any amount deducted will be credited within 7-8 business days.
                </Text>
              </BaseView>
            </BaseView>
          </WhiteCard>
        ) : null}
        
        <View
          style={{
            backgroundColor: Color.WHITE,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            padding: 16,
          }}
        >
          <View>
            <Text
              style={[
                commonStyles.fs14,
                commonStyles.fw500,
                {
                  color: '#7E7E7E',
                },
              ]}
            >
              Payment Options
            </Text>
          </View>
          {incentiveValue &&
            incentiveValue.checkoutType === 'subscription' && (
              <View style={[commonStyles.mt8]}>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fw500,
                    commonStyles.darkGreenText,
                  ]}
                >
                  You will receive a payment link for your recurring order every
                  month where you can select any mode of payment.
                </Text>
              </View>
            )}
        </View>

        {orderTotal != 0 && (
          <>
            <UPIPaymentMethodWhiteCard
              navigation={navigation}
              title="UPI"
              trackPayment={trackPayment}
              setIsFocused={setIsFocused}
            />

            <CardPaymentMethodWhiteCard
              title="Credit/Debit Card"
              navigation={navigation}
              trackPayment={trackPayment}
              setIsFocused={setIsFocused}
            />

            <BankPaymentMethodWhiteCard
              navigation={navigation}
              title="Net Banking"
              trackPayment={trackPayment}
              setIsFocused={setIsFocused}
              isFocused={isFocused}
            />

            <WalletPaymentMethodWhiteCard
              navigation={navigation}
              title="Wallet"
              trackPayment={trackPayment}
              setIsFocused={setIsFocused}
            />
          </>
        )}
        <CODPaymentMethodWhiteCard
          navigation={navigation}
          title="Cash On Delivery"
          trackPayment={trackPayment}
          loading={loading}
          setIsFocused={setIsFocused}
        />
        <View style={{backgroundColor: '#FFF', marginTop: 16}}>
          <FooterDetails showTrustBadges={true} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentMethod;
