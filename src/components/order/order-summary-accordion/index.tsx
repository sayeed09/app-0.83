import React, { useState } from 'react';
import { Text, View } from 'react-native';
import WhiteCard from 'components/elements/card/white-card';
import { commonStyles } from 'styles/common';
import Accordion from '@components/shared/accordian';
import OrderSummary from '../order-summary';
import { useCartState } from 'context/cart/CartContext';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';

interface IProps {
  subscription?: boolean;
}
const OrderSummaryAccordion = (props: IProps) => {
  const { orderTotal, orderTotalMRP } = useCartState();
  const [expanded, setExpanded] = useState(false);

  const headerData = () => {
    return (
      <>
        <Text
          style={[
            commonStyles.mr4,
            commonStyles.fs12,
            { textDecorationLine: 'line-through', color: '#7E7E7E' },
          ]}
        >
          {formatCurrencyWithSymbol(convertToRupees(orderTotalMRP))}
        </Text>
        <Text style={[commonStyles.fs14, commonStyles.fw500]}>
          {formatCurrencyWithSymbol(convertToRupees(orderTotal ?? 0))}
        </Text>
      </>
    );
  };
  return (
    <View>
      <Accordion
        title={!expanded ? "Show Order Summary" : 'Hide Order Summary'}
        data={OrderSummary()}
        expandAccordian={setExpanded}
        top
        contentColor="#fff"
        expand={false}
        headerData={props.subscription ? null : headerData()}
      />
    </View>
  );
};

export default OrderSummaryAccordion;
