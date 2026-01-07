import FastImage from '@d11/react-native-fast-image';
import * as React from 'react';
import { Image, Platform } from 'react-native';
import { UPI } from 'utils/images';

const UPIIconComponent = () => {
  return <>
    {Platform.OS == "android" ?
      <FastImage source={{ uri: UPI }} style={{ height: 30, width: 30 }} /> :
      <Image source={{ uri: UPI }} style={{ height: 30, width: 30 }} />
    }

  </>
}
export default UPIIconComponent;
