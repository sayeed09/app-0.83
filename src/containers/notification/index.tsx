import FastImage from '@d11/react-native-fast-image';
import { useLinkTo } from '@react-navigation/native';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import React from 'react';
import { View } from 'react-native';

import { StyledButton } from '@components/base/button/styled';
import { ScrollView, Text } from '@components/base/foundation';
import SecondaryButton from '@components/elements/button/secondary-button';
import { ViewWrapper } from '@components/styled/common';
import BackIcon from '@components/styled/header/back-icon';
import { gray7E } from '@components/styles/colors';
import { useNotificationState } from '@context/notifications';
import { width } from '@utils/constants';
import { BANNER_ONE } from '@utils/images';
import { router } from 'expo-router';

const Notifications = ({ navigation }) => {
  const { recentNotifications } = useNotificationState();
  navigation.setOptions({
    headerLeft: () => (
      <>
        <BackIcon navigation={navigation} title="Notification" />
      </>
    ),
  });
  const linkTo = useLinkTo();
  const sortResults = results =>
    results.sort((a, b) => b.recievedAt - a.recievedAt);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {!isEmpty(recentNotifications) ? (
          sortResults(recentNotifications)?.map(res => (
            <StyledButton
              key={res?.MOE_NOTIFICATION_ID}
              onPress={() => {
                if (res?.url) {
                  if (res?.url.includes('http')) {
                    // Linking.openURL(url);
                    // navigation.navigate('BannerDeepLinksView', {
                    //   uri: res?.url,
                    //   title: res?.title || '',
                    // });
                    router.push({
                      pathname: '/BannerDeepLinksView',
                      params: {
                        uri: res?.url,
                        title: res?.title || '',
                      },
                    });
                  } else {
                    const str = res?.url.split('//');
                    linkTo(`/${str[str.length - 1]}`);
                  }
                }
              }}
            >
              <View style={{ paddingHorizontal: 15 }}>
                <ViewWrapper
                  style={{
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#D9D9D9',
                    maxWidth: '100%',
                    justifycontent: 'space-between',
                  }}
                >
                  <FastImage
                    source={res?.image ? { uri: res?.image } : BANNER_ONE}
                    style={{ width: 43, height: 43 }}
                  />
                  <View
                    style={{ flexDirection: 'column', width: width * 0.75 }}
                  >
                    <Text
                      style={{
                        flexWrap: 'wrap',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 12,
                      }}
                    >
                      {res?.gcm_title}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          flexWrap: 'wrap',
                          color: gray7E,
                          fontFamily: 'Roboto-Regular',
                          fontSize: 10,
                        }}
                      >
                        {dayjs(res?.recievedAt).format('DD MMM YYYY')}
                      </Text>
                      {res?.ButtonTitle && (
                        <SecondaryButton
                          title={res?.ButtonTitle}
                          onAction={() => { }}
                          textColor="#6BBD58"
                          accentColor="transparent"
                          style={{ marginBottom: -100 }}
                        />
                      )}
                    </View>
                  </View>
                </ViewWrapper>
              </View>
            </StyledButton>
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>No Notifications Available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Notifications;
