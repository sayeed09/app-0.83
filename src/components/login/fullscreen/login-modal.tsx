import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { setLoginModal } from 'actions/modals';
import OZModal from 'components/modal';
import { useModalsDispatch, useModalsState } from 'context/modals';
import { width } from 'utils/constants';
import Login from './login';
import OTPInput from './otp-input';
import ResendOTP from './resend-otp';
import WhiteCross from 'assets/images/icons/white-crose';
import Loader from '@components/elements/loader/loader';
import { isIOS } from 'react-native-elements/dist/helpers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { screenView } from '../standard/login-modal';

const LoginModal = (): React.ReactElement => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const modalsDispatch = useModalsDispatch();
  let inputRef = useRef<TextInput>();
  const [showPopUp, setShowPopUp] = useState(true);
  const [view, setView] = useState(screenView.loginInput);

  React.useEffect(() => {
    if (isFocused) {
      setShowPopUp(true);
    }
  }, [isFocused]);
  const renderView = () => {
    switch (view) {
      case screenView.loginInput:
        return <Login setView={setView} />;
      case screenView.otpInput:
        return <OTPInput setView={setView} />;
      case screenView.resendOtp:
        return <ResendOTP setView={setView} />;
    }
  };
  return (
    <>
      {showPopUp ? (
        <>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <OZModal
              visible={showPopUp}
              onRequestClose={() => {
                modalsDispatch(setLoginModal(false));
                navigation.goBack();
              }}
              setModalVisible={() => modalsDispatch(setLoginModal(false))}
              transparent
              animationType="fade"
              title="Login"
              contentContainerStyles={{
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 16,
                maxWidth: '100%',
              }}
              onShow={() => {
                inputRef.current?.focus();
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  height: '50%',
                  backgroundColor: '#6BBD58',
                  width,
                }}
              />
              <View
                style={{ position: 'absolute', top: isIOS ? 40 : 8, right: 8 }}
              >
                <TouchableOpacity
                  style={{ padding: 15 }}
                  onPress={() => {
                    setShowPopUp(false);
                    modalsDispatch(setLoginModal(false));
                    navigation.navigate('HomeScreen', {});
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    <WhiteCross />
                  </Text>
                </TouchableOpacity>
              </View>
              {renderView()}
            </OZModal>
          </SafeAreaView>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LoginModal;
