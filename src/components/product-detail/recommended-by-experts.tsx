import { commonStyles } from '@styles/common';
import WhiteCard from 'components/elements/card/white-card';
import { Image } from 'expo-image';
import { IRecommendedByExperts } from 'models/product-details/product';
import React from 'react';
import { Text, View } from 'react-native';
import { width } from 'utils/constants';
import { resizeImageForDevice } from 'utils/image-utils';

interface IProps {
  data: IRecommendedByExperts;
}
const ProductRecommendedByExperts = (props: IProps) => {
  const { data } = props;
  if (!data.description) {
    return null;
  }
  return (
    <WhiteCard noBorderRadius style={[commonStyles.greenBg]}>
      <View>
        <View>
          <Text style={[commonStyles.h2Tag]}>Recommended By Experts</Text>
        </View>
        <View style={[commonStyles.flexRow]}>
          <View
            style={[
              commonStyles.bgWhite,
              commonStyles.ph8,
              commonStyles.radius4,
              commonStyles.wAuto,
            ]}
          >
            <View style={[commonStyles.mb8, commonStyles.mt8]}>
              <Image
                source={{
                  uri: resizeImageForDevice(data.image, width),
                }}
                style={[{ aspectRatio: 1.8 / 1 }]}
              />
            </View>
            <View style={[commonStyles.flexColumn]}>
              <View>
                <Text
                  style={[
                    commonStyles.fs14,
                    commonStyles.fw500,
                    commonStyles.mb8,
                  ]}
                >
                  {data.title}
                </Text>
              </View>
              <View style={[commonStyles.wAuto]}>
                <Text style={[commonStyles.pTag, commonStyles.wAuto]}>
                  {data.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </WhiteCard>
  );
};

export default ProductRecommendedByExperts;
