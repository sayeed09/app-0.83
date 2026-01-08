import { trackMoEngageAppEvent } from '@utils/common';
import { setAuthenticated, setShipRocketImportToken, setUser as setUserState } from 'actions/auth';
import {
  loginSuccessful,
  setLoginModal,
  setShowLoginSuccess,
} from 'actions/modals';
import { BaseView } from 'components/base/view';
import PrimaryButton from 'components/elements/button/primary-Button';
import { ctaGreen } from 'components/styles/colors';
import { useAuthDispatch, useAuthState } from 'context/auth';
import { useModalsDispatch } from 'context/modals';
import { useNotificationState } from 'context/notifications';
import { useShopState } from 'context/shop';
import { User } from 'models/user';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, TextInput, View } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';
import { setUser } from 'services/auth';
import { validateOtp } from 'services/login';
import { commonStyles } from 'styles/common';
import { otpInputstyles } from 'styles/login';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// Source code from: https://github.com/goibibo-labs/react-native-otp-login

export const expiredOTPErrorMessage = 'Expired OTP';
export const invalidOTPErrorMessage = 'Invalid OTP';
interface IProps {
  showSuccessMessage?: boolean;
  navigation: any;
}
const OtpVerification = ({ showSuccessMessage, navigation }: IProps) => {
  const isAndroid = Platform.OS === 'android';
  const { userPhoneNumber } = useShopState();
  const { shipRocketLogin, shipRocketOtpToken } = useAuthState();
  const authDispatch = useAuthDispatch();
  const modalsDispatch = useModalsDispatch();
  const [isInvalid, setInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSubmit, setAutoSubmit] = useState(false);

  // const { loginSetter } = props;
  const [otpInputFocusStatus, setOtpInputFocusStatus] = useState<Boolean[]>([]);

  const { trackingTransparency } = useNotificationState();

  const length = shipRocketLogin ? 6 : 4;
  // console.log(otpArray, 'otpArray')
  // TextInput refs to focus programmatically while entering OTP
  const inputRefs = Array.from({ length }, () => useRef<TextInput>(null));

  const otpInputRefs = inputRefs.map((ref, index) => ({
    id: index + 1,
    inputRef: ref,
  }));
  const [otpArray, setOtpArray] = useState<string[]>(() =>
    Array(length).fill("")
  );

  useEffect(() => {
    // docs: https://github.com/faizalshap/react-native-otp-verify

    if (isAndroid) {
      RNOtpVerify.getHash().then(data => { });
      RNOtpVerify.getOtp()
        .then(message1 => {
          RNOtpVerify.addListener(message => otpHandler(message));
        })
        .catch(error => {
          console.log(error.message, 'RNOtpVerify.getOtp, OtpVerification');
        });
    }
    // remove listener on unmount
    return () => {
      if (isAndroid) {
        RNOtpVerify.removeListener();
      }
    };
  }, [isAndroid]);
  useEffect(() => {
    if (otpArray.indexOf('') === -1) {
      setAutoSubmit(false);
      onSubmitButtonPress();
    }
  }, [autoSubmit, otpArray]);

  const otpHandler = message => {
    try {
      if (message) {
        const messageArray = message.split('\n');
        if (messageArray[0]) {
          const otp = messageArray[0].split(' ')[1];
          if (otp.length === length) {
            setOtpArray(otp.split(''));
            otpInputRefs[length - 1].inputRef.current?.focus();
            setAutoSubmit(true);
          }
        }
      }
    } catch (error) {
      console.error(
        error?.message,
        'RNOtpVerify.getOtp - read message, OtpVerification',
      );
    }
  };

  const onSubmitButtonPress = async () => {
    if (isLoading) return;
    const otp = otpArray.join('');
    const otpRequestPayload = {
      OTP: otp,
      phone: userPhoneNumber,
      source: 'order_management',
      type: 'sms',
      consentForAddressUse: shipRocketLogin,
      token: shipRocketLogin ? shipRocketOtpToken : undefined
    };

    trackMoEngageAppEvent({
      event: `verify_otp_clicked_app`,
      values: [
        { eventAttribute: 'mobile', value: userPhoneNumber },
        { eventAttribute: 'otp', value: otp },
      ],
      trackingTransparency,
    });

    try {
      setIsLoading(true);
      setInvalid(false);
      const response = await validateOtp(otpRequestPayload);
      const accessToken = response?.tokens?.accessToken;
      const refreshToken = response?.tokens?.refreshToken;
      if (accessToken && refreshToken) {
        const userToStore: User = {
          authToken: accessToken,
          phone: userPhoneNumber,
          refreshToken: refreshToken,
        };
        response.addressImportToken && authDispatch(setShipRocketImportToken(response.addressImportToken))

        setInvalid(false);
        await setUser(userToStore);
        modalsDispatch(setShowLoginSuccess(false));
        authDispatch(setAuthenticated(true));
        authDispatch(setUserState(userToStore));
        modalsDispatch(loginSuccessful(true));
        if (showSuccessMessage) modalsDispatch(setShowLoginSuccess(true));
        modalsDispatch(setLoginModal(false));
        setIsLoading(false);
      } else {
        setInvalid(true);
        setIsLoading(false);
      }
    } catch (error) {
      setInvalid(true);
      setIsLoading(false);
      console.log('unable to validate');
    }
  };

  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = index => value => {

    if (!value) return;

    // Only digits
    const digits = value.replace(/\D/g, "").split("");
    if (digits.length === 0) return;

    const otpArrayCopy = [...otpArray];
    let i = index;
    digits.forEach(digit => {
      if (i < otpArrayCopy.length) {
        otpArrayCopy[i] = digit;
        i++;
      }
    });

    setOtpArray(otpArrayCopy);
    // Move focus to next empty input
    if (i === otpInputRefs.length) {
      otpInputRefs[otpInputRefs.length - 1].inputRef.current?.focus();
    }
    if (i <= otpInputRefs.length - 1) {
      otpInputRefs[i].inputRef.current?.focus();
    }


    setInvalid(false);
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => ({ nativeEvent: { key: value } }) => {
    if (value === 'Backspace') {
      const otpArrayCopy = [...otpArray];

      if (otpArray[index] === '') {
        // If current box is already empty, move focus to the previous one
        if (index > 0) {
          otpArrayCopy[index - 1] = ''; // clear previous
          setOtpArray(otpArrayCopy);
          otpInputRefs[index - 1].inputRef.current?.focus();
        }
      } else {
        // If current box has a value, just clear it
        otpArrayCopy[index] = '';
        setOtpArray(otpArrayCopy);
      }
      setInvalid(false);
    }
  };
  console.log(otpInputFocusStatus)
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 16,
        }}
      >

        {otpInputRefs.map((otpInputRef, index) => (
          <View
            key={otpInputRef.id}
            style={[
              otpInputstyles.containerStyle,
              isInvalid
                ? { borderColor: '#FF6F00' }
                : otpInputFocusStatus[index] || otpArray[index]
                  ? { borderColor: '#6BBD58' }
                  : { borderColor: '#ccc' },
            ]}
          >
            <TextInput
              placeholder=' '
              value={otpArray[index]}
              onKeyPress={onOtpKeyPress(index)}
              onChangeText={onOtpChange(index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0 ? true : false}
              style={[otpInputstyles.textInputStyle]}
              ref={otpInputRef.inputRef}
              onFocus={() => {
                let inputArray = [...otpInputFocusStatus];
                inputArray[index] = true;
                setOtpInputFocusStatus(inputArray);
              }}
              onBlur={() => {
                const inputArray = [...otpInputFocusStatus];
                inputArray[index] = false;
                setOtpInputFocusStatus(inputArray);
              }}
              onSubmitEditing={onSubmitButtonPress}
            />
          </View>
        ))}
      </View>
      {isInvalid && (
        <Text style={{ color: '#FF6F00' }}>*Please enter correct OTP</Text>
      )}
      <BaseView style={[commonStyles.mt16]}>
        <PrimaryButton
          title={isLoading ? 'VERIFYING...' : 'VERIFY OTP'}
          accentColor={ctaGreen}
          height={48}
          onAction={() => onSubmitButtonPress()}
          disabled={otpArray.indexOf('') !== -1}
        />
      </BaseView>
    </View>
  );
};

export default OtpVerification;
