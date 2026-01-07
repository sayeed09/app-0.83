
export const isIdInCart = (cartItems, productId) =>
  !!cartItems.find(item => item.id === Number(productId));

export const getCartLineItems = lineItems => {
  // TODO: Make consistent keys in lineItems, from the API
  lineItems = lineItems.map(item => {
    return {
      compare_at_price: item.compare_at_price
        ? item.compare_at_price
        : item.compareAtPrice,
      discounted_price: item.discounted_price
        ? item.discounted_price
        : item.discountedPrice,
      variant_id: item.variantId ? item.variantId : item.variant_id,
      option_1: item.option_1 ? item.option_1 : item.option1,
      option_2: item.option_2 ? item.option_2 : item.option2,
      option_3: item.option_3 ? item.option_3 : item.option3,
      total_discount: item.total_discount
        ? item.total_discount
        : item.totalDiscount,
      ...item,
    };
  });
  return lineItems;
};
