import React from 'react';
import { Text, View } from 'react-native';
import { useCartState } from 'context/cart/CartContext';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

interface Props {
  price: string;
  compareAtPrice: string;
}
const Pricing = ({ price, compareAtPrice }: Props) => {
  const { cartItems } = useCartState();
  return (
    <>
      <View style={[commonStyles.flexD]}>
        <Text style={[commonStyles.grayColor, commonStyles.fs12]}>MRP:</Text>
        {compareAtPrice !== price ||
        (cartItems.length > 0 &&
          cartItems[0]?.compareAtPrice !== cartItems[0]?.price) ? (
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
      </View>
      {Number(compareAtPrice) - Number(price) > 0 ? (
        <View style={[commonStyles.flexD]}>
          <Text
            style={[{color: '#FF6F00'}, commonStyles.fs11]}
            numberOfLines={1}
          >
            You Save :{' '}
            {formatCurrencyWithSymbol(Number(compareAtPrice) - Number(price))}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default Pricing;
