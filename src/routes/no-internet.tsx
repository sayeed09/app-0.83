import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Snackbar } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import NoInternetIcon from 'assets/images/no-internet-icon';
const TAB_ROUTE_NAMES = new Set(['HomeScreen', 'Concerns', 'Categories', 'Consult']);
interface IProps {
  navigationRef: any;
}

const OfflineOverlay = ({ navigationRef }: IProps) => {

  const navigation = useNavigation();
  const [isOffline, setIsOffline] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const checkUnstableNetwork = (state) => {
    if (state && state.type === 'wifi') {
      return state.details?.linkSpeed < 20 ? true : false;
    } else if (state && state.type === 'cellular' && !state.isInternetReachable) {
      return true;
    }
    return false;
  }

  const networkInformation = async () => {
    const unsub = NetInfo.addEventListener(state => {
      const offline = state.isConnected === false || state.isInternetReachable === false;
      setIsOffline(offline);
      setSnackbarVisible(checkUnstableNetwork(state));
      const navState = navigation?.getState();
      const currentRouteName = navState ? navState?.routes[navState.index]?.name : null;
      if (currentRouteName) {
        navigation.dispatch(StackActions.replace(currentRouteName));
      }
    });
    return unsub;
  }

  useEffect(() => {
    networkInformation();
  }, []);

  const handleReload = useCallback(async () => {
    const net = await NetInfo.fetch();
    if (!net.isConnected || !net.isInternetReachable) {
      setIsOffline(true);
      return;
    }

    const nav = navigationRef?.current;
    if (!nav) return;

    const currentRoute = nav.getCurrentRoute();
    const currentName = currentRoute?.name as string | undefined;
    const currentParams = currentRoute?.params ?? {};
    const params = { ...currentParams, refreshAt: Date.now() };

    if (!currentName) return;
    if (TAB_ROUTE_NAMES.has(currentName)) {
      nav.navigate('Home', {
        screen: currentName,
        params,
      });
    } else {
      nav.dispatch(StackActions.replace(currentName, params));
    }
    setIsOffline(false);
  }, [navigationRef, setIsOffline]);

  return (
    <>
      {isOffline ? <View style={styles.overlay}>
        <View style={styles.container}>
          <NoInternetIcon />
          <Text style={styles.title}>Oops! It looks like you're offline.</Text>
          <Text style={styles.subtitle}>Please check your internet connection and try again</Text>

          <TouchableOpacity style={styles.button} onPress={() => handleReload()}>
            <Text style={styles.buttonText}>RETRY</Text>
          </TouchableOpacity>
        </View>
      </View> : null}

      {/* Will cater this later, not sure on stable intenet also it is appearing.*/}
      <Snackbar
        visible={false}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1000}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff', marginLeft: 5, marginTop: 2 }}>
            Your internet seems unstable
          </Text>
        </View>
      </Snackbar>
    </>
  );
};

export default OfflineOverlay;


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    top: Platform.OS == 'ios' ? 40 : 92, left: 0, right: 0, bottom: 0
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center'
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginTop: 16
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#6BBD58',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  }
});
