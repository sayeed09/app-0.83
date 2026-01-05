import ProductDetailsLabel from 'components/base/label/product-details-label';
import { VariantAdditionalResponse } from 'models/product-details/product';
import React from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface Props {
  title: string;
  productId: string;
  scrollToBottom: () => void;
  variantAdditionalDetails: VariantAdditionalResponse;
}
const TitleAndReview = (props: Props) => {
  const {
    title,
    scrollToBottom,
    variantAdditionalDetails,
  } = props;

  const isIOS = Platform.OS === 'ios';

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          scrollToBottom();
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: isIOS ? 0 : 16, // ios/android condition
          }}
        >
          <View
            style={{
              borderRadius: 2,
              paddingLeft: 8,
              paddingRight: 8,
              borderColor: '#E0E0E0',
              borderWidth: 1,
            }}
          >
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ProductDetailsLabel style={[commonStyles.fs18]}>
        {variantAdditionalDetails?.data?.title
          ? variantAdditionalDetails?.data?.title
          : title}
      </ProductDetailsLabel>
    </>
  );
};
export default React.memo(TitleAndReview);
