import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Hr } from 'components/base/foundation';
import { useCheckoutState } from 'context/checkout';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';

import OrderPaymentMethodItem from './order-payment-method-item';
import { CustomText } from '../../../AndroidFontFix';
import { commonStyles } from 'styles/common';
import { checkIfPrimeItemAddedInCart } from 'utils/cart';

const styles = StyleSheet.create({
  cartSubtotalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
});

interface Props {
  orderSubtotal: number;
  orderTotal: number;
  shippingCharges: number;
  isSubscription: boolean;
  lineItem: any;
  orderTotalMRP: number;
  discountCode: string | null;
  discountValue: number;
}

const OrderConfirmationPriceDetails = ({
  orderSubtotal,
  orderTotal,
  shippingCharges,
  isSubscription,
  lineItem,
  orderTotalMRP,
  discountCode,
  discountValue
}: Props): React.ReactElement => {
  
  const { payment_method: paymentMethod } = useCheckoutState();
  
  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 15,
            marginBottom: 2,
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 18,
              color: '#000000',
            }}
          >
            Price Details
          </Text>
        </View>
        <Hr />
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            height: 1,
            marginBottom: 10,
          }}
        />
        <View style={{ backgroundColor: 'white', paddingHorizontal: 14 }}>
          <View style={styles.cartSubtotalItem}>
            <Text>Total MRP</Text>
            <Text>
              {formatCurrencyWithSymbol(convertToRupees(orderTotalMRP))}
            </Text>
          </View>
          <View style={styles.cartSubtotalItem}>
            <Text>Discount on MRP</Text>
            <Text>
              -{formatCurrencyWithSymbol(convertToRupees(orderTotalMRP - orderSubtotal))}
            </Text>
          </View>
          <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.fwBold, commonStyles.darkGreenText]}>{checkIfPrimeItemAddedInCart(lineItem) ? '3 Months' : '1 Month'} Consultation</Text>
            <Text style={[commonStyles.fwBold, commonStyles.darkGreenText]}>
              <Text style={[commonStyles.strikeText]}>{checkIfPrimeItemAddedInCart(lineItem) ? formatCurrencyWithSymbol(2499): formatCurrencyWithSymbol(1499)}{' '}</Text>FREE
            </Text>
          </View>
          {discountValue > 0 && <View style={styles.cartSubtotalItem}>
            <Text style={[commonStyles.BlackColor]}>Discount <CustomText style={[commonStyles.fwBold, commonStyles.darkGreenText ]}>{discountCode}</CustomText></Text>
            <Text style={[commonStyles.darkGreenText]}>
              {formatCurrencyWithSymbol(convertToRupees(discountValue))}
            </Text>
          </View>}
          <View style={styles.cartSubtotalItem}>
            <Text>Delivery Charges</Text>
            <Text>
              <Text style={[commonStyles.strikeText]}>
                {formatCurrencyWithSymbol(99)}
              </Text>
              <Text style={[commonStyles.darkGreenText]}>{` FREE`}</Text>
                  
            </Text>
          </View>
          {shippingCharges > 0 ? <View style={styles.cartSubtotalItem}>
            <Text>COD Charges</Text>
            <Text>
              <Text>
                {formatCurrencyWithSymbol(shippingCharges/100)}
              </Text>
            </Text>
          </View> : null}
          <Hr />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
            }}
          >
            <CustomText style={{ fontWeight: 'bold' }}>
              Total {isSubscription && `(per month)`}
            </CustomText>
            <CustomText style={{ fontWeight: 'bold' }}>
              {formatCurrencyWithSymbol(convertToRupees(orderTotal))}
            </CustomText>
          </View>
          <Hr />
          <OrderPaymentMethodItem paymentMethod={paymentMethod.toLowerCase()} />
        </View>
      </View>
    </>
  );
};

export default OrderConfirmationPriceDetails;
