import FastImage from '@d11/react-native-fast-image';
import { StyledButton } from 'components/base/button/styled';
import ProductRating from 'components/product-cards/standard-card/product-rating';
import { ViewWrapper } from 'components/styled/common';
import { router } from 'expo-router';
import { ProductCardModel } from 'models/product-card/card-model';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import AddToCart from './add-to-cart';
import BenefitChips from './benefit-chips';
import Pricing from './pricing';
import { StandardCardsStyle } from './style';

interface IProps {
  productCardModel?: ProductCardModel;
  onAction?: () => void;
  onClick?: () => void;
  navigation: any;
}
const StandardCards = ({
  productCardModel,
  onAction,
  onClick,
  navigation,
}: IProps) => {
  return (
    <StyledButton
      onPress={() => {
        if (onClick) onClick();
        router.push({
          pathname: '/ProductDetails',
          params: {
            queryString: JSON.stringify(productCardModel?.productId),
            productTitle: productCardModel?.title,
            variantId: productCardModel?.variantId,
          },
        });
        //  navigation.navigate('ProductDetails', {
        //   queryString: JSON.stringify(productCardModel?.productId),
        //   productTitle: productCardModel?.title,
        //   variantId: productCardModel?.variantId as string,
        // });
      }}
    >
      <View
        style={[StandardCardsStyle.StandardProductCard, commonStyles.bgWhite]}
      >
        <View
          style={[
            commonStyles.pad8,
            commonStyles.flexColumn,
            commonStyles.alignCenter,
            commonStyles.bgWhite,
          ]}
        >
          <FastImage
            source={{
              uri: productCardModel?.image as string,
            }}
            style={{ aspectRatio: 1 / 1, width: '100%' }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <ViewWrapper
          style={[
            commonStyles.flexColumn,
            commonStyles.alignStart,
            commonStyles.pad8,
            commonStyles.mb0,
          ]}
        >
          <View
            style={[
              StandardCardsStyle.titleProduct,
              commonStyles.flexD,
              commonStyles.wAuto,
              commonStyles.alignStart,
            ]}
          >
            <Text
              style={[
                commonStyles.h3Tag,
                commonStyles.textLeft,
                commonStyles.mb0,
                commonStyles.wAuto,
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {productCardModel?.title}
            </Text>
          </View>
          <ProductRating
            rating={productCardModel?.averageRating as string}
            totalReviews={productCardModel?.numberOfReviews as string}
          />
          <Pricing
            compareAtPrice={productCardModel?.compareAtPrice as string}
            price={productCardModel?.price as string}
          />
          <BenefitChips benefits={productCardModel?.benefitsNew} />
          <AddToCart
            productCartModel={productCardModel as ProductCardModel}
            addToCartCallback={onAction}
          />
        </ViewWrapper>
      </View>
    </StyledButton >
  );
};

export default StandardCards;
