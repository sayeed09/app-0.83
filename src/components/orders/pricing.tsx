import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Hr, Text } from 'components/base/foundation';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

const OrderPricing = ({
  subTotal,
  total,
  deliveryCharges,
  discount,
  paymentMode,
}: {
  subTotal: number | string;
  discount: number | string;
  deliveryCharges: number | string;
  total: number | string;
  paymentMode: string;
}) => (
  <Box backgroundColor="levelOneBg" style={{marginBottom: 32}}>
    <Box px={4} py={2}>
      <Text variant="heading3">Price Details</Text>
    </Box>
    <Hr />
    <Box
      px={4}
      pt={2}
      pb={1}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text>Subtotal</Text>
      <Text>{formatCurrencyWithSymbol(subTotal)}</Text>
    </Box>
    <Box px={4} py={1} flexDirection="row" justifyContent="space-between">
      <Text>OZiva Cash/Discount</Text>
      <Text>{formatCurrencyWithSymbol(discount)}</Text>
    </Box>
    <Box
      px={4}
      pt={1}
      pb={2}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text>Delivery Charges</Text>
      <Text>{formatCurrencyWithSymbol(deliveryCharges)}</Text>
    </Box>
    <Hr />
    <Box
      px={4}
      pt={1}
      pb={2}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text variant="heading3">Total</Text>
      <Text variant="heading3">{formatCurrencyWithSymbol(total)}</Text>
    </Box>
    <Hr />
    <Box flexDirection="row" py={2} px={4} alignItems="center">
      <Icon name="credit-card-outline" size={22} />
      <Text ml={2}>Paid by {paymentMode}</Text>
    </Box>
  </Box>
);

export default OrderPricing;
