import React from 'react';
import WebView from 'react-native-webview';
import { BaseView } from 'components/base/view';
import Loader from 'components/elements/loader/loader';

import { webviewStyles } from './styles/webview';
import crashlytics from '@react-native-firebase/crashlytics';

const webViewSource = {
  uri: 'https://help.oziva.in/hc/en-us?view=webview',
};

const HelpDesk = ({ navigation, route }) => (
  <WebView
    androidHardwareAccelerationDisabled
    source={webViewSource}
    renderLoading={() => (
      <BaseView style={webviewStyles.loadingIndicator}>
        <Loader />
      </BaseView>
    )}
    startInLoadingState
    javaScriptEnabled
    onMessage={event => {
      const { data } = event.nativeEvent;
      if (data.indexOf('order-history') > -1) {
        navigation.navigate('Orders');
      }
    }}
    onError={() => {
      crashlytics().log('Webview error in profile help desk component');
    }}
  />
);

export default HelpDesk;
