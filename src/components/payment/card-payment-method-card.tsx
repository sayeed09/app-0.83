import {
  setIsPaymentProcessing,
  setPaymentError,
  setPaymentMethod,
} from 'actions/checkout';
import valid from 'card-validator';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import ErrorText from 'components/form/validation-error-text';
import { Color, grayb3 } from 'components/styles/colors';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { Formik } from 'formik';
import { PaymentMethodType } from 'models/payment';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableNativeFeedback, View } from 'react-native';
import RazorpayCheckout from 'react-native-customui';
import { createRazorpayOrderService } from 'services/checkout';
import { formStyles } from 'styles/form';
import { RAZORPAY_LIVE_KEY, width } from 'utils/constants';
import * as Yup from 'yup';

import crashlytics from '@react-native-firebase/crashlytics';
import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import { useModalsDispatch } from 'context/modals';
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

interface Card {
  cardNumber: string;
  cardOwnerName: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: number;
}

const handleValidThruChange = (text, setFieldValue) => {
  // eslint-disable-next-line prefer-template
  let value = text.replace(/[^0-9]/g, '');
  if (value.length >= 3) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }
  if (value.length > 5) value = value.slice(0, 5);
  setFieldValue('validThru', value);
};

const CardPaymentMethodWhiteCard = ({
  navigation,
  title,
  trackPayment,
  setIsFocused,
}: Props): React.ReactElement => {
  const paymentMethod: PaymentMethodType = PaymentMethodType.CARD;
  const { trackingTransparency } = useNotificationState();
  const modalsDispatch = useModalsDispatch();
  const { orderTotal, lineItems, orderSubtotal } = useCartState();
  const { handleLogout } = useLogin();
  const {
    checkout_id: checkoutId,
    customer,
    payment_method: paymentMethodInState,
    discount_code: discountCode,
  } = useCheckoutState();
  const [toggleItem, setToggleItem] = useState(false);
  const isProcessingRef = useRef(false);

  const expanded = paymentMethodInState === paymentMethod && toggleItem;
  const checkoutDispatch = useCheckoutDispatch();

  useEffect(() => {
    if (!expanded) {
      setToggleItem(false);
    }
  }, [expanded, checkoutDispatch]);


  const requiredString = 'This field is mandatory';

  const ValidationSchema = Yup.object().shape({
    number: Yup.string()
      .test(
        'test-number',
        'Card number is invalid please check',
        value => valid.number(value).isValid,
      )
      .required(requiredString),
    name: Yup.string().required(requiredString),
    validThru: Yup.string()
      .required(requiredString)
      .matches(
        /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/,
        'Should be in MM/YY format. e.g. 01/26',
      ),
    cvv: Yup.string().required(requiredString).min(3).max(3),
  });

  const launchPaymentProcess = async (cardPayload: Card) => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;

    trackPayment(paymentMethod);
    try {
      const payload = {
        payment_method: paymentMethod,
        channel: 'razorpay',
      }
      const razorpayCreateData = await createRazorpayOrderService(
        checkoutId,
        payload
      );
      const options = {
        description: 'OZiva Order',
        currency: 'INR',
        key_id: RAZORPAY_LIVE_KEY,
        order_id:
          razorpayCreateData?.data.razorPayOrderId,
        amount: orderTotal, // amount in currency subunits. Defaults to INR. 100 = 100 paise = INR 1.
        email: 'payments@oziva.in',
        contact: customer?.phone,
        method: 'card',
        card: {
          number: cardPayload.cardNumber,
          name: cardPayload.cardOwnerName,
          expiry_month: cardPayload.expiryMonth,
          expiry_year: cardPayload.expiryYear,
          cvv: cardPayload.cvv,
        },
      };

      crashlytics().log(`Payment method options : ${paymentMethod}`);

      checkoutDispatch(setIsPaymentProcessing(true));

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
          checkoutDispatch(setPaymentError('payment error'));
          checkoutDispatch(setIsPaymentProcessing(false));
          crashlytics().recordError(
            `Payment error : ${checkoutId} - ${paymentMethod}`,
          );
        });
    } catch (error: any) {
      isProcessingRef.current = false;
      console.log(error, 'error in the launch payment process');
      checkoutDispatch(setPaymentError('payment error'));
      checkoutDispatch(setIsPaymentProcessing(false));
      crashlytics().recordError(
        `Error in the launch payment process : ${checkoutId} - ${paymentMethod}`,
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

  const formatCardNumber = (value) => {
    if (!value) return value;
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <>
      <View style={{ marginBottom: 1, flex: 1 }}>
        <TouchableNativeFeedback
          onPress={() => {
            checkoutDispatch(setPaymentMethod(PaymentMethodType.CARD));
            setToggleItem(!toggleItem);
            setIsFocused(false);
          }}
        >
          <WhiteCard style={{ paddingHorizontal: 16, paddingVertical: 8 }} noBorderRadius>
            <PaymentTitle
              expanded={expanded}
              title={title}
              method={paymentMethod}
            />
          </WhiteCard>
        </TouchableNativeFeedback>

        {expanded ? (
          <WhiteCard
            style={{ padding: 0, paddingBottom: 20, margin: 0 }}
            noBorderRadius
          >
            <BaseView style={{ paddingHorizontal: 20 }}>
              <Formik
                initialValues={{
                  number: '',
                  name: '',
                  validThru: '',
                  cvv: '',
                }}
                validateOnMount={true}
                validationSchema={ValidationSchema}
                onSubmit={async values => {
                  const [expiryMonth, expiryYear] = values.validThru.split('/');

                  const cardPayload: Card = {
                    cardNumber: values.number,
                    cardOwnerName: values.name,
                    expiryMonth: Number(expiryMonth),
                    expiryYear: Number(expiryYear),
                    cvv: Number(values.cvv),
                  };

                  launchPaymentProcess(cardPayload);
                }}
              >
                {({
                  isValid,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  setFieldValue,
                }) => (
                  <>
                    <View style={{ width: '100%' }}>
                      <Text style={[commonStyles.fs14]}>Enter card details</Text>
                    </View>
                    <View
                      style={{
                        width,
                        paddingHorizontal: 16,
                        marginTop: 16,
                      }}
                    >
                      <TextInput
                        onChangeText={(text) => {
                          return handleChange('number')(formatCardNumber(text));
                        }}
                        onBlur={handleBlur('number')}
                        value={values.number}
                        style={formStyles.inputFieldDefault}
                        placeholder="Card Number"
                        keyboardType="numeric"
                        placeholderTextColor={grayb3}
                        maxLength={19}
                      />
                      {errors.number && touched.number ? (
                        <ErrorText>*{errors.number}</ErrorText>
                      ) : null}
                    </View>
                    <View
                      style={{
                        width,
                        paddingHorizontal: 16,
                        marginTop: 8,
                      }}
                    >
                      <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        style={formStyles.inputFieldDefault}
                        placeholder="Name on card"
                        placeholderTextColor={grayb3}
                      />
                      {errors.name && touched.name ? (
                        <ErrorText>*{errors.name}</ErrorText>
                      ) : null}
                    </View>
                    <View style={[commonStyles.flexD, commonStyles.mb8]}>
                      <View
                        style={{
                          width: '65%',
                          marginTop: 8,
                          marginRight: 8,
                        }}
                      >
                        <TextInput
                          onChangeText={text =>
                            handleValidThruChange(text, setFieldValue)
                          }
                          value={values.validThru}
                          style={formStyles.inputFieldDefault}
                          placeholder="MM/YY"
                          keyboardType="numeric"
                          placeholderTextColor={grayb3}
                          maxLength={5}
                        />
                        {errors.validThru && touched.validThru ? (
                          <ErrorText>*{errors.validThru}</ErrorText>
                        ) : null}
                      </View>
                      <View
                        style={{
                          width: '35%',
                          marginTop: 8,
                        }}
                      >
                        <TextInput
                          onChangeText={handleChange('cvv')}
                          onBlur={handleBlur('cvv')}
                          value={values.cvv}
                          style={formStyles.inputFieldDefault}
                          placeholder="CVV"
                          keyboardType="numeric"
                          secureTextEntry={true}
                          placeholderTextColor={grayb3}
                          maxLength={3}
                        />
                        {errors.cvv && touched.cvv ? (
                          <ErrorText>*{errors.cvv}</ErrorText>
                        ) : null}
                      </View>
                    </View>
                    <View>
                      <ShimmerButtonWrapper onAction={() => isValid && handleSubmit()}>
                        <PrimaryButton
                          title={`PROCEED`}
                          accentColor={'#FF6F00'}
                          style={{ paddingHorizontal: 0 }}
                          disabled={!isValid}
                          disabledColor={Color.PAYMENT_DISABLED}
                        />
                      </ShimmerButtonWrapper>
                    </View>
                  </>
                )}
              </Formik>
              <Policies />
            </BaseView>
          </WhiteCard>
        ) : null}
      </View>
    </>
  );
};

export default CardPaymentMethodWhiteCard;
