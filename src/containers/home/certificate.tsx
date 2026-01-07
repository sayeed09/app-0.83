import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { View } from 'react-native';
import { CERTIFICATE2, CERTIFICATE3, CERTIFICATE_FSSAI } from 'utils/images';

const Certificate = () => {
  return (
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          
           <FastImage
            source={CERTIFICATE2}
            resizeMode={FastImage.resizeMode.contain}      
                  style={{
                    height: 100,
                    width: 100,
            }}
          />  
           <FastImage
            source={CERTIFICATE3}
            resizeMode={FastImage.resizeMode.contain}      
                  style={{
                    height: 100,
                    width: 100,
            }}
          />  
          <FastImage
            source={CERTIFICATE_FSSAI}
            resizeMode={FastImage.resizeMode.contain}      
                  style={{
                    height: 100,
                    width: 100,
            }}
          />  
          </View>
  );
};

export default Certificate;
