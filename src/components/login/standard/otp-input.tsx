import React from 'react';
import { Text, View } from 'react-native';
import { Box } from 'components/base/foundation';
import { BaseView } from 'components/base/view';
import ErrorText from 'components/form/validation-error-text';
import { useAuthState } from 'context/auth';
import { useShopState } from 'context/shop';

import OtpVerification, {
  expiredOTPErrorMessage,
  invalidOTPErrorMessage,
} from '../common/otp-input';
import { CustomText } from '../../../../AndroidFontFix';
import ResendOtpHelper from '../common/resend-helper';
import { screenView } from './login-modal';
import { otpModalstyles } from 'styles/login';

interface IProps {
  setView: (view: screenView) => void;
  navigation: any;
}
const OTPModal = (props: IProps) => {
  const { setView } = props;
  const { setOTPError: OTPErrorMessage, shipRocketLogin } = useAuthState();

  const { userPhoneNumber } = useShopState();

  return (
    <>
      <View style={otpModalstyles.modalView}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ lineHeight: 20, fontFamily: 'Roboto-Regular' }}>
            Please enter the {shipRocketLogin ? 'six' : 'four'} digit code sent on{' '}
            <Text style={{ fontFamily: 'Roboto-Medium' }}>
              +91 {userPhoneNumber}
            </Text>
          </Text>
        </View>
        <OtpVerification navigation={props.navigation}/>

        <Box>
          {OTPErrorMessage === invalidOTPErrorMessage ? (
            <ErrorText>Invalid OTP. Please check and enter again.</ErrorText>
          ) : null}
        </Box>
        <BaseView row style={{ marginTop: 20 }}>
          {OTPErrorMessage !== expiredOTPErrorMessage ? (
            <CustomText
              style={{ fontSize: 14, fontWeight: 'bold', paddingRight: 5 }}
            >
              Didn&apos;t receive OTP?
            </CustomText>
          ) : (
            <CustomText
              style={{ fontSize: 14, fontWeight: 'bold', paddingRight: 5 }}
            >
              OTP has expired. Please try with a new one.
            </CustomText>
          )}
          <ResendOtpHelper setView={setView} />
        </BaseView>
      </View>
    </>
  );
};
export default OTPModal;
