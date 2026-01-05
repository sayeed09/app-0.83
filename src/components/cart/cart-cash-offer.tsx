import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { setOfferList, toggleOzivaCashSelection } from 'actions/cart';
import { useCartDispatch, useCartState } from 'context/cart/CartContext';
import {
  convertToRupees,
  formatCurrencyWithSymbol,
} from 'utils/currency-utils';
import { useCheckoutDispatch, useCheckoutState } from 'context/checkout';
import { setDiscountCode } from 'actions/checkout';
import useCart from 'hooks/cart';
import { FetchCartParam } from 'models/cart/fetchcart';
import { cartService } from 'services/cart';
import SvgRenderer from 'react-native-svg-renderer';
import RightArrow from 'assets/images/icons/right-arrow';
import { ShimmerButtonWrapper } from 'containers/shop/cart/cart-list/shimmer-effect';
import { commonStyles } from 'styles/common';

interface IProps {
  ozivaCash: any;
  navigation: any;
}

const CashCartOffer = ({ navigation, ozivaCash }: IProps) => {
  const {
    isOzivaCashSelected,
    cartItems,
    totalDiscount,
    offerList,
  } = useCartState();
  const { discount_code: discountCode } = useCheckoutState();
  const checkoutDispatch = useCheckoutDispatch();
  const cartDispatch = useCartDispatch();
  const { getCart } = useCart();

  const getOfferList = () => {
    const variables = {
      category: 'CART',
      productIds: cartItems
        .filter(item => item?.productId)
        .map(item => item.productId ? item.productId.toString() : '') ?? '',
      variantIds: cartItems.map(item => item.id.toString()),
    };
    cartService.fetchOffersService(variables).then(response => {
      if (response && response?.data?.length > 0) {
        cartDispatch(setOfferList(response.data));
      } else {
        cartDispatch(setOfferList([]));
      }
    }).catch(err => {
      console.log("Error while fetching offers : ", err);
    })
  }

  useEffect(() => {
    getOfferList();
  }, []);

  if (cartItems.length === 0) {
    return null;
  }

  const couponDescriptionText = offerList.length > 0 ? offerList.filter(offers => offers.code === discountCode?.code)[0]?.description : ''

  const handleAppliedCode = () => {
    if (
      totalDiscount &&
      (discountCode?.code || isOzivaCashSelected)
    ) {
      cartDispatch(toggleOzivaCashSelection(false));
      let input: FetchCartParam = { code: '' };
      getCart(input);
      checkoutDispatch(setDiscountCode({ code: '' }));
    }
  }

  return (
    <View style={{marginBottom: 16, padding: 4}}>
      {
        totalDiscount && (discountCode?.code || isOzivaCashSelected) ? (
          <ShimmerButtonWrapper>
            <View style={styles.offerContainer}>
              <View style={styles.offerContainerTop} >
                <View style={styles.couponAppliedContainer} >
                  <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/available-coupon.svg?v=1763048923' }} style={styles.availableOfferIcon} />
                  <View style={styles.couponAppliedText}>{isOzivaCashSelected ? <>
                    <Text style={styles.couponAppliedText}>₹{ozivaCash?.redeemable_cash} saved with OZiva Cash</Text>
                  </> : <Text style={styles.couponAppliedText}>{couponDescriptionText || `${formatCurrencyWithSymbol(convertToRupees(totalDiscount))} saved`} with {discountCode.code}</Text>}</View>
                </View>
                <Pressable onPress={() => handleAppliedCode()}>
                  <Text id="removeOffer" style={commonStyles.textWhite}>REMOVE</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => navigation.push('ShopOffersScreen')} style={styles.viewAllOffersContainer}>
                <>
                <Text style={commonStyles.textWhite}>View all offers</Text>
                <RightArrow color='#FFF' height={10} width={10} />
                </>
              </Pressable>
            </View>
          </ShimmerButtonWrapper>
        ) : (
          <ShimmerButtonWrapper onAction={() => navigation.push('ShopOffersScreen')}>
            <View style={styles.availableOffersContainer}>
              <View style={styles.availableOfferTopSection}>
                <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/available-coupon.svg?v=1763048923' }} style={styles.availableOfferIcon} />
                <Text style={styles.availableOfferText}>AVAILABLE OFFERS</Text>
              </View>
              <SvgRenderer source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/offers.svg?v=1763102613' }} style={styles.rightArrowIcon} />
            </View>
          </ShimmerButtonWrapper>
        )
      }
    </View>
  );
};

export default CashCartOffer;

const styles = StyleSheet.create({
  offerContainer: {
    backgroundColor: '#474390',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 6,
    // margin: 4,
    padding: 8,
    paddingBottom: 10,
    // marginBottom: 16
  },
  availableOffersContainer: {
    backgroundColor: '#474390',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6,
    // margin: 4,
    // marginBottom: 16
  },
  container: {
    marginBottom: 10,
  },
  availableOfferTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  availableOfferText: {
    color: '#FFF',
    fontWeight: '500'
  },
  availableOfferIcon: {
    width: 24,
    height: 24
  },
  rightArrowIcon: {
    width: 24,
    height: 24
  },
  viewAllOffersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginLeft: 32
  },
  couponAppliedText: {
    color: '#FFF',
    fontWeight: '500',
    flexShrink: 0.8
  },
  couponAppliedContainer: {
    flexDirection: 'row',
    flex: 1, gap: 8,
    alignItems: 'center'
  },
  offerContainerTop: {
    flexDirection: 'row',
    flex: 1, gap: 8,
    alignItems: 'center'
  },

});