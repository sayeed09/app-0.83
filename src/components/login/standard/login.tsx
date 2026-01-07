import PrimaryButton from 'components/elements/button/primary-Button';
import { BaseView } from 'components/base/view';
import ErrorText from 'components/form/validation-error-text';
import { ctaGreen, grayb3, primaryOrange } from 'components/styles/colors';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, Linking } from 'react-native';
import { commonStyles } from 'styles/common';
import { width } from 'utils/constants';
import * as Yup from 'yup';
import useLogin from 'hooks/login';
import { screenView } from './login-modal';
import { standardLoginInputStyles } from 'styles/login';
import AppModal from 'components/app-modal';
import PolicyContentPopup from '../fullscreen/privacy-content-popup';
import { policyAndTermsService } from 'services/login';
import OfferAppliedModal from 'components/cart/offer-applied-modal';
import { PrivacyAndTerms } from 'models/auth';
import OZCheckbox from 'components/base/checkbox/oz-checkbox';
import { SvgUri } from 'react-native-svg';
import { useAuthState, useAuthDispatch } from 'context/auth';
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
  const { setView } = props;
  const { handleSendOTP, sendOTPLoading } = useLogin();
  const [showPopup, setShowPopup] = useState(false);
  const [isPrivacyPopup, setIsPrivacyPopup] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { maxLoginAttemptsErr, shiprocketEnabled } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [shiprocketLoginState, setShipRocketLoginState] = useState(shiprocketEnabled ? true : false);

  let inputRef = useRef<TextInput>();

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
      <View style={standardLoginInputStyles.modalView}>
        <Formik
          initialValues={{
            mobileNumber: '',
          }}
          validationSchema={ValidationSchema}
          onSubmit={async values => {
            handleSendOTP(values.mobileNumber, shiprocketLoginState).then(response => {
              response ? setView(screenView.otpInput) : null;
            })
              .catch(error => {
                if (error === 429) {
                  setShowSuccessModal && setShowSuccessModal(true);
                  setTimeout(() => {
                    setShowSuccessModal && setShowSuccessModal(false);
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
                style={{
                  width,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                }}
              >
                <TextInput
                  onChangeText={text => {
                    setFieldValue(
                      'mobileNumber',
                      text.trim().replace(/^0+/, ''),
                    );
                  }}
                  ref={(input: any) => {
                    inputRef = input;
                  }}
                  onBlur={handleBlur('mobileNumber')}
                  value={values.mobileNumber}
                  style={[commonStyles.inputWrapDefault, {borderRadius: 8,}]}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  placeholderTextColor={grayb3}
                  autoFocus
                  maxLength={10}
                />
                <View style={standardLoginInputStyles.positionFixedLabel}>
                  <Text>+91</Text>
                </View>
              </View>
              <BaseView AlignLeft style={{ paddingHorizontal: 40 }}>
                {errors.mobileNumber && touched.mobileNumber ? (
                  <ErrorText>*{errors.mobileNumber}</ErrorText>
                ) : null}
              </BaseView>
              {shiprocketEnabled ?
                <View style={{
                  width,
                  marginHorizontal: 20,
                  paddingHorizontal: 20,
                  paddingTop: 16,
                }}>
                  <OZCheckbox
                    title="Fetch my shipping addresses based on past orders"
                    checked={shiprocketLoginState as boolean}
                    setCheckbox={setShipRocketLoginState}
                    labelContainerStyles={standardLoginInputStyles.consentText}
                  />
                </View> : null}

              <BaseView
                style={{
                  marginLeft: 40,
                  marginTop: 20,
                }}
              >
                <PrimaryButton
                  title="Send OTP"
                  accentColor={ctaGreen}
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
                    commonStyles.ml40,
                    commonStyles.mr4,
                  ]}
                >
                  By continuing, you agree that you have read and accept our{" "}
                  <Text
                    style={commonStyles.lightGreenColor}
                    onPress={() => {
                      setShowPopup(true);
                      setIsPrivacyPopup(false);
                    }}
                  >
                    T&C's
                  </Text>
                  ,{" "}
                  <Text
                    style={commonStyles.lightGreenColor}
                    onPress={() => {
                      setShowPopup(true);
                      setIsPrivacyPopup(true);
                    }}
                  >
                    Privacy Policy
                  </Text>
                  {shiprocketEnabled && (
                    <>
                      {" "}and Shiprocket’s{" "}
                      <Text
                        style={commonStyles.lightGreenColor}
                        onPress={() => {
                          openLink(
                            "https://www.shiprocket.in/privacy-policy/my-shiprocket/"
                          );
                        }}
                      >
                        T&C's
                      </Text>
                      ,{" "}
                      <Text
                        style={commonStyles.lightGreenColor}
                        onPress={() => {
                          openLink(
                            "https://checkout.shiprocket.in/terms-conditions/"
                          );
                        }}
                      >
                        Privacy Policy
                      </Text>
                    </>
                  )}
                </Text>
              </View>
              {shiprocketEnabled ?
                <View style={standardLoginInputStyles.footerTextContainer}>
                  <Text style={standardLoginInputStyles.captionText}>Powered by</Text>
                  <SvgUri style={{ width: '100%' }} uri={'https://cdn.shopify.com/s/files/1/2393/2199/files/shiprocket_logo_1.svg?v=1729484034'} />
                </View> : null}
              <AppModal
                animateFrom="center"
                modalVisible={showPopup}
                component={() => <PolicyContentPopup setShowPopup={setShowPopup} policyResponse={policyResponse} />}
                style={{ borderRadius: 10, margin: -10 }}
                onBackButtonPress={() => {
                  setShowPopup(false);
                }}
              />
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
            </>
          )}
        </Formik>
      </View>
    </>
  );
};
export default Login;
