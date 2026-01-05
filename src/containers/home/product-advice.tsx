import React from 'react';
import WebView from 'react-native-webview';
import { BaseView } from 'components/base/view';

import Loader from '@components/elements/loader/loader';
import { webviewStyles } from 'containers/profile/styles/webview';
import { PLATFORM_HEADERS } from 'utils/constants';
import crashlytics from '@react-native-firebase/crashlytics';

const webViewSource = {
  uri: `https://oziva.typeform.com/to/zYRL7MRc?typeform-source=${PLATFORM_HEADERS.channel}`,
};

const ProductAdvice = () => (
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
      crashlytics().log('Webview error in home product advice component');
    }}
  />
);

export default ProductAdvice;
