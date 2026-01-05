import React from 'react';
import WebView from 'react-native-webview';
import { BaseView } from 'components/base/view';
import Loader from 'components/elements/loader/loader';

import { webviewStyles } from './styles/webview';
import crashlytics from '@react-native-firebase/crashlytics';

const webViewSource = {
  uri: 'https://www.oziva.in/pages/privacy-policy?embedded=true',
};

const Privacy = () => (
  <WebView
    androidHardwareAccelerationDisabled
    source={webViewSource}
    renderLoading={() => (
      <BaseView style={webviewStyles.loadingIndicator}>
        <Loader />
      </BaseView>
    )}
    startInLoadingState
    onError={() => {
      crashlytics().log('Webview error in profile privacy component');
    }}
  />
);

export default Privacy;
