import ArrowUp from 'assets/images/icons/standard-icons/arrow-up';
import React from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';
import { width } from 'utils/constants';

const BackToTopButton = ({ backToTop, showBackToTop }) =>
showBackToTop ? (
  <View
    style={{
      zIndex: 9999,
      position: 'absolute',
      width: width / 3.5,
      marginLeft: width / 2.8,
    }}
  >
    <TouchableNativeFeedback onPress={backToTop}>
      <View
        style={{
          height: 40,
          backgroundColor: '#2c2c2c',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
      >
        <View style={{ width: 15, height: 15 }}>
          <ArrowUp />
        </View>
        <Text style={{ color: '#fff', fontSize: 10 }}>Back to top</Text>
      </View>
    </TouchableNativeFeedback>
  </View>
) : (
  <></>
);
export default BackToTopButton;