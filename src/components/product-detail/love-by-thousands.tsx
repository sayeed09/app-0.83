import FastImage from '@d11/react-native-fast-image';
import { commonStyles } from '@styles/common';
import { darkGreen } from 'components/styles/colors';
import { ILovedByThousand } from 'models/product-details/product';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { LoveByTHousandsStyle } from 'styles/love-by-thousands';
import { resizeImageForDevice } from 'utils/image-utils';

interface IProps {
  data: ILovedByThousand;
}
const ProductLoveByThousands = (props: IProps) => {
  const { data } = props;

  const renderItem = ({ item }) => {
    return (
      <View style={[LoveByTHousandsStyle.lbtBOXes]}>
        <View style={[commonStyles.mb8]}>
          <FastImage
            source={{
              uri: resizeImageForDevice(item.image, 300),
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={{ width: 214, height: 214 }}
          />
        </View>
        <View style={[LoveByTHousandsStyle.lbtText]}>
          <Text style={[commonStyles.pTag]}>{item.review}</Text>
        </View>
        <View style={[LoveByTHousandsStyle.LBTFooter]}>
          <Text style={[commonStyles.fs14, commonStyles.darkGrayColor]}>
            {item.reviewerName}
          </Text>
          <View style={[commonStyles.flexD, commonStyles.mt4]}>
            <StarRatingDisplay
              rating={Number(item.rating)}
              enableHalfStar
              color={darkGreen}
              starSize={13}
              starStyle={{ marginHorizontal: 1 }}
            />
          </View>
        </View>
      </View>
    );
  };
  if (!data.data || data?.data?.length == 0) {
    return null;
  }
  return (
    <View
      style={[
        commonStyles.pad16,
        commonStyles.bgWhite,
        LoveByTHousandsStyle.tbtSection,
      ]}
    >
      <View style={[LoveByTHousandsStyle.lbtList]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.data}
          horizontal
          renderItem={renderItem}
          keyExtractor={item =>
            item.reviewerName.toString() + item.position.toString()
          }
        />
      </View>
    </View>
  );
};

export default ProductLoveByThousands;
