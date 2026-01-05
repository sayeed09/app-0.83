import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '@styles/common';
import { ConsumerStudiesStyle } from 'styles/consumer-studies';
import { IConsumerStudy } from 'models/product-details/product';
import WhiteCard from 'components/elements/card/white-card';

interface IProps {
  data: IConsumerStudy;
}
const ProductConsumerStudies = (props: IProps) => {
  const { data } = props;
  if (!data.data || data?.data.length == 0) {
    return null;
  }
  const renderItem = (item, index) => {
    return (
      <View key={index} style={[ConsumerStudiesStyle.CSBOXes]}>
        <Text style={[ConsumerStudiesStyle.title]}>{item.header}</Text>
        <Text style={[commonStyles.fs14, commonStyles.grayColor]}>
          {item.description}
        </Text>
      </View>
    );
  };
  return (
    <WhiteCard noBorderRadius>
      <View style={[commonStyles.bgWhite, commonStyles.mb4]}>
        <View style={[commonStyles.mb8]}>
          <Text style={[commonStyles.h2Tag, commonStyles.mb8]}>
            {data.title}
          </Text>
          <Text style={[commonStyles.pTag]}>{data.subtext}</Text>
        </View>
        <View style={[ConsumerStudiesStyle.CSBOXList]}>
          {data.data.map((item, index) => renderItem(item, index))}
        </View>
      </View>
    </WhiteCard>
  );
};

export default ProductConsumerStudies;
