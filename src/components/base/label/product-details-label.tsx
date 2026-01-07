import React from 'react';
import { Platform, Text } from 'react-native';

const ProductDetailsLabel = props => {
  const isIOS = Platform.OS === 'ios';
  return (
    <Text
      numberOfLines={3}
      style={[{fontSize: 18,marginBottom: isIOS ? 0 : 16,
        color: '#000000',
        lineHeight: 20,
        fontWeight: 500,
        fontFamily: 'Roboto-Medium',
        letterSpacing: 0.15,}, props.style]}
    >
      {props?.children}
    </Text>
  );
};

export default ProductDetailsLabel;
