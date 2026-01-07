import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
// import codePush from 'react-native-code-push';

import {
    ModalDetails,
    ModalHeader,
    ModalHeaderTitle,
} from '@components/styled/common';
import { width } from '@utils/constants';
import { setTrackingTransparency } from 'actions/notification';
import { useNotificationDispatch } from 'context/notifications';
import { Text } from 'react-native';
import {
    getTrackingStatus,
    requestTrackingPermission,
} from 'react-native-tracking-transparency';

const ToDo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    // if (!__DEV__) {
    //   codePush.checkForUpdate().then(update => {
    //     if (update) {
    //       codePush.sync(
    //         {
    //           updateDialog: { title: '' },
    //           installMode: codePush.InstallMode.IMMEDIATE,
    //           // checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
    //         },
    //         status => {
    //           switch (status) {
    //             case codePush.SyncStatus.DOWNLOADING_PACKAGE:
    //               // Show "downloading" modal
    //               setIsVisible(true);
    //               break;
    //             case codePush.SyncStatus.INSTALLING_UPDATE:
    //               // Hide "downloading" modal
    //               setIsVisible(false);
    //               codePush.allowRestart();
    //               break;
    //             default:
    //               break;
    //           }
    //         },
    //       );
    //     }
    //   });
    // }
    const setupTracking = async () => {
      const trackingStatus = await getTrackingStatus();
      if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
        // enable tracking features
        notificationDispatch(setTrackingTransparency(true));
      } else if (
        trackingStatus === 'denied' ||
        trackingStatus === 'not-determined'
      ) {
        const trackingStatus = await requestTrackingPermission();
        // enable tracking features
        notificationDispatch(
          setTrackingTransparency(
            trackingStatus === 'authorized' || trackingStatus === 'unavailable',
          ),
        );
      } else {
        notificationDispatch(setTrackingTransparency(false));
      }
    };

    setupTracking();
  });
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent
      style={{ width }}
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <View style={{ flex: 1, backgroundColor: '#00000099' }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 22,
          }}
        >
          <ModalHeader white>
            <ModalHeaderTitle>Updating App</ModalHeaderTitle>
          </ModalHeader>
          <ModalDetails
            white
            style={{
              width,
              justifyConten: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}
          >
            <Text>Inprogress...</Text>
          </ModalDetails>
        </View>
      </View>
    </Modal>
  );
};

export default ToDo;
