import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useCartState } from 'context/cart/CartContext';
import { commonStyles } from 'styles/common';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';
import { DISCOUNT_ICON } from 'utils/images';
import { Tooltip } from 'react-native-elements';
import InfoIcon from 'assets/images/icons/info-icon';

import { CustomText } from '../../../AndroidFontFix';

const styles = StyleSheet.create({
  cartSubtotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
});

const OrderSummaryPriceDetails = (): React.ReactElement => {
  const {
    cartItems,
    orderSubtotal,
    orderTotal,
    shippingCharges,
    totalDiscount,
    isSubscriptionItem,
    totalPrice,
  } = useCartState();

  return (
    <>
      {cartItems.length > 0 ? (
        <View>
          <View
            style={{
              marginBottom: 2,
            }}
          >
            <Text
              style={[commonStyles.h2Tag, commonStyles.mb0, commonStyles.mt16]}
            >
              Price Details
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000',
              height: 1,
              marginBottom: 10,
            }}
          />
          <View>
            <View style={styles.cartSubtotalItem}>
              <Text>Subtotal</Text>
              <Text>
                {!isSubscriptionItem
                  ? formatCurrencyWithSymbol(
                      convertToRupees(Number(orderSubtotal)),
                    )
                  : formatCurrencyWithSymbol(Number(totalPrice))}
              </Text>
            </View>
            <View style={styles.cartSubtotalItem}>
              <Text>OZiva Cash/Discount</Text>
              <Text>
                {totalDiscount > 0
                  ? formatCurrencyWithSymbol(
                      convertToRupees(totalDiscount),
                    )
                  : '00'}
              </Text>
            </View>
            <View style={styles.cartSubtotalItem}>
            <View style={[commonStyles.flexD]}>
              <Text>Delivery Charges</Text>
              <Tooltip containerStyle={{ width: 240 }} popover={<Text style={[commonStyles.textWhite]}>Free delivery for COD above ₹799</Text>} backgroundColor="#000">
                <InfoIcon />
              </Tooltip>
            </View>
              <Text>
                {shippingCharges === 0
                  ? `00`
                  : formatCurrencyWithSymbol(
                      convertToRupees(Number(shippingCharges)),
                    )}
              </Text>
            </View>
            <View style={{ backgroundColor: '#D9D9D9', height: 1, flex: 1 }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}
            >
              <CustomText style={{ fontWeight: 'bold' }}>
                Total {isSubscriptionItem && `(per month)`}
              </CustomText>
              <CustomText style={{ fontWeight: 'bold' }}>
                {!isSubscriptionItem
                  ? formatCurrencyWithSymbol(
                      convertToRupees(Number(orderTotal)),
                    )
                  : formatCurrencyWithSymbol(Number(totalPrice))}
              </CustomText>
            </View>
           
          </View>
        </View>
      ) : null}
    </>
  );
};

export default OrderSummaryPriceDetails;
