import React from 'react';
import { Platform, Text, View } from 'react-native';
import { commonStyles } from '@styles/common';
import GreenTick from 'assets/images/icons/green-tick';

interface IProps {
  benefits: string[];
}
const BenefitChips = (props: IProps) => {
  const { benefits } = props;
  return (
    <View style={[commonStyles.flexD, commonStyles.flexWrap]}>
      {benefits.map(item => {
        return (
          <View style={[commonStyles.flexD, commonStyles.mr8]} key={item}>
            <GreenTick />
            <Text
              style={[
                commonStyles.fs14,
                commonStyles.ml4,
                commonStyles.darkGrayColor,
              ]}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default BenefitChips;
