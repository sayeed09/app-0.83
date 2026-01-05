import GreenTick from 'assets/images/icons/green-tick';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface IProps {
  benefits: string[];
}
const BenefitChips = ({ benefits }: IProps) => {
  return (
    <View
      style={[
        commonStyles.mb8,
        { overflow: 'hidden', maxWidth: '70%', maxHeight: 17 },
      ]}
    >
      <View style={[commonStyles.flexD, commonStyles.flexWrap]}>
        {benefits && benefits.length > 0 &&  benefits.map(item => {
          return (
            <View style={[commonStyles.flexD, commonStyles.mr4]} key={item}>
              <GreenTick />
              <Text
                style={[
                  commonStyles.fs12,
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
    </View>
  );
};

export default BenefitChips;
