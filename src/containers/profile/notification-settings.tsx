import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { AxiosError } from 'axios';

import { loginSuccessful, setLoginModal } from '@actions/modals';
import { Box, Hr } from '@components/base/foundation';
import SwitchListItem from '@components/elements/lists/switch-list-item';
import Loader from '@components/elements/loader/loader';
import { FullPageErrorFallback } from '@components/shared/error';
import { useModalsDispatch, useModalsState } from '@context/modals';
import { NotificationSettings } from '@models/user';
import { getNotificationService, postNotificationService } from 'services/user';
import useLogin from 'hooks/login';

const NotificationSettingsContainer = ({ navigation }) => {
  const modalsDispatch = useModalsDispatch();
  const { isLoginSuccessful } = useModalsState();
  const [notificationData, setNotificationData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  navigation.addListener('focus', () => {
    getNotification();
  });
  const { handleLogout } = useLogin();

  const postNotification = (newData) => {
    postNotificationService(newData).then(response => {
      getNotification();
    }).catch(err => {
      console.log("Error : ", err);
      if(error?.response?.status === 401){
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    })
  }
  const toggleNotification = useCallback(
    (key: keyof NotificationSettings['notification']) => {
      const previousValue = notificationData?.[key];
      const newData = {
        ...notificationData,
        [key]: !previousValue,
      };
      postNotification({notification: newData});
    },
    [notificationData],
  );

  const getNotification = () => {
    setLoading(true);
    getNotificationService().then(response => {
      setNotificationData(response.notification);
      setLoading(false);
    }).catch(error => {
      console.log("Error while getting notification : ", error);
      setLoading(false);
      setError(error);
      if(error?.response?.status === 401){
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    })
  }

  useEffect(() => {
    if (isLoginSuccessful) {
      getNotification();
    }
  }, [isLoginSuccessful]);

  const retry = login => {
    if (login) {
      modalsDispatch(setLoginModal(true));
    } else {
      getNotification();
    }
  };

  if (!notificationData && loading) {
    return <Loader />;
  }
  if (error && !isLoginSuccessful) {
    const login = error?.message.includes('401');
    return (
      <FullPageErrorFallback
        onRetry={() => retry(login)}
        title={login ? 'Login' : 'Retry'}
        error={error as AxiosError}
        noMessage={login}
      />
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getNotification} />
      }
      style={{ flex: 1, }}
    >
      <Box backgroundColor="levelOneBg" style={{ padding: 10, rowGap: 10 }}>
        <SwitchListItem
          title="Order Status"
          subTitle="Latest update on your orders"
          value={notificationData?.orderStatus}
          onValueChange={() => toggleNotification('orderStatus')}
        />
        <Hr />
        <SwitchListItem
          title="Recommendations by OZiva"
          subTitle="Get recommendations on blog and TV tailored for you."
          value={notificationData?.recommendationsByOziva}
          onValueChange={() => toggleNotification('recommendationsByOziva')}
        />
        <Hr />
        <SwitchListItem
          title="New Offers"
          subTitle="Find out when lighting deals happen."
          value={notificationData?.newOffers}
          onValueChange={() => toggleNotification('newOffers')}
        />
        <Hr />
        <SwitchListItem
          title="OZiva Community"
          subTitle="Receive updates from customer Q&A, Reviews. Follow up and more"
          value={notificationData?.ozivaCommunity}
          onValueChange={() => toggleNotification('ozivaCommunity')}
        />
      </Box>
    </ScrollView>
  );
};

export default NotificationSettingsContainer;
