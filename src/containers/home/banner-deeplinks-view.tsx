import React from 'react';
import WebView from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { AppStackDefinition } from 'routes/definitions';
import crashlytics from '@react-native-firebase/crashlytics';

const BannerDeepLinksView = ({
  route,
}: {
  route: RouteProp<AppStackDefinition, 'BannerDeepLinksView'>;
}) => <WebView androidHardwareAccelerationDisabled source={route.params} onError={() => {
  crashlytics().log('Webview error in home banner deeplink component');
}}/>;

export default BannerDeepLinksView;
