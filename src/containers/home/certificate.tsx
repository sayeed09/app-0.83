import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { CERTIFICATE2, CERTIFICATE3, CERTIFICATE_FSSAI } from 'utils/images';

const Certificate = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

      <Image
        source={CERTIFICATE2}
      />
      <Image
        source={CERTIFICATE3}
      />
      <Image
        source={CERTIFICATE_FSSAI}
      />
    </View>
  );
};

export default Certificate;
