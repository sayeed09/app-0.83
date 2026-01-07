import { Dimensions, StyleSheet } from 'react-native';

import Concerns from 'containers/concerns';
import React from 'react';
// import Razorpay from 'react-native-customui';

const source = { uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Moringa_-_Antioxidant_a8510dfb-073f-479f-b031-769f50f54710.pdf?v=1742514473' };

export default function ConcernsScreen() {
  // useEffect(() => {
  //   ReactMoE.initialize("Z4JGV1DYJZ1TC2TYDLCBC93G");
  //   ReactMoE.identifyUser('test_oo1');
  //   console.log(ReactMoE.getUserIdentities(), 'jjjj')
  //   ReactMoE.trackEvent('App Opened', {});

  // }, []);

  return (
    <>
      <Concerns navigation={undefined} route={undefined} />
    </>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
