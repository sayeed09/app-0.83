import WhiteLogo from 'assets/images/icons/white-logo';
import { BaseView } from 'components/base/view';
import ErrorText from 'components/form/validation-error-text';
import { grayb3, primaryOrange } from 'components/styles/colors';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text, Alert, Linking } from 'react-native';
import { commonStyles } from 'styles/common';
import * as Yup from 'yup';
import PrimaryButton from 'components/elements/button/primary-Button';
import useLogin from 'hooks/login';
import { screenView } from '../standard/login-modal';
import { fullScreenLoginInputStyles, standardLoginInputStyles } from 'styles/login';
import AppModal from 'components/app-modal';
import OfferAppliedModal from 'components/cart/offer-applied-modal';
import crashlytics from '@react-native-firebase/crashlytics';
import PolicyContentPopup from './privacy-content-popup';
import { policyAndTermsService } from 'services/login';
import { PrivacyAndTerms } from 'models/auth';
import OZCheckbox from 'components/base/checkbox/oz-checkbox';
import { SvgUri } from 'react-native-svg';
import { useAuthDispatch, useAuthState } from 'context/auth';
import { setLoginMaxLimitErr } from 'actions/auth';

const ValidationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required('Please enter a valid mobile number')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid mobile number')
    .min(10, 'Please enter exactly 10 digits')
    .max(10, 'Please enter exactly 10 digits'),
});
interface IProps {
  setView: (view: screenView) => void;
}
const Login = (props: IProps) => {
  const [isFocused, setFocused] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isPrivacyPopup, setIsPrivacyPopup] = useState(true);
  const { handleSendOTP, sendOTPLoading } = useLogin();
  const { maxLoginAttemptsErr, shiprocketEnabled } = useAuthState();
  const [shiprocketLoginState, setShipRocketLoginState] = useState(shiprocketEnabled ? true : false);
  const inputRef = useRef<TextInput>(null);
  const authDispatch = useAuthDispatch();

  const { setView } = props;
  const [policyResponse, setPolicyResponse] = useState<PrivacyAndTerms>();
  const getPolicyData = () => {
    const privacyType = isPrivacyPopup ? 'privacyPolicy' : 'termsOfService';
    policyAndTermsService(privacyType).then((response) => {
      if (response && response.data && response.data.shop) {
        setPolicyResponse(isPrivacyPopup ? response?.data?.shop.privacyPolicy : response?.data?.shop?.termsOfService);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    getPolicyData();
  }, [isPrivacyPopup]);

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Failed to open URL:");
      }
    } catch (err) {
      console.error("Failed to open URL:", err);
    }
  };


  return (
    <>
      <View style={fullScreenLoginInputStyles.modalView}>
        <Formik
          initialValues={{
            mobileNumber: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={async values => {
            handleSendOTP(values.mobileNumber, shiprocketLoginState).then(response => {
              if (response) {
                setView(screenView.otpInput);
                crashlytics().setUserId(
                  `User Contact Number : ${values.mobileNumber}`,
                );
              }
            })
              .catch(error => {
                if (error === 429) {
                  setShowSuccessModal(true);
                  setTimeout(() => {
                    setShowSuccessModal(false);
                  }, 4000);
                }
              });
          }}
        >
          {({
            isValid,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <>
              <View
                style={[
                  commonStyles.bgWhite,
                  commonStyles.pad16,
                  commonStyles.pt8,
                  { borderRadius: 8 },
                ]}
              >
                <View
                  style={[
                    commonStyles.flexRow,
                    commonStyles.justifyCenter,
                    { position: 'absolute', top: -80, left: 0, right: 0 },
                  ]}
                >
                  <WhiteLogo />
                </View>
                <View>
                  <Text style={[commonStyles.Heading18, commonStyles.mb8]}>
                    Verify your Phone Number
                  </Text>
                  <Text style={[commonStyles.pTag, commonStyles.mb16]}>
                    To shop for Clean, Plant based products,
                    get FREE Diet Plan, Track your orders, and avail Best Offers!
                  </Text>
                </View>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    ref={inputRef}
                    onChangeText={text => {
                      setFieldValue(
                        'mobileNumber',
                        text.trim().replace(/^0+/, ''),
                      );
                    }}
                    onBlur={() => {
                      handleBlur('mobileNumber');
                      setFocused(false);
                    }}
                    onFocus={() => {
                      setFocused(true);
                    }}
                    value={values.mobileNumber}
                    style={[
                      commonStyles.inputWrapDefault,
                      commonStyles.radius2,
                      {
                        fontSize: 14,
                        paddingLeft: 40,
                        color: '#000',
                      },
                      errors.mobileNumber && touched.mobileNumber && !isValid
                        ? { borderColor: '#FF6F00' }
                        : isFocused || values.mobileNumber.length > 0
                          ? { borderColor: '#6BBD58' }
                          : {},
                    ]}
                    placeholder="Mobile Number"
                    // keyboardType="numeric"
                    placeholderTextColor={grayb3}
                    onSubmitEditing={handleSubmit}
                    maxLength={10}
                  />
                  <View style={fullScreenLoginInputStyles.positionFixedLabel}>
                    <Text>+91</Text>
                  </View>
                </View>
                <BaseView AlignLeft style={[commonStyles.fs12]}>
                  {errors.mobileNumber && touched.mobileNumber ? (
                    <ErrorText>*{errors.mobileNumber}</ErrorText>
                  ) : null}
                </BaseView>
                {shiprocketEnabled ?
                  <View style={{
                    paddingTop: 16
                  }}>
                    <OZCheckbox
                      title="Fetch my shipping addresses based on past orders"
                      checked={shiprocketLoginState as boolean}
                      setCheckbox={setShipRocketLoginState}
                      labelContainerStyles={standardLoginInputStyles.consentText}
                    />
                  </View> : null}

                <BaseView style={[commonStyles.mt16]}>
                  <PrimaryButton
                    title="SEND OTP"
                    accentColor={primaryOrange}
                    height={48}
                    onAction={handleSubmit}
                    disabled={!isValid || sendOTPLoading}
                  />
                </BaseView>
                <View style={[commonStyles.mt2]}>
                  <Text
                    style={[
                      commonStyles.fs12,
                      commonStyles.mt8,
                      commonStyles.grayColor,
                      commonStyles.mr4,
                    ]}
                  >
                    By continuing, you agree that you have read and accept our{' '}
                    <Text style={[commonStyles.lightGreenColor]} onPress={() => {
                      setShowPopup(true);
                      setIsPrivacyPopup(false);
                    }}>
                      T&C's
                    </Text> ,{' '}
                    <Text style={[commonStyles.lightGreenColor]} onPress={() => {
                      setShowPopup(true);
                      setIsPrivacyPopup(true);
                    }}>
                      Privacy Policy
                    </Text>
                    {shiprocketEnabled ?
                      <>
                        {' '}and Shiprocket’s <Text style={[commonStyles.lightGreenColor]} onPress={() => {
                          openLink('https://www.shiprocket.in/privacy-policy/my-shiprocket/')
                        }}>
                          T&C's
                        </Text>, <Text style={[commonStyles.lightGreenColor]} onPress={() => {
                          openLink('https://checkout.shiprocket.in/terms-conditions/')
                        }}>
                          Privacy Policy
                        </Text>
                      </>
                      : null}
                  </Text>
                </View>
                {shiprocketEnabled ?
                  <View style={fullScreenLoginInputStyles.footerTextContainer} >
                    <Text style={standardLoginInputStyles.captionText}>Powered by</Text>
                    <SvgUri style={{ width: '100%' }} uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/shiprocket_logo_1.svg?v=1729484034'} />
                  </View> : null}
              </View>
            </>
          )}
        </Formik>
        <AppModal
          animateFrom="center"
          modalVisible={maxLoginAttemptsErr}
          component={() => (
            <OfferAppliedModal
              text1="Oh snap!"
              text2="We've received too many login requests from you and would be unable to log you in. If this wasn't you or if you require assistance logging in, please contact us on community@oziva.in"
              isLoginFailed={true}
              setShowSuccessModal={() => authDispatch(setLoginMaxLimitErr(false))}
            />
          )}
          style={{ borderRadius: 10 }}
          onBackButtonPress={() => {
            authDispatch(setLoginMaxLimitErr(false))
          }}
        />

        <AppModal
          animateFrom="center"
          modalVisible={showPopup}
          component={() => <PolicyContentPopup setShowPopup={setShowPopup} policyResponse={policyResponse} />}
          style={{ borderRadius: 10, margin: -10 }}
          onBackButtonPress={() => {
            setShowPopup(false);
          }}
        />
      </View>
    </>
  );
};
export default Login;
