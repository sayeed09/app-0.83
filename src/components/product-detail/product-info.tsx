import WhiteCard from 'components/elements/card/white-card';
import Accordian from 'components/shared/accordian';
import { SmallText } from 'components/styled/common';
import { ProductInformation } from 'containers/shop/product-details-metadata';
import { VariantAdditionalResponse } from 'models/product-details/product';
import React from 'react';
import { View } from 'react-native';
import { commonStyles } from 'styles/common';

interface Props {
  variantAdditionalDetails: VariantAdditionalResponse;
}
const ProductInfo = (props: Props) => {
  const { variantAdditionalDetails } = props;
  return (
    <>
      {variantAdditionalDetails?.data?.variants?.length > 0 ? (
        <View style={[commonStyles.pt4]}>
          <WhiteCard noBorderRadius style={[commonStyles.pb0, commonStyles.pt4]}>
            <Accordian
              title="Manufacturing Details"
              data={ProductInformation(variantAdditionalDetails)}
              top
              contentColor="#fff"
            />
          </WhiteCard>
        </View>
      ) : null}
    </>
  );
};
export default ProductInfo;
