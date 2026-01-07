import React, { useState } from 'react';
import { setLoginModal } from 'actions/modals';
import OZModal from 'components/modal';
import { useModalsDispatch, useModalsState } from 'context/modals';
import Login from './login';
import OTPModal from './otp-input';
import ResendOTP from './resend-otp';
import { useAuthDispatch } from 'context/auth';
import { setRedirectToCheckout } from 'actions/auth';

export enum screenView {
  loginInput = 1,
  otpInput,
  resendOtp,
}
const LoginModal = ({navigation}): React.ReactElement => {
  const { loginModalVisbility } = useModalsState();
  const modalsDispatch = useModalsDispatch();
  const authDispatch = useAuthDispatch()
  const [view, setView] = useState(screenView.loginInput);
  const renderView = () => {
    switch (view) {
      case screenView.loginInput:
        return <Login setView={setView} />;
      case screenView.otpInput:
        return <OTPModal setView={setView} navigation={navigation}/>;
      case screenView.resendOtp:
        return <ResendOTP setView={setView} />;
    }
  };
  const onModalClose = () => {
    modalsDispatch(setLoginModal(false));
    setView(screenView.loginInput);
  };
  const getTitle = () => {
    switch (view) {
      case screenView.loginInput:
        return 'Verify your mobile number';
      case screenView.otpInput:
        return 'OTP Verification';
      case screenView.resendOtp:
        return 'Verify your mobile number';
      default:
        return 'Verify your mobile number';
    }
  };
  return (
    <>
      <OZModal
        visible={Boolean(loginModalVisbility)}
        onRequestClose={() => {
          onModalClose();
          authDispatch(setRedirectToCheckout(false));
        }}
        setModalVisible={() => {
          onModalClose();
          authDispatch(setRedirectToCheckout(false));
        }}
        title={getTitle()}
        transparent
        animationType="fade"
        contentContainerStyles={{ height: 'auto' }}
      >
        {renderView()}
      </OZModal>

    </>
  );
};

export default LoginModal;
