import crashlytics from '@react-native-firebase/crashlytics';
import React from 'react';
import WebView from 'react-native-webview';

const BannerDeepLinksView = ({
  route,
}: {
  route: any;
}) => <WebView androidHardwareAccelerationDisabled source={route.params} onError={() => {
  crashlytics().log('Webview error in home banner deeplink component');
}} />;

export default BannerDeepLinksView;
