import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import { primaryOrange } from 'components/styles/colors';
import { useShopState } from 'context/shop';
import { commonStyles } from 'styles/common';
import WhiteLogo from 'assets/images/icons/white-logo';
import { screenView } from '../standard/login-modal';
import useLogin from 'hooks/login';
import { fullScreenResendOtpStyles } from 'styles/login';

interface IProps {
  setView: (view: screenView) => void;
}
const ResendOTP = (props: IProps) => {
  const { userPhoneNumber } = useShopState();
  const [checked, setChecked] = useState('resend');
  const { setView } = props;
  const { handleSendOTP, sendOTPLoading } = useLogin();

  return (
    <>
      <View style={fullScreenResendOtpStyles.modalView}>
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
            <Text style={[commonStyles.Heading18, commonStyles.mb16]}>
              OTP Verification
            </Text>
          </View>
          <BaseView
            AlignLeft
            style={fullScreenResendOtpStyles.radioContainerStyle}
          >
            <Pressable
              onPress={() => {
                setChecked('resend');
              }}
            >
              <BaseView row>
                <RadioAction checked={checked === 'resend'}>
                  <RadioCheck checked={checked === 'resend'} />
                </RadioAction>
                <Text style={{ paddingLeft: 10 }}>
                  Resend OTP on {userPhoneNumber}
                </Text>
              </BaseView>
            </Pressable>
          </BaseView>

          <BaseView
            AlignLeft
            style={fullScreenResendOtpStyles.radioContainerStyle}
          >
            <Pressable
              onPress={() => {
                setView(screenView.loginInput);
              }}
            >
              <BaseView row>
                <RadioAction checked={checked === 'change'}>
                  <RadioCheck checked={checked === 'change'} />
                </RadioAction>
                <Text style={{ paddingLeft: 10 }}>
                  Login via a different phone number
                </Text>
              </BaseView>
            </Pressable>
          </BaseView>

          <BaseView
            style={{
              marginTop: 20,
            }}
          >
            <PrimaryButton
              title="PROCEED"
              accentColor={primaryOrange}
              height={48}
              onAction={async () => {
                handleSendOTP(userPhoneNumber).then(response => {
                  if (response) setView(screenView.otpInput);
                });
              }}
            />
          </BaseView>
        </View>
      </View>
    </>
  );
};
export default ResendOTP;
