import {
  setIsPaymentProcessing,
  setPaymentError,
  setPaymentMethod,
} from 'actions/checkout';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import WhiteCard from 'components/elements/card/white-card';
import ErrorText from 'components/form/validation-error-text';
import { Color, grayb3 } from 'components/styles/colors';
import { useCartState } from 'context/cart/CartContext';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { Formik } from 'formik';
import { IValidateUPIId, PaymentMethodType } from 'models/payment';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import RazorpayCheckout from 'react-native-customui';
import { createRazorpayOrderService, validateUPIId } from 'services/checkout';
import { RAZORPAY_LIVE_KEY, upiIntentApps } from 'utils/constants';
import * as Yup from 'yup';

import crashlytics from '@react-native-firebase/crashlytics';
import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import { useNotificationState } from 'context/notifications';
import { router } from 'expo-router';
import useLogin from 'hooks/login';
import { Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { trackContinueShopping } from './comman';
import { OtherAvailableUPIApps } from './others-available-upi-apps-modal';
import PaymentTitle from './payment-title';
import Policies from './policies';

interface Props {
  navigation: any;
  title: string;
  trackPayment: (paymentMethod: string) => void;
  setIsFocused: (isFocused: boolean) => void;
}

const upiPaymentStyles = StyleSheet.create({
  upiApps: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  inputText: {
    marginTop: 4
  },
  verifiedTextBox: {
    flexDirection: 'row',
    gap: 4
  },
  heading: {
    fontWeight: '500',
    marginTop: 8
  },
  apps: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  appLogo: {
    width: 24,
    height: 24,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  horizontalLineContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#7E7E7E',
  },
  upiIdContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16
  },
  upiTitle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    justifyContent: 'space-between',
    height: 48
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    color: '#000',
    flex: 1,
    height: 48
  },
  verifyButton: {
    color: '#6BBD58',
    fontWeight: 900
  },
  successText: {
    color: '#6BBD58',
    fontWeight: '500',
  },
  policyContainer: {
    marginBottom: 8
  }
});

const UPIPaymentMethodWhiteCard = ({
  navigation,
  title,
  trackPayment,
  setIsFocused,
}: Props): React.ReactElement => {
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
  const [toggleItem, setToggleItem] = useState(true);
  const [supportedApps, setSupportedApps] = useState<any>([]);
  const [nonSupportedApps, setNonSupportedApps] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [toggeleUPI, setToggeleUPI] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const [validateUPIResponse, setValidateUPIResponse] =
    useState<IValidateUPIId | null>();
  const [verifiedUPIId, setVerifiedUPIId] = useState(false);
  const [isFocusOn, setIsFocusOn] = useState(false);

  const paymentMethod = PaymentMethodType.UPI;

  const expanded = paymentMethod === paymentMethodInState && toggleItem;
  const isProcessingRef = useRef(false);
  useEffect(() => {
    if (!expanded) {
      setToggleItem(false);
    }
  }, [expanded, checkoutDispatch]);

  useEffect(() => {
    RazorpayCheckout.getAppsWhichSupportUPI((data) => {
      const apps = data.data.map(({ iconBase64, ...rest }) => rest);
      if (apps.length === 0) {
        setToggeleUPI(true);
      } else if (Platform.OS === 'ios') {
        const updatedData = apps.map(item => item.appName).map(({ appPackageName, appIconBase64, ...rest }) => ({
          packageName: appPackageName,
          ...rest
        }));
        formattedApps(updatedData);
      } else {
        formattedApps(apps);
      }
    });
  }, []);


  const formattedApps = (apps) => {
    if (apps && apps.length > 0) {
      let defaultApps: any = [];
      let nonDefaultApps: any = [];
      apps.forEach(app => {
        if (app?.appName && upiIntentApps.includes(app?.appName.toLowerCase())) {
          defaultApps.push(app);
        } else {
          nonDefaultApps.push(app);
        }
      });
      if (nonDefaultApps.length > 0) {
        defaultApps.push({ "appLogo": "https://cdn.shopify.com/s/files/1/2393/2199/files/upi_icon_21f183d1-2b35-4f2c-a1c8-18cee65ffc82.png?v=1743068578", "appName": "Other UPI", "packageName": "" })
        setNonSupportedApps(nonDefaultApps);
      }
      setSupportedApps(defaultApps);
    }
  }

  const launchPaymentProcess = async (vpa: string, isApp: boolean, packageName: string) => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    trackPayment(paymentMethod);
    const payload = {
      payment_method: 'upi',
      channel: 'razorpay'
    }
    try {
      const razorpayCreateData = await createRazorpayOrderService(checkoutId, payload);
      crashlytics().log(
        `UPI payment method : ${paymentMethod} - ${checkoutId}`,
      );
      let options;
      if (isApp) {
        crashlytics().log(
          `UPI payment type - Intent`,
        );
        options = {
          description: 'OZiva Order',
          currency: 'INR',
          key_id: RAZORPAY_LIVE_KEY,
          order_id:
            razorpayCreateData?.data.razorPayOrderId,
          amount: orderTotal,
          email: 'payments@oziva.in',
          contact: customer?.phone,
          method: 'upi',
          upi_app_package_name: packageName,
          '_[flow]': "intent"
        };
      } else {
        crashlytics().log(
          `UPI payment type - UPI Id`,
        );
        options = {
          description: 'OZiva Order',
          currency: 'INR',
          key_id: RAZORPAY_LIVE_KEY,
          order_id:
            razorpayCreateData?.data.razorPayOrderId,
          amount: orderTotal,
          email: 'payments@oziva.in',
          contact: customer?.phone,
          method: 'upi',
          upi: {
            vpa,
            flow: 'collect',
          },
          app: vpa,
        };
      }

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
          console.log(`Error: ${error.code} | ${error.description}`);
          isProcessingRef.current = false;
          checkoutDispatch(setIsPaymentProcessing(false));
          checkoutDispatch(setPaymentError('payment error'));
          crashlytics().recordError(
            `Payment error : ${paymentMethod} - ${checkoutId}`,
          );
        });
    } catch (error: any) {
      console.log(error, 'error in the launch payment process');
      isProcessingRef.current = false;
      checkoutDispatch(setIsPaymentProcessing(false));
      checkoutDispatch(setPaymentError('payment error'));
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

  const ValidationSchema = Yup.object().shape({
    vpa: Yup.string()
      .required('Please enter your UPI ID')
      .matches(/[\w.+-]+@[\w-]+(?!\w\.-[\w]+)/, 'Please enter a valid UPI ID'),
  });

  const verifyUPIId = async (UPIId) => {
    try {
      if (UPIId !== "") {
        setLoader(true);
        const upiRegex = /[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}/;
        const isValid = upiRegex.test(UPIId);

        if (!isValid) {
          setValidateUPIResponse({ "error": { "code": "INVALIDVPAENTERED", "reason": "invalid_vpa_enter" } });
        } else {
          const response = await validateUPIId(UPIId);
          if (response?.data) {
            setVerifiedUPIId(true);
          } else if (response?.error) {
            setVerifiedUPIId(false);
          }
          setValidateUPIResponse(response);
        }

        setLoader(false);
      } else {
        setLoader(false);
        setValidateUPIResponse({ "error": { "code": "INVALIDVPAENTERED", "reason": "invalid_vpa_enter" } });
      }
    } catch (error) {
      setValidateUPIResponse(null);
      setLoader(false);
    }
  };

  return (
    <>
      <View style={{ marginBottom: 1 }}>
        <Pressable
          onPress={() => {
            checkoutDispatch(setPaymentMethod(PaymentMethodType.UPI));
            setToggleItem(!toggleItem);
            setIsFocused(false);
            setVerifiedUPIId(false);
            setValidateUPIResponse(null)
          }}
        >
          <WhiteCard style={{ paddingVertical: 8, }} noBorderRadius>
            <PaymentTitle
              expanded={expanded}
              title={title}
              method={paymentMethod}
            />
          </WhiteCard>
        </Pressable>
        {expanded ? (
          <WhiteCard
            noPadding
            style={{
              paddingHorizontal: 16,
              paddingTop: 0,
              margin: 0,
              justifyContent: 'center',
            }}
            noBorderRadius
          >
            {supportedApps.length > 0 && <Text style={upiPaymentStyles.heading}>Pay securely using your favourite UPI Apps</Text>}
            <View style={upiPaymentStyles.upiApps}>
              {
                supportedApps.length > 0 && (
                  supportedApps.map(apps => {
                    return (<Pressable onPress={() => {
                      if (apps.appName == 'Other UPI') {
                        setShowPopup(true);
                      } else {
                        launchPaymentProcess(apps.appName, true, apps.packageName)
                      }
                    }}>
                      <View style={{ alignItems: 'center' }}>
                        <View style={upiPaymentStyles.apps}>
                          <Image
                            source={{ uri: apps.appLogo }}
                            style={upiPaymentStyles.appLogo}
                          />
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 4 }}>{apps.appName == 'GPay' ? 'Google Pay' : apps.appName}</Text>
                      </View>
                    </Pressable>
                    )
                  })
                )
              }
            </View>

            {supportedApps.length > 0 && <View style={upiPaymentStyles.horizontalLineContainer}>
              <View style={upiPaymentStyles.horizontalLine}></View>
              <Text style={{ marginVertical: 16, marginHorizontal: 8 }}>OR</Text>
              <View style={upiPaymentStyles.horizontalLine}></View>
            </View>}

            <View style={upiPaymentStyles.upiIdContainer}>
              <Pressable onPress={() => {
                setToggeleUPI(!toggeleUPI);
                setValidateUPIResponse(null);
              }}>
                <View style={upiPaymentStyles.upiTitle}>
                  <View style={upiPaymentStyles.header}>
                    <SvgUri uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/upi_icon_svg.svg?v=1701068507'} />
                    <Text>Pay with UPI ID </Text>
                  </View>
                  <View>
                    <SvgUri uri={!toggeleUPI ? 'https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_down_black.svg?v=1724076880' : 'https://cdn.shopify.com/s/files/1/2393/2199/files/expand_more_d91d95e2-1c54-4042-9b05-7c7aa4d87040.svg?v=1743067222'} width={20} height={20} />
                  </View>
                </View>
              </Pressable>
              {
                toggeleUPI ? (
                  <Formik
                    initialValues={{
                      vpa: '',
                    }}
                    validateOnMount={true}
                    validationSchema={ValidationSchema}
                    onSubmit={async values => {
                      launchPaymentProcess(values.vpa, false, '');
                    }}
                  >
                    {({
                      isValid,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                    }) => {
                      return (
                        <View>
                          <View style={{ marginBottom: 16 }}>
                            <View style={[upiPaymentStyles.inputContainer, isFocusOn ? { borderColor: '#006E5A' } : validateUPIResponse && validateUPIResponse.error ? { borderColor: '#CED4DA' } : { borderColor: '#BDBDBD' }]}>
                              <TextInput
                                onChangeText={handleChange('vpa')}
                                onBlur={() => {
                                  handleBlur('vpa');
                                  setIsFocusOn(false);
                                }}
                                value={values.vpa}
                                style={upiPaymentStyles.input}
                                placeholder="Enter UPI ID"
                                keyboardType="email-address"
                                placeholderTextColor={grayb3}
                                onFocus={() => setIsFocusOn(true)}
                                onChange={() => setValidateUPIResponse(null)}
                              />
                              {
                                loader ? <ActivityIndicator animating size="small" color="#006e5a" /> : !verifiedUPIId ? <Pressable onPress={() => {
                                  verifyUPIId(values.vpa);
                                }}>
                                  <Text style={upiPaymentStyles.successText}>VERIFY</Text>
                                </Pressable> : <Pressable onPress={() => {
                                  values.vpa = ''
                                  setValidateUPIResponse(null);
                                  setVerifiedUPIId(false);
                                }}>
                                  <SvgUri uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/crossed.svg?v=1742552135'} />
                                </Pressable>
                              }
                            </View>
                            <View style={upiPaymentStyles.inputText}>
                              {validateUPIResponse?.error && validateUPIResponse?.error?.code === "INVALIDVPAENTERED" ? (
                                <ErrorText>Please enter valid UPI ID</ErrorText>
                              ) : validateUPIResponse?.error && validateUPIResponse?.error?.code === "INVALIDVPA" ? <ErrorText>Incorrect UPI</ErrorText> : validateUPIResponse && validateUPIResponse?.data && validateUPIResponse?.data?.name && <View style={upiPaymentStyles.verifiedTextBox}><SvgUri uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/checked.svg?v=1742466459'} /><Text style={upiPaymentStyles.successText}>{validateUPIResponse?.data?.name}</Text></View>}
                            </View>
                          </View>
                          <BaseView>
                            <ShimmerButtonWrapper onAction={() => (isValid || verifiedUPIId) && handleSubmit()}>
                              <PrimaryButton
                                title={'PROCEED'}
                                accentColor={"#FF6F00"}
                                style={{ paddingHorizontal: 0 }}
                                disabled={!isValid || !verifiedUPIId}
                                disabledColor={Color.PAYMENT_DISABLED}
                              />
                            </ShimmerButtonWrapper>
                          </BaseView>
                          <View style={upiPaymentStyles.policyContainer}>
                            <Policies />
                          </View>
                        </View>
                      );
                    }}
                  </Formik>
                ) : null
              }
            </View>
          </WhiteCard>
        ) : null}
      </View>
      {showPopup ? <OtherAvailableUPIApps setShowPopup={setShowPopup} nonDefaultApps={[...nonSupportedApps]} launchPaymentProcess={launchPaymentProcess} /> : null}
    </>
  );
};

export default UPIPaymentMethodWhiteCard;
