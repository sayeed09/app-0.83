import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import OZModal from 'components/modal';
import { storeHelper } from 'utils/chatwoot';

import ChatWootWebviewComponent from './webview';
import BackIcon from 'components/styled/header/back-icon';
import { useModalsDispatch } from 'context/modals';
import { setChatWootModal } from 'actions/modals';

interface Props {
  isModalVisible: boolean;
  websiteToken: string;
  baseUrl: string;
  user: {
    avatar_url: string;
    email: string;
    identifier_hash: string;
  };
  locale: string;
  customAttributes?: Record<string, unknown>;
  closeModal: React.Dispatch<boolean>;
  isConsult?: boolean;
  navigation: any;
  screenName?: string;
}

const ChatWootWidget = (props: Props): React.ReactElement => {

  const modalsDispatch = useModalsDispatch();
  
  const [cwCookie, setCookie] = useState('');
  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value ?? '');
    }
    fetchData();
  }, []);
  const {
    isModalVisible,
    baseUrl,
    websiteToken,
    user,
    locale,
    customAttributes,
    closeModal,
    isConsult,
    navigation
  } = props;

  const handleChatClose = () => {
    if (isConsult) {
      modalsDispatch(setChatWootModal(false))
      navigation.goBack();
    } else {
      closeModal(true);
    }
  }
  return (
    <OZModal
      keyboardType={'keyboardAware'}
      visible={isModalVisible}
      onRequestClose={() => handleChatClose()}
      handleChatClose={handleChatClose}
      transparent
      animationType="fade"
      backdropContainer={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      contentContainerStyles={{
        height: '100%',
        position: 'relative',
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 18,
            paddingVertical: 6,
          }}
        >
          <BackIcon title="Chat" onPress={() => handleChatClose()} navigation={navigation} />
        </View>
        <ChatWootWebviewComponent
          websiteToken={websiteToken}
          cwCookie={cwCookie}
          user={user}
          baseUrl={baseUrl}
          locale={locale}
          customAttributes={customAttributes}
          closeModal={handleChatClose}
          screenName={props.screenName}
        />
      </SafeAreaView>
    </OZModal>
  );
};

export default ChatWootWidget;
