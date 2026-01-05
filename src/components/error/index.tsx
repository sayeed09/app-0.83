import { Alert } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
// import Analytics from 'appcenter-analytics';
import { APP_VERSION } from 'utils/constants';
import crashlytics from '@react-native-firebase/crashlytics';

const errorHandler = (e, isFatal) => {
  crashlytics().log(`Exception caught inside handler-: ${e}`);
  crashlytics().recordError(e);
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      'We have reported this error to our team ! Please close the app and start again',
      [
        {
          text: 'Ok',
        },
      ],
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  // Analytics.trackEvent('Exception Caught', {
  //   Error: e,
  //   DeviceInfo: APP_VERSION,
  //   isFatal,
  // });
};

export default {
  init() {
    setNativeExceptionHandler(exceptionString => {
      crashlytics().log(`Exception caught-: ${exceptionString}`);
      crashlytics().recordError(new Error(exceptionString));
    }, false);

    setJSExceptionHandler(errorHandler, false);
  },
};
