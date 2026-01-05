import React from 'react';
import StandardCards from 'components/product-cards/standard-card';
import { useProductState } from 'context/product';
import { ProductCardModel } from 'models/product-card/card-model';

const renderProductList = ({ item, navigation }) => {
  const { products: allProductLists } = useProductState();

  const productAdditionalDetail =
    allProductLists && allProductLists.length > 0
      ? allProductLists?.filter(val => val.id == item.id).length > 0
        ? allProductLists?.filter(val => val.id == item.id)[0]
        : null
      : null;
  const productCardModel: ProductCardModel = {
    averageRating: productAdditionalDetail?.averageRating,
    numberOfReviews: productAdditionalDetail?.numberOfReviews,
    benefits: item.benefits,
    compareAtPrice: item.compareAtPrice.toString(),
    image: item.image,
    options: item.options,
    price: item.price.toString(),
    productId: item.id,
    title: item.title,
    variantId: item.variantId,
    benefitsNew: item.benefitsNew
  };

  return (
    <StandardCards
      productCardModel={productCardModel}
      navigation={navigation}
    />
  );
};
export default renderProductList;
