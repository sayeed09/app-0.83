import WhiteCard from 'components/elements/card/white-card';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from 'styles/common';
import { width } from 'utils/constants';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';
import PrimaryButton from 'components/elements/button/primary-Button';
import { CustomText } from '../../../../../AndroidFontFix';
import { ShimmerButtonWrapper } from './shimmer-effect';
import { Snackbar } from 'react-native-paper';
import { setUpgradeSnackbar } from 'actions/cart';

interface IProps {
  loading: boolean;
  handleSubmit: () => void;
  submitBtnTitle: string;
}

const FooterBar = ({ loading, handleSubmit, submitBtnTitle }: IProps) => {
  const {
    cartItems,
    orderSubtotal,
    orderTotal,
    cartLoading,
    orderTotalMRP,
    totalDiscount,
  } = useCartState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartDispatch = useCartDispatch();
  const { showUpgradeSnackbar } = useCartState();

  const isButtonDisabled = isSubmitting || cartItems.length === 0 || loading;

  return (
    <>
      <WhiteCard
        noBorderRadius
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
          elevation: 15,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          paddingHorizontal: 8
        }}
      >
        <View style={{ paddingTop: 0 }}>
          {cartItems.length > 0 && (
            <View style={{ flexDirection: 'row' }}>
              <View style={[commonStyles.flexD, commonStyles.alignCenter]}>
                <Text
                  style={[
                    commonStyles.fs12,
                    commonStyles.grayColor,
                    commonStyles.mr4,
                  ]}
                >
                  Total MRP
                </Text>
                {convertToRupees(orderTotalMRP - (orderSubtotal ?? 0)) > 0 ? (
                  <Text
                    style={[
                      commonStyles.fs12,
                      commonStyles.grayColor,
                      commonStyles.mr4,
                      {
                        textDecorationLine: 'line-through',
                      },
                    ]}
                  >
                    {formatCurrencyWithSymbol(convertToRupees(orderTotalMRP))}
                  </Text>
                ) : null}
              </View>
              {!cartLoading && (
                <CustomText
                  style={[
                    commonStyles.fs16,
                    commonStyles.fwBold,
                    commonStyles.darkGrayColor,
                  ]}
                >
                  {formatCurrencyWithSymbol(convertToRupees(orderTotal ?? 0))}
                </CustomText>
              )}
            </View>
          )}
          {convertToRupees(orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0)) > 0 &&
            cartItems.length > 0 ? (
            <Text style={[commonStyles.fs12, { color: '#F04E23' }]}>
              You Save{' '}
              {formatCurrencyWithSymbol(
                convertToRupees(orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0)),
              )}
            </Text>
          ) : null}
        </View>
        <View>
          <ShimmerButtonWrapper onAction={() => !isButtonDisabled && handleSubmit()}>
            <PrimaryButton
              accentColor="#FF6F00"
              style={{ width: width * 0.6, maxWidth: 170, paddingHorizontal: 0 }}
              title={submitBtnTitle}
              disabled={isSubmitting || cartItems.length === 0}
              loading={loading}
            />
          </ShimmerButtonWrapper>
        </View>
        <Snackbar
          visible={showUpgradeSnackbar}
          duration={1000}
          onDismiss={() => cartDispatch(setUpgradeSnackbar(false))}
          style={{ position: 'absolute', bottom: 60, width: '100%' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff', marginLeft: 5 }}>
              Your cart has been updated!
            </Text>
          </View>
        </Snackbar>

      </WhiteCard>
    </>
  );
};
export default FooterBar;
