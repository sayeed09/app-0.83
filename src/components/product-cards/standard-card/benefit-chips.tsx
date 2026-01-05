import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

const BenefitChips = (props) => {
  const { benefits } = props;

  return (
    <View
      style={[
        commonStyles.flexD,
        commonStyles.mr4, 
        commonStyles.mt4,
        commonStyles.flexWrap,
        {alignItems: 'center'}]}>
      {
        benefits?.for && (
          <View
            key={benefits?.for}
            style={[commonStyles.flexD, commonStyles.mr4, commonStyles.mb4, {alignItems: 'flex-start'}]}
          >
            <Text style={{color: '#006E5A', fontSize: 11, textTransform: 'uppercase'}}>For</Text>
            <Text
              style={[
                commonStyles.fs11,
                commonStyles.ml4,
                commonStyles.darkGrayColor,
                {flexWrap: 'wrap', flex: 1}
              ]}
            >
              {benefits?.for}
            </Text>
          </View>
        )
      }
      {
        benefits?.with && (
          <View
            key={benefits?.with}
            style={[commonStyles.flexD, commonStyles.mr4, commonStyles.mb4, {alignItems: 'flex-start'}]}
          >
            <Text style={{color: '#006E5A', fontSize: 11, textTransform: 'uppercase'}}>With</Text>
            <Text
              style={[
                commonStyles.fs11,
                commonStyles.ml4,
                commonStyles.darkGrayColor,
                {flexWrap: 'wrap', flex: 1}
              ]}
            >
              {benefits?.with}
            </Text>
          </View>
        )
      }
    </View>
  );
};

export default BenefitChips;
