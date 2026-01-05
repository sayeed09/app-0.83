import React from 'react';
import HorizontalCard from 'components/product-cards/horizontal-card';
import CartPriceDetails from 'containers/shop/cart/cart-list/cart-price-details';
import { useCartState } from 'context/cart/CartContext';
import { ProductCardModel } from 'models/product-card/card-model';
import { CartItem } from 'models/shop/cart';
import { convertToRupees } from 'utils/currency-utils';
import OneMonthConsult from 'components/cart/one-month-consult';
import { checkIfPrimeItemAddedInCart } from 'utils/cart';

const OrderSummary = (): React.ReactElement => {
  const { lineItems, isSubscriptionItem, cartItems } = useCartState();
  return (
    <>
      {cartItems.length > 0
        ? isSubscriptionItem
          ? cartItems.map((item: CartItem, index: number) => {
            const productCardModel: ProductCardModel = {
              benefits: item.benefits,
              title: item?.title,
              image: item?.imageUrl,
              productId: String(item.productId),
              variantId: String(item.variant_id),
              price: String(item?.price),
              compareAtPrice: String(item.compareAtPrice),
              quantity: item?.quantity,
            };
            return (
              <HorizontalCard
                productCardModel={productCardModel}
                hideQuantityPicker
                index={index}
                showQtyInCard={true}
                marginTop={8}
              />
            );
          })
          : lineItems &&
          lineItems.length > 0 &&
          lineItems.map((cartItem, index: number) => {
            const productCardModel: ProductCardModel = {
              benefits: cartItem.benefits,
              title: cartItem?.title,
              image: cartItem?.image,
              productId: String(cartItem.productId),
              variantId: String(cartItem.variant_id),
              price: String(convertToRupees(cartItem?.discounted_price)),
              compareAtPrice: String(
                convertToRupees(cartItem.compare_at_price),
              ),
              quantity: cartItem?.quantity,
            };
            return (
              <HorizontalCard
                productCardModel={productCardModel}
                  hideQuantityPicker
                  index={index}
                  showQtyInCard={true}
                  marginTop={8}
                />
              );
            })
        : null}
      {!checkIfPrimeItemAddedInCart(cartItems) && <OneMonthConsult />}
      <CartPriceDetails />
    </>
  );
};

export default OrderSummary;
