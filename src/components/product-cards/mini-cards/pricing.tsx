import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

interface Props {
  price: string;
  compareAtPrice: string;
}
const Pricing = ({ price, compareAtPrice }: Props) => {
  return (
    <>
      <View
        style={[
          commonStyles.flexD,
          commonStyles.justifyCenter,
          commonStyles.width,
        ]}
      >
        <Text style={[commonStyles.grayColor, commonStyles.fs11]}>MRP:</Text>
        {compareAtPrice != price ? (
          <Text
            style={[
              commonStyles.grayColor,
              commonStyles.strikeText,
              commonStyles.mh2,
              commonStyles.fs12,
            ]}
            numberOfLines={1}
          >
            {formatCurrencyWithSymbol(compareAtPrice)}
          </Text>
        ) : null}
        <Text style={[commonStyles.fs14, commonStyles.fw500]} numberOfLines={1}>
          {formatCurrencyWithSymbol(price)}
        </Text>
        {Number(compareAtPrice) - Number(price) > 0 ? (
         <Text
          style={[commonStyles.redColor, commonStyles.fs12, commonStyles.ml4]}
          numberOfLines={1}
          >
            {formatCurrencyWithSymbol(Number(compareAtPrice) - Number(price))}{' '}Off
          </Text>
        ) : null}
      </View>
    </>
  );
};

export default Pricing;
