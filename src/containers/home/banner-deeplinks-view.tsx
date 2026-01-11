import crashlytics from '@react-native-firebase/crashlytics';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import WebView from 'react-native-webview';

const BannerDeepLinksView = ({
  route,
}: {
  route: any;
}) => {
  const params = useLocalSearchParams<any>();
  return <WebView androidHardwareAccelerationDisabled source={params} onError={() => {
    crashlytics().log('Webview error in home banner deeplink component');
  }} />
}

export default BannerDeepLinksView;
