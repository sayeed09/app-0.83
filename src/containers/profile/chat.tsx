import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import { AxiosError } from 'axios';

import { loginSuccessful, setLoginModal } from '@actions/modals';
import Loader from '@components/elements/loader/loader';
import { FullPageErrorFallback } from '@components/shared/error';
import { useModalsDispatch, useModalsState } from '@context/modals';
import { UserProfileResponseModel } from 'models/auth';
import { getUserProfileDataService } from 'services/user';
import useLogin from 'hooks/login';
import crashlytics from '@react-native-firebase/crashlytics';

const ChatContainer = ({
  route,
  navigation
}) => {
  const modalsDispatch = useModalsDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [userProfileData, setUserProfileData] = useState<UserProfileResponseModel>();

  const { loginModalVisbility, isLoginSuccessful } = useModalsState();
  const { handleLogout } = useLogin();

  const getUserProfile = () => {
    setLoading(true);
    getUserProfileDataService()
      .then((data: UserProfileResponseModel) => {
        setUserProfileData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        if (error?.response?.status === 401){
          handleLogout();
          navigation.navigate('CartScreen');
        }
      });
  }

  useEffect(() => {
    if (isLoginSuccessful && error) {
      getUserProfile();
      Toast.show({
        text1: 'Login Successful',
        position: 'bottom',
        bottomOffset: 80,
        type: 'success',
      });
    }
  }, [isLoginSuccessful, modalsDispatch, error]);

  const login = () => {
    modalsDispatch(setLoginModal(true));
  };

  if (!userProfileData && loading) {
    return <Loader />;
  }

  if (error && !loginModalVisbility && !isLoginSuccessful) {
    return (
      <FullPageErrorFallback
        onRetry={login}
        error={error as AxiosError}
        title="LogIn"
        noMessage
      />
    );
  }
  return (
    <WebView
      androidHardwareAccelerationDisabled
      source={route?.params || { uri: userProfileData!.urls.chatline }}
      onError={() => {
        crashlytics().log('Webview error in profile component');
      }}
    />
  );
};

export default ChatContainer;
