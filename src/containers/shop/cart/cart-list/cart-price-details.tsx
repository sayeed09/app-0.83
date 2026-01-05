import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useCartState } from 'context/cart/CartContext';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';

import { CustomText } from '../../../../../AndroidFontFix';
import { commonStyles } from 'styles/common';
import OZPrimeLogo from 'assets/images/icons/prime-icons/oziva-prime-logo';
import { useCheckoutState } from 'context/checkout';
import { useAuthState } from 'context/auth';
import { PrimeMemberShipType } from 'models/prime';
import OzivaCashWalletIconComponent from 'assets/images/icons/oziva-cash-icons/oziva-cash-wallet-icon';
import { ozivaPrimeProductId, totalCashBack } from 'utils/constants';
import { checkIfPrimeItemAddedInCart } from 'utils/cart';

const styles = StyleSheet.create({
  cartSubtotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

const CartPriceDetails = (): React.ReactElement | null => {
  const {
    cartItems,
    orderSubtotal,
    orderTotal,
    shippingCharges,
    totalDiscount,
    orderTotalMRP,
    cashback,
    isOzivaCashSelected,
    isSubscriptionItem,
  } = useCartState();
  const { discount_code: discountCode } = useCheckoutState();
  const { userData } = useAuthState();

  if (cartItems.length === 0) {
    return null;
  }
  const isPrime = userData?.prime?.current_status == PrimeMemberShipType.Prime;

  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#E0E0E0',
          borderRadius: 4,
          margin: 4,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            padding: 8,
            marginBottom: 2,
            borderBottomWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <CustomText style={[commonStyles.fs16, commonStyles.fwBold]}>
            Bill Summary
          </CustomText>
        </View>
        <View style={{ padding: 8 }}>
          <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.fs14]}>Total MRP</Text>
            <Text style={[commonStyles.fs14]}>
              {formatCurrencyWithSymbol(convertToRupees(orderTotalMRP))}
            </Text>
          </View>
          {orderTotalMRP - orderSubtotal > 0 ? (
            <View style={styles.cartSubtotalItem}>
              <Text style={[commonStyles.fs14]}>Discount on MRP</Text>
              <Text style={[commonStyles.fs14]}>
                -
                {formatCurrencyWithSymbol(
                  convertToRupees(orderTotalMRP - orderSubtotal),
                )}
              </Text>
            </View>
          ) : null}
          <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.fs14, commonStyles.fwBold, commonStyles.darkGreenText]}>{checkIfPrimeItemAddedInCart(cartItems) ? '3 Months' : '1 Month'}  Consultation</Text>
            <Text style={[commonStyles.fs14, commonStyles.fwBold, commonStyles.darkGreenText]}>
              <>
                <Text style={[commonStyles.strikeText, commonStyles.darkGreenText]}>
                  {checkIfPrimeItemAddedInCart(cartItems) ? formatCurrencyWithSymbol(2449) : formatCurrencyWithSymbol(1449)}
                </Text>
                <Text style={[commonStyles.darkGreenText]}>{` FREE`}</Text>
              </>
            </Text>
          </View>
          {!isSubscriptionItem && (discountCode?.code || isOzivaCashSelected) ? (
            <View style={styles.cartSubtotalItem}>
              <View
                style={[
                  commonStyles.flexD,
                  { justifyContent: 'space-between', flex: 1 },
                ]}
              >
                <Text style={[commonStyles.fs14]}>
                  Discount{' '}
                  <Text style={[commonStyles.darkGreenText, commonStyles.fwBold]}>
                    {isOzivaCashSelected
                      ? 'OZiva Cash applied'
                      : discountCode?.code}
                  </Text>
                </Text>
                <Text style={[commonStyles.fs14, commonStyles.darkGreenText]}>
                  {totalDiscount > 0 ? (
                    <>
                      -
                      {formatCurrencyWithSymbol(
                        convertToRupees(totalDiscount),
                      )}
                    </>
                  ) : (
                    '00'
                  )}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.cartSubtotalItem}>
            <View style={[commonStyles.flexD, {marginBottom: 8}]}>
              <Text style={[commonStyles.fs14]}>Delivery Charges</Text>
            </View>
            <Text style={[commonStyles.fs14]}>
              <>
                <Text style={[commonStyles.strikeText]}>
                  {formatCurrencyWithSymbol(99)}
                </Text>
                <Text style={[commonStyles.darkGrayColor]}>{` FREE`}</Text>
              </>
            </Text>
          </View>
          {shippingCharges !== 0 ? <View style={styles.cartSubtotalItem}>
            <View style={[commonStyles.flexD]}>
              <Text style={[commonStyles.fs14]}>COD Charges
              </Text>
            </View>
            <Text style={[commonStyles.fs14]}>
              {shippingCharges !== 0 ? (
                <Text>
                  {formatCurrencyWithSymbol(
                  convertToRupees(Number(shippingCharges)),
                  )}
                </Text>
              ) : null}
            </Text>
          </View> : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 4,
              paddingHorizontal: 8,
              borderTopWidth: 1,
              borderColor: '#E0E0E0',
              marginHorizontal: -8,
            }}
          >
            <Text style={[commonStyles.fs16, commonStyles.fwBold]}>Total</Text>
            <Text style={[commonStyles.fs16, commonStyles.fwBold]}>
              {formatCurrencyWithSymbol(convertToRupees(orderTotal))}
            </Text>
          </View>
          
        </View>
      </View>
    </>
  );
};

export default CartPriceDetails;
