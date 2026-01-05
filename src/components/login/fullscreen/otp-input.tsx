import WhiteLogo from 'assets/images/icons/white-logo';
import { BaseView } from 'components/base/view';
import ErrorText from 'components/form/validation-error-text';
import { useShopState } from 'context/shop';
import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from 'styles/common';
import OtpVerification, {
  expiredOTPErrorMessage,
  invalidOTPErrorMessage,
} from '../common/otp-input';
import { Box } from 'components/base/foundation';
import { useAuthState } from 'context/auth';
import ResendOtpHelper from '../common/resend-helper';
import { CustomText } from '../../../../AndroidFontFix';
import { screenView } from '../standard/login-modal';
import { fullscreenOtpInputstyles } from 'styles/login';

interface IProps {
  setView: (view: screenView) => void;
}
const OTPInput = (props: IProps) => {
  const { setOTPError: OTPErrorMessage, shipRocketLogin } = useAuthState();
  const { setView } = props;
  const { userPhoneNumber } = useShopState();
  return (
    <>
      <View style={fullscreenOtpInputstyles.modalView}>
        <View
          style={[
            commonStyles.bgWhite,
            commonStyles.pad16,
            commonStyles.pt8,
            { borderRadius: 8, maxWidth: '100%' },
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
              OTP Verification
            </Text>
            <Text style={[commonStyles.pTag, commonStyles.mb16]}>
              Please enter the {shipRocketLogin ? 'six' : 'four'} digit code sent on{' '}
              <Text style={{ fontFamily: 'Roboto-Medium' }}>
                +91 {userPhoneNumber}
              </Text>
            </Text>
          </View>
          <OtpVerification showSuccessMessage={true} />

          <Box>
            {OTPErrorMessage === invalidOTPErrorMessage ? (
              <ErrorText>Invalid OTP. Please check and enter again.</ErrorText>
            ) : null}
          </Box>
          <BaseView
            row
            style={[commonStyles.mt16, { justifyContent: 'space-between' }]}
          >
            {OTPErrorMessage !== expiredOTPErrorMessage ? (
              <CustomText style={[commonStyles.fs14, commonStyles.fw500]}>
                Didn&apos;t receive OTP?
              </CustomText>
            ) : (
              <CustomText style={[commonStyles.fs14, commonStyles.fw500]}>
                OTP has expired. Please try with a new one.
              </CustomText>
            )}
            <View style={[commonStyles.flexRow]}>
              <ResendOtpHelper setView={setView} />
            </View>
          </BaseView>
        </View>
      </View>
    </>
  );
};
export default OTPInput;
