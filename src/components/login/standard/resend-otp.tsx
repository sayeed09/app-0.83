/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import { primaryOrange } from 'components/styles/colors';
import { useShopState } from 'context/shop';
import { screenView } from './login-modal';
import useLogin from 'hooks/login';
import { resendOTPModalstyles } from 'styles/login';

interface IProps {
  setView: (view: screenView) => void;
}

const ResendOTP = (props: IProps) => {
  const { setView } = props;
  const { userPhoneNumber } = useShopState();
  const [checked, setChecked] = useState('resend');
  const { handleSendOTP, sendOTPLoading } = useLogin();

  return (
    <>
      <View style={resendOTPModalstyles.modalView}>
        <BaseView AlignLeft style={resendOTPModalstyles.radioContainerStyle}>
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

        <BaseView AlignLeft style={resendOTPModalstyles.radioContainerStyle}>
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
            disabled={sendOTPLoading}
          />
        </BaseView>
      </View>
    </>
  );
};
export default ResendOTP;
