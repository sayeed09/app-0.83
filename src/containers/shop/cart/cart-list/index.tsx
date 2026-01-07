import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { initCart, setCartLoading } from 'actions/cart';
import SecondaryButton from 'components/elements/button/secondary-button';
import HorizontalCard from 'components/product-cards/horizontal-card';
import { useAuthState } from 'context/auth';
import { initialState } from 'context/cart/CartReducer';
import { useCheckoutState } from 'context/checkout';
import { useNotificationState } from 'context/notifications';
import useCart from 'hooks/cart';
import { FetchCartParam } from 'models/cart/fetchcart';
import { ProductCardModel } from 'models/product-card/card-model';
import { CartItem, CartState } from 'models/shop/cart';
import { GATrackingService } from 'utils/ga-tracking';
import { CART_IMAGE } from 'utils/images';

import { useCartDispatch, useCartState } from '@context/cart/CartContext';
import { getVariantIds, trackMoEngageAppEvent } from '@utils/common';
import { height } from '@utils/constants';
import { convertToRupees } from '@utils/currency-utils';
import { fetchProductById } from 'services/product';
import { filterVariants } from 'utils/cart';
import OZModal from 'components/modal';

const styles = StyleSheet.create({
  quantityBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  topBarLabels: {
    padding: 5,
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

const CartList = ({ navigation, setCartItemPopupProductId, setVariantDetails }): React.ReactElement => {
  const { cartItems, lineItems, cartLoading, isSubscriptionItem, storageCartFetched, orderTotalMRP,
    orderSubtotal, totalDiscount } =
    useCartState();
  const { discount_code: discountCode } = useCheckoutState();
  const { trackingTransparency } = useNotificationState();
  const cartDispatch = useCartDispatch();
  const isFocused = useIsFocused();
  const { getCart, clearDiscount, data } = useCart();
  const { isAuthenticated } = useAuthState();
  const [filterVariantsList, setFilterVariantsList] = useState<ProductCardModel[]>();

  const getProductDetails = async () => {
    try {
      if (lineItems && lineItems.length > 0) {
        const copyOfLineItems = [...lineItems];
        //      Used fallback logic as the key is getting changed somewhere. . 
        //      Need to check this and resolve in future. .
        const productId = copyOfLineItems?.[0].product_id || copyOfLineItems?.[0].productId;
        const productDetailResponse = await fetchProductById(String(productId), ['sections', 'newBenefits', 'images', 'clinicalStudy', 'variants'].toString());
        const productCardModel: ProductCardModel = {
          benefits: lineItems[0].benefits,
          title: lineItems[0].title,
          image: lineItems[0]?.image,
          productId: lineItems[0]?.product_id ? String(lineItems[0]?.product_id) : String(lineItems[0]?.productId),
          variantId: String(lineItems[0].variant_id),
          price: String(lineItems[0].discounted_price / 100),
          compareAtPrice: String(lineItems[0].compare_at_price / 100),
          quantity: lineItems[0]?.quantity,
          option1: lineItems[0]?.option_1,
          option2: lineItems[0]?.option_2,
        };
        if (productDetailResponse?.data) {
          setFilterVariantsList(filterVariants(productCardModel, productDetailResponse?.data));
        }
      }
    } catch (error) {
      console.log('Error fetching product details:', error);
    }
  }

  const trackContinueShopping = useCallback(() => {
    const cartValues = getVariantIds(cartItems);
    trackMoEngageAppEvent({
      event: 'cart_viewed_app',
      values: [
        {
          eventAttribute: 'product_name',
          value: cartValues.names.toString() || '',
        },
        {
          eventAttribute: 'product_id',
          value: cartValues.ids.toString() || '',
        },
        {
          eventAttribute: 'price',
          value: cartValues.price.toString() || '',
        },
        {
          eventAttribute: 'quantity',
          value: cartValues?.quantity.toString() || '',
        },
      ],
      trackingTransparency,
      skipGATrack: true,
    });
  }, [cartItems, trackingTransparency]);

  useEffect(() => {
    if (cartItems.length > 0 && !cartLoading && !isSubscriptionItem) {
      const input: FetchCartParam = { code: discountCode?.code };
      getCart(input).catch(err => {
        if (err) {
          if (discountCode.code) {
            clearDiscount();
            const newInput: FetchCartParam = { code: '' };
            getCart(newInput);
          }
        }
      });
    } else if (cartItems.length === 0) {
      cartDispatch(setCartLoading(false));
    }
  }, [JSON.stringify(cartItems), isAuthenticated, storageCartFetched]);

  useEffect(() => {
    if (isFocused && lineItems && lineItems.length > 0) {
      getProductDetails();
      if (lineItems.filter(item => item.price && item.title).length > 0) {
        GATrackingService.trackViewCart(
          lineItems
            .filter(item => item.price && item.title)
            .map(item => ({
              item_id: String(item.product_id),
              item_name: item?.title ?? '',
              quantity: 1,
              price: item?.price ? convertToRupees(Number(item?.price)) : 0,
            })),
        );
      }
    }
  }, [isFocused, lineItems]);

  useEffect(() => {
    if (lineItems?.length > 0) {
      trackContinueShopping();
    } else {
      clearDiscount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, cartLoading, cartDispatch, cartItems]);

  const cartSavings = orderTotalMRP - (orderSubtotal ?? 0) + (totalDiscount ?? 0);


  return (
    <>
      {cartItems.length > 0 ? (
        isSubscriptionItem ? (
          cartItems.map((item: CartItem, index: number) => {
            const productCardModel: ProductCardModel = {
              benefits: item.benefits,
              title: item.title,
              image: item.imageUrl,
              productId: String(item?.productId),
              variantId: String(item.variant_id),
              price: String(Number(item.price)),
              compareAtPrice: String(Number(item.compareAtPrice)),
              quantity: item?.quantity,
            };
            return (
              <HorizontalCard
                index={index}
                productCardModel={productCardModel}
                navigation={navigation}
                setCartItemPopupProductId={setCartItemPopupProductId}
                showQtyInCard={false}
                marginTop={16}
              />
            );
          })
        ) : (
          lineItems && lineItems.length > 0 &&
          lineItems.map((item, index) => {
            const productCardModel: ProductCardModel = {
              benefits: item.benefits,
              title: item.title,
              image: item?.image,
              productId: item?.product_id ? String(item?.product_id) : String(item.productId),
              variantId: String(item.variant_id),
              price: String(item.discounted_price / 100),
              compareAtPrice: String(item.compare_at_price / 100),
              quantity: item?.quantity,
              option1: item?.option_1,
              option2: item?.option_2,
            };
            return (
              <HorizontalCard
                index={index}
                productCardModel={productCardModel}
                navigation={navigation}
                setCartItemPopupProductId={setCartItemPopupProductId}
                filterVariantsList={filterVariantsList}
                setVariantDetails={setVariantDetails}
                showQtyInCard={false}
                marginTop={16}
              />
            );
          })
        )
      ) : (
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height - 200,
          }}
        >
          {cartItems.length === 0 && !cartLoading && storageCartFetched ? (
            <>
              <Image source={CART_IMAGE} />
              <Text style={styles.titleText}>Hey, it Feels So Light!</Text>
              <Text style={{ marginTop: 5 }}>
                {`There is nothing in your cart. Let's add some products.`}
              </Text>
              <View style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}>
                <SecondaryButton
                  title="START SHOPPING"
                  onAction={() => navigation.navigate('Concerns')}
                  style={{
                    borderColor: '#6BBD58',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  textColor="#6BBD58"
                />
              </View>
            </>
          ) : null}
        </View>
      )}
    </>
  );
};

export default CartList;
