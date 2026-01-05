import React, { useEffect, useState } from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { setPaymentMethod } from 'actions/checkout';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { PaymentMethodType } from 'models/payment';
import { RadioAction, RadioCheck } from 'components/base/checkbox/styled';

interface Props {
  navigation: any;
  title: string;
  paymentType: string;
  setCardDetails?: (cardDetails) => void;
}

const PaymentItem = ({
  navigation,
  title,
  paymentType,
  setCardDetails,
}: Props): React.ReactElement => {
  const { payment_method: paymentMethodInState } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const [toggleItem, setToggleItem] = useState(false);

  const paymentMethod =
    paymentType == 'COD' ? PaymentMethodType.COD : PaymentMethodType.CARD;
  const expanded = paymentMethod === paymentMethodInState && toggleItem;

  useEffect(() => {
    if (!expanded) {
      setToggleItem(false);
    }
  }, [expanded, checkoutDispatch]);

  return (
    <>
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            checkoutDispatch(
              setPaymentMethod(
                paymentType === 'CCDC'
                  ? PaymentMethodType.CARD
                  : PaymentMethodType.COD,
              ),
            );
            setToggleItem(!toggleItem);
          }}
        >
          <View
            style={{
              marginHorizontal: 10,
              borderWidth: 0.8,
              borderRadius: 6,
              padding: 12,
              borderColor:
                paymentMethodInState === paymentMethod ? '#006E5A' : '#E0E0E0',
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View>
                <RadioAction
                  color="#006E5A"
                  checked={paymentMethodInState === paymentMethod ?? false}
                >
                  <RadioCheck
                    color="#006E5A"
                    checked={paymentMethodInState === paymentMethod ?? false}
                  />
                </RadioAction>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {title}
                  </Text>
                  {paymentType === 'CCDC' ? (
                    <Text style={{ fontSize: 13, color: '#7E7E7E' }}>
                      {' '}
                      (suggested)
                    </Text>
                  ) : null}
                </Text>
              </View>
            </View>
            {paymentMethodInState === paymentMethod ? (
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{ fontSize: 13, color: '#7E7E7E', marginBottom: 10 }}
                >
                  How it works?
                </Text>
                <Text style={{ fontSize: 12, color: '#7E7E7E' }}>
                  1) Click on PLACE ORDER to continue with{' '}
                  {paymentType === 'CCDC' ? 'CARD' : 'COD'}.
                </Text>
                <Text
                  style={{ fontSize: 12, color: '#7E7E7E', marginVertical: 5 }}
                >
                  2) Sit back and relax as we send you OZiva products every
                  month.
                </Text>
                <Text style={{ fontSize: 12, color: '#7E7E7E' }}>
                  3){' '}
                  {paymentType != 'COD'
                    ? 'Payment will be retrieved every month from your chosen payment method'
                    : 'Pay after product is delivered on same day every month'}
                  .
                </Text>
                <Text style={{ marginTop: 20, color: '#BDBDBD', fontSize: 11 }}>
                  By placing order, you agree that you have read and accepted
                  our{' '}
                  <Text
                    onPress={() => navigation.navigate('Terms')}
                    style={{ color: '#6BBD58' }}
                  >
                    {' '}
                    Terms & Condition{' '}
                  </Text>
                  and{' '}
                  <Text
                    onPress={() => navigation.navigate('Privacy')}
                    style={{ color: '#6BBD58' }}
                  >
                    {' '}
                    Privacy Policy.
                  </Text>
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};

export default PaymentItem;
