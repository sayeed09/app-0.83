import React, { useState } from 'react';
import {
  useWindowDimensions,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { commonStyles } from '@styles/common';
import RenderHtml from 'react-native-render-html';

const ProductDescription = ({ description }) => {
  const [showDesc, setShowDesc] = useState(false);
  const { width } = useWindowDimensions();

  const source = {
    html: showDesc ? description : description.split('</li>')[0],
  };
  if (!description) {
    return null;
  }
  return (
    <View
      style={[
        commonStyles.ph16,
        commonStyles.bgWhite,
        commonStyles.mb4,
      ]}
    >
      <RenderHtml contentWidth={width} source={source} />
      <TouchableNativeFeedback onPress={() => setShowDesc(!showDesc)}>
        <Text
          style={[
            commonStyles.ReadMoreBtn,
            commonStyles.mb16,
            commonStyles.fs14,
            commonStyles.fw500,
          ]}
        >
          Read {showDesc ? 'Less' : 'More'}
        </Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ProductDescription;
