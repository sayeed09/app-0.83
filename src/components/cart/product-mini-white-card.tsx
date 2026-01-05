import React from 'react';
import { Image } from 'react-native';
import { Box, Text } from 'components/base/foundation';
import { BaseView } from 'components/base/view';
import { width } from 'utils/constants';

const ProductMiniWhiteCard = (): React.ReactElement => (
  <Box
    px={4}
    py={4}
    backgroundColor="levelOneBg"
    style={{ maxWidth: width / 1.5 }}
  >
    <BaseView row>
      <Image
        source={{
          uri:
            'https://cdn.shopify.com/s/files/1/2393/2199/products/BettrC_Front.jpg?v=1619013082',
          width: width / 8,
          height: width / 8,
        }}
      />
      <Text
        style={{ flexWrap: 'wrap', flex: 1 }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        OZiva Protein & Herbs for Women
      </Text>
    </BaseView>
  </Box>
);

export default ProductMiniWhiteCard;
