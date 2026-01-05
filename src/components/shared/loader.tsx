import React from 'react';
import { Image, View } from 'react-native';

import { LOADER } from '@utils/images';

const Loader = () => (
  <View
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 9999,
      height: '100%',
    }}
  >
    {/* <ActivityIndicator size="large" /> */}
    <Image style={{ position: 'absolute', top: 0, left: 0 }} source={LOADER} />
  </View>
);

export { Loader };
