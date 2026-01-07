import { useCartState } from 'context/cart/CartContext';
import useCart from 'hooks/cart';
import { ProductCardModel } from 'models/product-card/card-model';
import React from 'react';
import { commonStyles } from 'styles/common';
import SecondaryButton from '@components/elements/button/secondary-button';
import { getRandomUserNumber } from 'utils/common';
import { Pressable, Text, View } from 'react-native';

interface Props {
  productCardModel: ProductCardModel;
  addToCartCallback?: () => void;
}

const AddToCart = (props: Props) => {
  const { productCardModel, addToCartCallback } = props;
  const { handleAddToCart } = useCart();
  const { cartItems } = useCartState();

  const addToCart = () => {
    if (addToCartCallback) addToCartCallback();
    handleAddToCart(productCardModel);
  };
  return (
    <>
      <View
        style={[
          commonStyles.flexD,
          commonStyles.mt10,
          commonStyles.width,
          commonStyles.justifySpaceBetween,
        ]}
      >
        <View>
          <Text style={[commonStyles.fs10, commonStyles.darkGreenText]}>
            {getRandomUserNumber(productCardModel?.variantId)} + Users Added
          </Text>
        </View>
        <View>
          <Pressable onPress={() => addToCart()}>
            <Text
              style={[
                commonStyles.fs14,
                commonStyles.redColor,
                commonStyles.fw500,
              ]}
            >
              ADD
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default AddToCart;
