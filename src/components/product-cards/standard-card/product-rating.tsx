import SingleGoldenStar from 'assets/images/icons/star';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface IProps {
  rating: string;
  totalReviews: string;
}
const ProductRating = (props: IProps) => {
  const { rating, totalReviews } = props;
  return (
    <View style={[commonStyles.flexRow, {justifyContent: 'flex-start', alignContent: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 4, paddingHorizontal: 4, marginBottom: 4}]}>
      <Text style={[commonStyles.fs10]}>{Number(rating)}</Text>
      <View style={{width: 10, height: 10, marginVertical: 4, marginHorizontal: 2}}>
        <SingleGoldenStar />
      </View>
      <Text style={[commonStyles.fs12, {color: '#bdbdbd'}]}>|</Text>
      <Text style={[commonStyles.fs10, {textAlign: 'center', justifyContent: 'center'}]}> {totalReviews} reviews </Text>
    </View>
  );
};
export default ProductRating;
