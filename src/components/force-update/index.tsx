import FastImage from '@d11/react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from 'components/elements/button/primary-Button';
import SecondaryButton from 'components/elements/button/secondary-button';
import { useShopState } from 'context/shop';
import React, { useEffect, useState } from 'react';
import { Linking, Platform, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNModal from 'react-native-modal';
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { commonStyles } from 'styles/common';
import { compareAppVersions } from 'utils/common';


const inAppUpdates = new SpInAppUpdates(
  false, // isDebug
);

const ForceUpdate = () => {
  const [showSoftUpdate, setShowSoftUpdate] = useState(false);
  const [showForceUpdate, setShowForceUpdate] = useState(false);
  const { appUpdateConfig } = useShopState();
  const InstalledVersion = DeviceInfo.getVersion();

  const checkIfAlreadySkipped = async() => {
    const saveTimeStamp = await AsyncStorage.getItem('updateSkipped');
    if (saveTimeStamp) {
      let currentTime = Date.now();
      // Timer to check again is 24 hours
      if((currentTime - Number(saveTimeStamp)) >=  24 * 60 * 60 * 1000) {
        setShowSoftUpdate(true);
        AsyncStorage.removeItem('updateSkipped');
      }
    } else {
     setShowSoftUpdate(true);
    }
  }

  const checkIfAppNeedsUpdate = async() => {
    if (appUpdateConfig) {
      const { skippedVersions, minSupportedVersion, latestVersion } = appUpdateConfig;
      const skipThisVersion = skippedVersions.findIndex(x => x == InstalledVersion);
      const needsToUpdate = compareAppVersions(minSupportedVersion, InstalledVersion);
      const shouldUpdate = compareAppVersions(latestVersion, InstalledVersion);
      // Check if update is available on store otherwise it wont update
      const updateOptions = Platform.select({
        android: {},
        ios: {country: 'IN'},
      });

      inAppUpdates.checkNeedsUpdate(updateOptions).then((result) => {
        try {
          if (result.shouldUpdate) {
            if (skipThisVersion > -1) {
              return;
            }
            if (needsToUpdate) {
              setShowForceUpdate(true);
            }
            if (shouldUpdate) {
              checkIfAlreadySkipped();
            }
          }
        } catch (error) {
          console.log('Error in Update App Package', error);
        }
      }).catch(error => {
        console.log('Error fetching Update status', error);
      });
    }
  }

  useEffect(() => {
    checkIfAppNeedsUpdate();
  }, [appUpdateConfig]);

  const ModalContent = () => (
    <>
      <View>
        <FastImage
          source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Rectangle_4205.png?v=1763108878' }}
          style={{
            width: '100%',
            height: 100
          }} />
        <View style={[commonStyles.pad8, commonStyles.alignCenter, {marginTop: -110}]}>
          <FastImage source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/upgrade-rocket.png?v=1762855458'}} style={{height: 120, width: 120}}/>
          <Text style={[commonStyles.fs18, commonStyles.fwBold]}>
            {appUpdateConfig?.title}
          </Text>
        </View>

        <View style={[commonStyles.mb16, commonStyles.alignCenter]}>
          <Text style={[commonStyles.fs14, commonStyles.fw500, commonStyles.textCenter]}>
            {appUpdateConfig?.description}
          </Text>
        </View>
        <View style={[commonStyles.flexRowCenter, commonStyles.pad16, commonStyles.gap16, {alignContent: 'center'}]}>
          {(showSoftUpdate && !showForceUpdate)  && <SecondaryButton
            style={[commonStyles.justifyCenter, commonStyles.flex05]}
            accentColor="#FF6F00"
            title="Skip for Now"
            onAction={() => skipUpdate()}
          />}
          <PrimaryButton
            style={[commonStyles.justifyCenter, commonStyles.flex05]}
            accentColor="#FF6F00"
            title="UPDATE NOW"
            onAction={() => handleUpdateNow()}
          />
        </View>
      </View>
    </>
  );

  const skipUpdate = () => {
    const time = Date.now();
    AsyncStorage.setItem('updateSkipped', time.toString());
    setShowSoftUpdate(false);
  }

  const handleUpdateNow = () => {
    let updateOptions: StartUpdateOptions = {};
    if (Platform.OS === 'android') {
      // android only, on iOS the user will be promped to go to your app store page
      updateOptions = {
        updateType: IAUUpdateKind.IMMEDIATE,
      };
      inAppUpdates.startUpdate(updateOptions);
    } else {
      Linking.openURL('itms-apps://itunes.apple.com/app/id1579866575');
    }
  };

  return (
    <>
        <RNModal
          style={{margin: 8, bottom: 32, position: 'absolute', left: 0, right: 0}}
          // isVisible={showSoftUpdate || showForceUpdate}
          onBackButtonPress={() => { }}>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 8 , overflow: 'hidden' }}>
            <ModalContent />
          </View>
        </RNModal>
    </>
  );
};

export default ForceUpdate;