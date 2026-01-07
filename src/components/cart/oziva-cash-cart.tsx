import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { setLoginModal } from 'actions/modals';
import OzivaCashWalletIconComponent from 'assets/images/icons/oziva-cash-icons/oziva-cash-wallet-icon';
import { BaseView } from 'components/base/view';
import { useModalsDispatch } from 'context/modals';
import { width } from 'utils/constants';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';
import Loader from 'components/elements/loader/loader';
import { Text as CustomText } from '@components/base/foundation';
import { useAuthState } from 'context/auth';
import { gray7E } from 'components/styles/colors';
import { FetchCartParam } from 'models/cart/fetchcart';
import useCart from 'hooks/cart';
import { cartService } from 'services/cart';
import useLogin from 'hooks/login';
import SvgRenderer from 'react-native-svg-renderer';
import { setDiscountCode } from 'actions/checkout';
import { useCheckoutDispatch } from 'context/checkout';
import { useCartState } from 'context/cart/CartContext';
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  applyCTA: {
    flexDirection: 'row',
    flexBasis: '20%',
    justifyContent: 'center'
  },
  applyCTAText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cashContainer: { 
    flexDirection: 'row', 
    flex: 1, 
    gap: 8, 
    alignItems: 'center', 
    flexBasis: '80%'
  }
});

const OZCashForCart = ({ fetchOffersLoading, setShowConfettiState }): React.ReactElement | null => {
  const modalsDispatch = useModalsDispatch();
  const checkoutDispatch = useCheckoutDispatch();
  const { isOzivaCashSelected, cartItems, orderSubtotal, shippingCharges } =
    useCartState();
  const { getCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [ozivaCash, setOzivaCash] = useState();
  const { handleLogout } = useLogin();

  const { user, isAuthenticated } = useAuthState();

  const ozivaCashValue = () => {
    setLoading(true);
    const payload = {
      cartValue: convertToRupees(
        Number(orderSubtotal) - Number(shippingCharges),
      ),
      phone: user?.phone,
    };
    cartService.ozivaCashValueService(payload).then(response => {
      setOzivaCash(response);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      if (err?.response?.status === 401) {
        handleLogout();
      }
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      ozivaCashValue();
    }
  }, [isAuthenticated]);

  if (cartItems.length === 0 || fetchOffersLoading) {
    return null;
  }
  return (
    <>
      {user ? (
        loading ? (
          <Loader />
        ) : (
          <View
            style={[
              styles.container,
              [
                !ozivaCash?.redeemable_cash
                  ? { opacity: 0.3 }
                  : {},
              ],
            ]}
          >
            <View style={styles.cashContainer}>
              <OzivaCashWalletIconComponent />
              <View style={{ marginLeft: 10 }}>
                {!isOzivaCashSelected ? <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 14,
                    maxWidth: width * 0.5,
                  }}
                >
                  Use {ozivaCash?.redeemable_cash ?? 0} OZiva
                  Cash to get{' '}
                  {formatCurrencyWithSymbol(
                    Number(ozivaCash?.redeemable_cash ?? 0),
                  )}{' '}
                  off
                </Text> : <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 14,
                    maxWidth: width * 0.5,
                  }}
                >
                  {ozivaCash?.redeemable_cash ?? 0} saved with OZiva Cash
                </Text>}
                <Text style={{ fontFamily: 'Roboto-Regular', color: gray7E }}>
                  Your OZiva Cash balance is{' '}
                  {formatCurrencyWithSymbol(
                    ozivaCash?.oziva_cash,
                  ) ?? 0}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                if (!isOzivaCashSelected) {
                  if (+ozivaCash?.redeemable_cash) {
                    let input: FetchCartParam = {
                      code: '',
                      cashApply: true,
                    };
                    checkoutDispatch(setDiscountCode({ code: '' }));
                    getCart(input).then(() => {
                      setShowConfettiState(true);
                    }).catch((error) => {
                      setShowConfettiState(false);
                    });
                  }
                }
              }}
              style={styles.applyCTA}>
              {isOzivaCashSelected ? <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/success_icon_svg.svg?v=1755607973' }} width={20} height={20} /> : null}
              <Text style={[styles.applyCTAText, { color: isOzivaCashSelected ? '#6BBD58' : '#FF6F00' }]}>{isOzivaCashSelected ? 'APPLIED' : 'APPLY'}</Text>

            </Pressable>
          </View>
        )
      ) : cartItems.length > 0 ? (
        <BaseView row style={{ justifyContent: 'space-between' }}>
          <BaseView row>
            <OzivaCashWalletIconComponent />
            <BaseView AlignLeft>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 14,
                  maxWidth: width * 0.5,
                  marginLeft: 10,
                }}
              >
                Use 375 OZiva Cash to get ₹375 off{' '}
              </Text>
              <Text
                style={{ color: '#7E7E7E', fontSize: 12, marginLeft: 10 }}
              >
                Save up to 15% by using OZiva Cash
              </Text>
            </BaseView>
          </BaseView>
          <BaseView style={{}}>
            <Pressable
              onPress={() => {
                modalsDispatch(setLoginModal(true));
              }}
            >
              <CustomText
                variant="heading3"
                color="brandPrimary"
                style={{
                  textTransform: 'uppercase',
                  color: '#FF6F00',
                }}
              >
                LOGIN
              </CustomText>
            </Pressable>
          </BaseView>
        </BaseView>
      ) : null}
    </>
  );
};

export default OZCashForCart;
