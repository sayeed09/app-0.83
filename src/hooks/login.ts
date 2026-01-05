import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthenticated, setLoginMaxLimitErr, setShipRocketLogin, setShipRocketOtpToken, setUser } from 'actions/auth';
import { setDiscountCode } from 'actions/checkout';
import { loginSuccessful, setLoginModal } from 'actions/modals';
import { setUserPhoneNumber } from 'actions/shop';
import { useAuthDispatch, useAuthState } from 'context/auth';
import { useCheckoutDispatch } from 'context/checkout';
import { useModalsDispatch } from 'context/modals';
import { useShopDispatch } from 'context/shop';
import { LoginData } from 'models/auth';
import React, { useState } from 'react';
import { localStorageUserKey } from 'services/auth';
import { generateOtp } from 'services/login';
import { trackMoEngageAppEvent } from 'utils/common';

const useLogin = () => {
  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  const shopDispatch = useShopDispatch();
  const modalsDispatch = useModalsDispatch();
  const authDispatch = useAuthDispatch();

  const checkoutDispatch = useCheckoutDispatch();
  const handleSendOTP = async (mobileNumber: string, consentForAddressUse?: boolean) => {
    return new Promise(async (resolve, reject) => {
      try {
        shopDispatch(setUserPhoneNumber(mobileNumber));
        authDispatch(setShipRocketLogin(consentForAddressUse as boolean))
        setSendOTPLoading(true);
        const LoginData: LoginData = {
          phone: mobileNumber,
          source: "order_management",
          type: "sms",
          consentForAddressUse: consentForAddressUse
        }
        const response = await generateOtp(LoginData);
        if (response.status === '200') {
          setSendOTPLoading(false);
          trackMoEngageAppEvent({
            event: `send_otp_clicked_app`,
            values: [{ eventAttribute: 'mobile', value: mobileNumber }],
          });
          response.shiprocketOtpToken && authDispatch(setShipRocketOtpToken(response.shiprocketOtpToken as string));

          resolve(true);
        }
      } catch (error: any) {
        setSendOTPLoading(false);
        if (error.response.status === 429) {
          authDispatch(setLoginMaxLimitErr(true))
          reject(429);
        } else {
          reject(null);
        }
      }
    });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(localStorageUserKey);
    authDispatch(setAuthenticated(false));
    modalsDispatch(loginSuccessful(false));
    modalsDispatch(setLoginModal(false));
    authDispatch(setUser(null));
    checkoutDispatch(setDiscountCode({ code: '' }));
  }
  return { handleSendOTP, sendOTPLoading, handleLogout };
};

export default useLogin;
