import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import PDFView from 'react-native-view-pdf';

import { height, width } from '@utils/constants';
import { CLP_PURITY_AWARD } from '@utils/images';

const resources = {
  url:
    'https://cdn.shopify.com/s/files/1/2393/2199/files/CLP_Certificate_OZiva_04072021_2.pdf?v=1620879137',
};

const resourceType = 'url';

const CLPCertificate = () => (
  <View
    style={{
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }}
  >
    <ScrollView
      style={{
        height,
        width,
        backgroundColor: '#fff',
      }}
    >
      <FastImage
        source={CLP_PURITY_AWARD}
        resizeMode="contain"
        style={{
          height: height / 1.3,
        }}
      />
      <View>
        {/* <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1, height, marginBottom: 50 }}
          resource={resources[resourceType]}
          resourceType={resourceType}
        /> */}
      </View>
    </ScrollView>
  </View>
);

export default CLPCertificate;
