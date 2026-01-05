import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

export interface Props {
  price: string;
  compareAtPrice: string;
}
const Pricing = (props: Props) => {
  const { price, compareAtPrice } = props;
  return (
    <>
      <View
        style={[
          commonStyles.flexD,
          commonStyles.justifyStart,
          commonStyles.width,
        ]}
      >
        <Text style={[commonStyles.grayColor, commonStyles.fs12]}>MRP:</Text>
        {compareAtPrice != price ? (
          <Text
            style={[
              commonStyles.grayColor,
              commonStyles.strikeText,
              commonStyles.mh2,
              commonStyles.fs12,
            ]}
          >
            {formatCurrencyWithSymbol(compareAtPrice)}
          </Text>
        ) : null}
        <Text style={[commonStyles.fs14, commonStyles.fw500]} numberOfLines={1}>
          {formatCurrencyWithSymbol(price)}
        </Text>
        {/* {Number(compareAtPrice) - Number(price) > 0 ? (
          <Text
            style={[commonStyles.redColor, commonStyles.fs12, commonStyles.ml4]}
            numberOfLines={1}
          >
            {formatCurrencyWithSymbol(Number(compareAtPrice) - Number(price))}{' '}
            off
          </Text>
        ) : null} */}
      </View>
    </>
  );
};

export default Pricing;
