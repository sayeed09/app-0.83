import React from 'react';
import WebView from 'react-native-webview';
import crashlytics from '@react-native-firebase/crashlytics';

const webViewSource = {
  uri: 'https://www.oziva.in/pages/oziva-behtar-vikas-program?embedded=true',
};

const PurposeWebView = () => (
  <WebView
    androidHardwareAccelerationDisabled
    source={webViewSource}
    startInLoadingState
    onError={() => {
      crashlytics().log('Webview error in purpose component');
    }}
  />
);

export default PurposeWebView;
