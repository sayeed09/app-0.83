import FastImage from '@d11/react-native-fast-image';
import { StyledButton } from 'components/base/button/styled';
import { ViewWrapper } from 'components/styled/common';
import { ProductCardModel } from 'models/product-card/card-model';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import AddToCart from './add-to-cart';
import BenefitChips from './benefitchips';
import Pricing from './pricing';
import { MiniCardsStyle } from './style';

interface IProps {
  productCardModel?: ProductCardModel;
  onAction?: () => void;
  onClick?: () => void;
  navigation?: any;
}
const MiniCard = ({
  productCardModel,
  onAction,
  onClick,
  navigation,
}: IProps) => {
  return (
    <StyledButton onPress={() => {}}>
      <View style={[MiniCardsStyle.StandardProductCard, commonStyles.bgWhite]}>
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
              uri: productCardModel?.image,
            }}
            style={{ aspectRatio: 1 / 1, width: 97 }}
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
          <View style={[MiniCardsStyle.titleProduct, commonStyles.flexD]}>
            <Text
              style={[
                commonStyles.h3Tag,
                commonStyles.textCenter,
                commonStyles.mb0,
                commonStyles.wAuto,
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {productCardModel?.title}
            </Text>
          </View>
          <BenefitChips benefits={productCardModel?.benefits as string[]} />
          <Pricing
            price={productCardModel?.price as string}
            compareAtPrice={productCardModel?.compareAtPrice as string}
          />
          <AddToCart productCardModel={productCardModel as ProductCardModel} />
        </ViewWrapper>
      </View>
    </StyledButton>
  );
};

export default MiniCard;
