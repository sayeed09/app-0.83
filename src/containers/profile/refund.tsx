import React from 'react';
import WebView from 'react-native-webview';
import { BaseView } from 'components/base/view';
import Loader from 'components/elements/loader/loader';
import crashlytics from '@react-native-firebase/crashlytics';

import { webviewStyles } from './styles/webview';

const webViewSource = {
  uri: 'https://www.oziva.in/pages/cancellation-refund-policy?embedded=true',
};

const Refund = () => (
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
      crashlytics().log('Webview error in profile refund component');
    }}
  />
);

export default Refund;
