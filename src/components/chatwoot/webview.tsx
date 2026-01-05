import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import {
  generateScripts,
  getMessage,
  isJsonString,
  storeHelper,
} from 'utils/chatwoot';
import { chatWootWebsiteToken, width } from 'utils/constants';
import * as Progress from 'react-native-progress';
import { initiateWidgetOpen } from 'services/chatwoot';
import crashlytics from '@react-native-firebase/crashlytics';
import { ChatWootUser } from 'models/prime';
import { useNavigation } from '@react-navigation/native'
interface WebViewProps {
  websiteToken: string;
  baseUrl: string;
  cwCookie: string;
  user: ChatWootUser;
  locale: string;
  customAttributes: Record<string, unknown>;
  closeModal: React.Dispatch<boolean>;
  screenName?: string;
}

const ChatWootWebviewComponent = (props: WebViewProps) => {
  const {
    baseUrl,
    cwCookie,
    websiteToken,
    locale,
    user,
    customAttributes,
    closeModal,
    screenName
  } = props;
  const [chatwootCookie, setChatWootCookie] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [eventTriggered, setEventTriggered] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (chatwootCookie != '') {
      let requestModel = {
        name: 'webwidget.triggered',
        event_info: {
          initiated_at: {
            timestamp: new Date().toString(),
          },
          referer: props.customAttributes.initiated_from,
        },
      };
      triggerEvent(chatWootWebsiteToken, chatwootCookie, requestModel);
    }
  }, [chatwootCookie]);
  const triggerEvent = async (
    chatWootWebsiteToken,
    chatwootCookie,
    requestModel,
  ) => {
    if (!eventTriggered) {
      setEventTriggered(true);
      await initiateWidgetOpen(
        chatWootWebsiteToken,
        chatwootCookie,
        requestModel,
      );
    }
  };
  let widgetUrl = `${baseUrl}/widget?website_token=${websiteToken}&locale=en`;

  if (cwCookie) {
    widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
  }
  const injectedJavaScript = generateScripts({
    user,
    locale,
    customAttributes,
  });

  return (
    <>
      {!isLoaded ? (
        <Progress.Bar
          width={null}
          progress={progress}
          color="#6bbd58"
          borderWidth={0}
          borderRadius={0}
        />
      ) : null}
      <WebView
        source={{
          uri: widgetUrl,
        }}
        onError={() => {
          crashlytics().log('Webview error in chatwoot component');
        }}
        onMessage={event => {
          const { data } = event.nativeEvent;
          const message = getMessage(data);
          if (isJsonString(message)) {
            const parsedMessage = JSON.parse(message);
            const { event: eventType, type } = parsedMessage;
            if (eventType === 'loaded') {
              const {
                config: { authToken },
              } = parsedMessage;
              if (!chatwootCookie) {
                setChatWootCookie(authToken);
                storeHelper.storeCookie(authToken);
              }
            }
            if (type === 'close-widget') {
              closeModal(false);
              if(screenName === 'OrderConfirmationScreen'){
                navigation && navigation.navigate('OrderConfirmationScreen');
              }else navigation.canGoBack()
            }
          }
        }}
        scalesPageToFit
        useWebKit
        sharedCookiesEnabled
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
        scrollEnabled
        style={{ flex: 1, width, height: '100%' }}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
        onLoadEnd={() => setLoaded(true)}
      />
    </>
  );
};

export default ChatWootWebviewComponent;
