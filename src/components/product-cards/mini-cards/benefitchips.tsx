import GreenTick from 'assets/images/icons/green-tick';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface IProps {
  benefits: string[];
}
const BenefitChips = ({ benefits }: IProps) => {
  return (
    <View style={{ height: 43, overflow: 'hidden' }}>
      <View
        style={[
          commonStyles.flexD,
          commonStyles.flexWrap,
          commonStyles.justifyCenter,
        ]}
      >
        {benefits.map(item => {
          return (
            <View
              key={item}
              style={[
                commonStyles.flexD,
                commonStyles.mr8,
                commonStyles.justifyCenter,
              ]}
            >
              <GreenTick />
              <Text
                style={[
                  commonStyles.fs12,
                  commonStyles.ml4,
                  commonStyles.mb4,
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
