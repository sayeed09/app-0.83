import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import { ProductCatalogResponse } from 'models/product-details/product';
import { fetchProductById } from 'services/product';
import { ozivaPrimeProductId } from 'utils/constants';
import { commonStyles } from 'styles/common';
import GreenTick from 'assets/images/icons/green-tick';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';
import SvgRenderer from 'react-native-svg-renderer';
import { addProduct } from 'actions/cart';
import { PrimeStyles } from '../../styles/prime';


const OZCartPrime = (): React.ReactElement | null => {
  const [primeProductDetails, setPrimeProductDetails] =
    useState<ProductCatalogResponse>();
  const { cartItems } = useCartState();
  const cartDispatch = useCartDispatch();
  const isCartEmpty = cartItems.length === 0;
  const getPrimeProductDetails = async () => {
    const productDetails = await fetchProductById(
      ozivaPrimeProductId.toString(),
    );
    setPrimeProductDetails(productDetails);
  };

  useEffect(() => {
    getPrimeProductDetails();
  }, []);

  if (isCartEmpty || !primeProductDetails) {
    return null;
  }

  const addPrimeItem = () => {
    cartDispatch(
      addProduct({
          id: Number(primeProductDetails?.data.variants[0].id),
          quantity: 1
      }),
    );
  }
  return (
    <>
      <View
        style={[PrimeStyles.primeMembership]}
      >
        <View style={{ flexDirection: 'row' }}>
          <SvgRenderer width="50" height="50" source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/prime_logo.svg?v=1709117915' }} />
          <View style={[commonStyles.ml16]}>
            <Text style={[commonStyles.fwBold, commonStyles.fs14, commonStyles.mb4]}>Prime Membership (3 months)</Text>
            <Text style={[commonStyles.h3Tag, PrimeStyles.badge, commonStyles.fs12]}>3 Months</Text>
          </View>
        </View>
        <View>
          <Text style={[
                commonStyles.flexD,
                commonStyles.mr8,
                commonStyles.justifyCenter,
                commonStyles.fw500,
                commonStyles.mb4
              ]}><GreenTick /> 3 Months Nutritionist Diet Consultation + Diet Plan</Text>
          <Text style={[
                commonStyles.flexD,
                commonStyles.mr8,
                commonStyles.justifyCenter,commonStyles.fw500
              ]}><GreenTick /> 30% additional savings on each order.</Text>
        </View>
        <View style={[PrimeStyles.primePrice]}>
          <View>
            <Text style={[commonStyles.fs14]}>
              <>
                MRP: <Text style={[commonStyles.strikeText]}>
                  {formatCurrencyWithSymbol(999)}
                </Text>
                <Text style={[commonStyles.fwBold]}>{` `}{formatCurrencyWithSymbol(99)}</Text>
              </>
              </Text>
            <Text style={[commonStyles.redColor]}>You save: ₹900</Text>
          </View>
          <View>
            <Pressable onPress={() => addPrimeItem()}>
              <Text style={[commonStyles.redColor, commonStyles.fwBold]}>ADD NOW</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default OZCartPrime;
