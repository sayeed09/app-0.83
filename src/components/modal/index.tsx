import { BaseView } from 'components/base/view';
import { grayd9 } from 'components/styles/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppState,
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  Pressable,
  StyleProp,
  Text,
  ViewStyle
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonStyles } from 'styles/common';
import { height } from 'utils/constants';

interface Props extends ModalProps {
  keyboardBehaviorProps?: any;
  keyboardType?: 'keyboardAware' | 'default';
  children: any;
  backdropContainer?: StyleProp<ViewStyle>;
  contentContainerStyles?: StyleProp<ViewStyle>;
  headerStyles?: StyleProp<ViewStyle>;
  title?: string;
  setModalVisible?: React.Dispatch<any> | undefined;
  disableCloseIcon?: boolean;
  handleChatClose?: any;
  backgroundColor?: string;
}

const OZModal = (props: Props): React.ReactElement => {
  const {
    keyboardBehaviorProps,
    keyboardType,
    visible,
    onRequestClose,
    children,
    backdropContainer,
    contentContainerStyles,
    title,
    transparent,
    setModalVisible,
    disableCloseIcon,
    headerStyles,
    handleChatClose
  } = props;
  const isIos = Platform.OS === 'ios';
  const defaultKeyboardBehavior = isIos ? 'padding' : undefined;
  const keyboardBehavior = keyboardBehaviorProps
    ? keyboardBehaviorProps
    : defaultKeyboardBehavior;

  const [isVisible, setIsVisible] = useState(visible);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setIsVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        if (isMounted.current && isVisible) {
          setIsVisible(false);
          if (onRequestClose && handleChatClose) onRequestClose(handleChatClose);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isVisible, onRequestClose]);

  const KeyboardChildren = () => (
    <BaseView
      style={[
        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
        backdropContainer,
      ]}
    >
      <BaseView
        style={[
          {
            height: height * 0.8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
          contentContainerStyles,
        ]}
      >
        {title ? (
          <BaseView
            row
            style={[
              {
                width: '100%',
                padding: 16,
                paddingTop: 8,
                paddingBottom: 8,
                justifyContent: 'space-between',
                borderBottomColor: grayd9,
                borderBottomWidth: 1,
                backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFF',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8
              },
              headerStyles,
            ]}
          >
            <Text style={[commonStyles.fs16, commonStyles.fwBold, !disableCloseIcon ? { width: '90%' } : {}]}>
              {title}
            </Text>
            {!disableCloseIcon ? (
              <Pressable
                onPress={() =>
                  setModalVisible ? setModalVisible(false) : null
                }
              >
                <BaseView>
                  <Icon name="close" size={24} />
                </BaseView>
              </Pressable>
            ) : null}
          </BaseView>
        ) : null}
        {children}
      </BaseView>
    </BaseView>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'absolute'
      }}
    >
      <BaseView>
        <Modal
          visible={visible}
          transparent={transparent}
          onRequestClose={() => {
            if (isMounted.current && isVisible) {
              setIsVisible(false);
              if (onRequestClose) onRequestClose(handleChatClose);
            }
          }}
          {...props}
        >
          {keyboardType === 'keyboardAware' ? (
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={{ flex: 1 }}
              extraScrollHeight={40}
            >
              <KeyboardChildren />
            </KeyboardAwareScrollView>
          ) : (
            <KeyboardAvoidingView
              behavior={'height'}
              keyboardVerticalOffset={isIos ? 0 : 20}
              style={{
                flex: 1,
              }}
            // enabled={!!isIos}
            >
              <KeyboardChildren />
            </KeyboardAvoidingView>
          )}
        </Modal>
      </BaseView>
    </SafeAreaView>
  );
};

export default OZModal;
